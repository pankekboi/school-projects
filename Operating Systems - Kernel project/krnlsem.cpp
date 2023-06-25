/*
 * krnlsem.cpp
 *
 *  Created on: Aug 8, 2021
 *      Author: OS1
 */

#include"kernel.h"
#include"krnlsem.h"
#include"pcb.h"
#include"assets.h"
#include"SCHEDULE.H"
#include<stdio.h>

semaphoreList* KernelSem::semaphores = new semaphoreList();
int KernelSem::semID = 0;

KernelSem::KernelSem(int init){
	lock();
	this->id = semID++;
	this->value = init;
	this->headWait = 0;
	this->tailWait = 0;
	this->headSuspend = 0;
	this->numberOfSuspended = 0;
	semaphores->insert(this);
	unlock();
}

KernelSem::~KernelSem(){
	// za sada ne radi ic
}

int KernelSem::val()const{
	return this->value;
}

void KernelSem::insertWait(PCB* pcb){
	lock();
	blockedNode* tmp = new blockedNode(pcb);

	if(tailWait==0){
		headWait = tailWait = tmp;
	} else {
		tailWait->next = tmp;
		tailWait = tmp;
	}
	unlock();
}

void KernelSem::removeWait(){
	lock();
	if(headWait!=0){
		blockedNode* tmp = headWait;
		headWait = headWait->next;

		tmp->pcb->state = PCB::ready;
		Scheduler::put(tmp->pcb);

		if(headWait==0)tailWait=0;

		delete tmp;
	}
	unlock();
}
//================================================================================================================
// odavde nisam testirao
void KernelSem::insertSuspend(PCB* pcb, Time time){
	lock();
	Kernel::semFlag = 0;

	suspendedNode* tmp = new suspendedNode(pcb, time);

	if(headSuspend==0){
		headSuspend = tmp;
	} else {
		tmp->next = headSuspend;
		headSuspend = tmp;
	}

	this->numberOfSuspended++;

	Kernel::semFlag = 1;
	unlock();
}

void KernelSem::removeSuspend(){
	lock();
	Kernel::semFlag = 0;

	suspendedNode* tmp = headSuspend;

	if(headSuspend!=0){
		headSuspend = headSuspend->next;
		tmp->pcb->state = PCB::ready;
		Scheduler::put(tmp->pcb);
		delete tmp;
	}

	if(--(this->numberOfSuspended)==0){
		headSuspend = 0;
	}

	Kernel::semFlag = 1;
	unlock();
}

void KernelSem::updateTime(){
	lock();
	Kernel::semFlag = 0;

	semNode* tmp = semaphores->head;

	/*while(tmp!=0){
		printf("Semaphore %d is in the list\n", tmp->sem->id);
		tmp = tmp->next;
	}
	printf("\n\n");
	tmp = semaphores->head;*/

	while(tmp!=0){
		/*printf("Updating time for semaphore %d\n", tmp->sem->id);
		for(int i=0; i<30000; i++)
			for(int j=0; j<30000; j++);*/
		suspendedNode* head = tmp->sem->headSuspend;
		suspendedNode* temp = head;
		suspendedNode* prev = head;
		while(temp!=0){
			if(--temp->time==0){
				if(temp==head){
					suspendedNode* toDelete = temp;
					tmp->sem->headSuspend = tmp->sem->headSuspend->next;
					head = head->next;
					temp = temp->next;
					prev = prev->next;
					toDelete->pcb->state = PCB::ready;
					Scheduler::put(toDelete->pcb);
					tmp->sem->value++;
					//printf("Value of semaphore %d after waking up is: %d\n", tmp->sem->id, tmp->sem->value);
					tmp->sem->numberOfSuspended--;
					delete toDelete;
				} else {
					suspendedNode* toDelete = temp;
					while(prev->next!=temp)prev = prev->next;
					prev->next = temp->next;
					temp = temp->next;
					toDelete->pcb->state = PCB::ready;
					Scheduler::put(toDelete->pcb);
					tmp->sem->value++;
					//printf("Value of semaphore %d after waking up is: %d\n", tmp->sem->id, tmp->sem->value);
					tmp->sem->numberOfSuspended--;
					delete toDelete;
				}
			} else{
				prev = temp;
				temp = temp->next;
			}

			if(tmp->sem->numberOfSuspended==0){
				tmp->sem->headSuspend = 0;
			}
		}
		tmp = tmp->next;
	}

	Kernel::semFlag = 1;
	unlock();
}
//================================================================================================================
int KernelSem::wait(Time maxTimeToWait){
	lock();
	int ret = 1;

	if(--this->value<0){
		Kernel::running->state = PCB::blocked;
		if(maxTimeToWait!=0){
			insertSuspend((PCB*) Kernel::running, maxTimeToWait);
			ret = 0;
			unlock();
			Kernel::dispatch();
		} else {
			insertWait((PCB*) Kernel::running);
			unlock();
			Kernel::dispatch();
		}
	} else unlock();
	return ret;
}

void KernelSem::signal(){
	lock();

	if(++this->value<=0){
		if(headWait!=0)removeWait();
	}

	unlock();
}
