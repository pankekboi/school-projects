/*
 * assets.cpp
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */

#include"assets.h"
#include"kernel.h"
#include"SCHEDULE.H"
#include"pcb.h"
#include"semaphor.h"
#include<stdio.h>

#include "krnlsem.h"

int brojBlokiranih = 0;

node::node(){
	lock();
	this->pcb = 0;
	this->next = 0;
	unlock();
}

sleepNode::sleepNode(){
	lock();
	this->pcb = 0;
	this->next = 0;
	this->sleepTime = 0;
	unlock();
}

semNode::semNode(){
	lock();
	this->sem = 0;
	this->next = 0;
	unlock();
}

BlockedPCBList::BlockedPCBList(){
	lock();
	this->head = 0;
	unlock();
}

void BlockedPCBList::insert(PCB* pcb){
	lock();
	if(head==0){
		head = new node;
		head->pcb = pcb;
		//printf("Blokiranih nakon dodavanja ima: %d\n", ++brojBlokiranih);
		unlock();
		return;
	} else{
		node* tmp = head;
		while(tmp->next!=0)tmp=tmp->next;
		node* n = new node;
		n->pcb = pcb;
		tmp->next = n;
		//printf("Blokiranih nakon dodavanja ima: %d\n", ++brojBlokiranih);
		unlock();
		return;
	}
}

//void BlockedPCBList::unblock(PCB* finished){
//	lock();
//
//	node* temp = head;
//	while(temp){
//		if(temp->pcb->waitForPCB == finished){
//			temp->pcb->state = PCB::ready;
//			Scheduler::put(temp->pcb);
//
//			node* toDelete = temp;
//			temp = temp->next;
//
//			// izbaci toDelete iz liste blokiranih
//			remove(toDelete);
//			printf("Blokiranih nakon brisanja ima: %d\n", --brojBlokiranih);
//		} else temp = temp->next;
//	}
//
//	unlock();
//}
//
//void BlockedPCBList::remove(node* toDelete){
//	node* prev = 0;
//	node* temp = head;
//
//	if(head == toDelete){
//		head = head->next;
//		delete temp;
//	} else {
//		prev = head;
//		temp = head->next;
//		while(temp && temp!=toDelete){
//			prev = temp;
//			temp = temp->next;
//		}
//		prev->next = temp->next;
//		delete temp;
//	}
//}

void BlockedPCBList::unblockAll(){
	lock();
	if(head == 0){
		unlock();
		return;
	}

	while(head!=0){
		node* tmp = head;
		tmp->pcb->state = PCB::ready;
		Scheduler::put((PCB*)tmp->pcb);
		head = head->next;
		delete tmp;
	}
	unlock();
}

PCBList::PCBList(){
	lock();
	this->head = 0;
	unlock();
}

PCBList::~PCBList(){
	lock();
	this->empty();
	unlock();
}

void PCBList::insert(PCB* pcb)volatile{
	lock();
		if(head==0){
			head = new node;
			head->pcb = pcb;
			unlock();
			return;
		} else{
			node* tmp = head;
			while(tmp->next!=0)tmp=tmp->next;
			node* n = new node;
			n->pcb = pcb;
			tmp->next = n;
			unlock();
			return;
		}
}

void PCBList::empty(){
	lock();
	while(head!=0){
		node* tmp = head;
		head = head->next;
		delete tmp;
	}
	unlock();
}

Thread* PCBList::getThread(ID id)volatile{
	lock();
	Thread* ret = 0;
	node* tmp = head;
	while(tmp!=0){
		if(tmp->pcb->pid==id){
			ret = tmp->pcb->myThread;
//			unlock();
//			return ret;
			break;
		}
		tmp = tmp->next;
	}
	unlock();
	return ret;
}

semaphoreList::semaphoreList(){
	lock();
	this->head=0;
	unlock();
}

semaphoreList::~semaphoreList(){
	lock();
	this->empty();
	unlock();
}

void semaphoreList::insert(KernelSem* sem)volatile{
	lock();
	semNode* new_node = new semNode;
	new_node->sem = sem;
	new_node->next = this->head;
	this->head = new_node;

	semNode* tmp = head;
	while(tmp!=0){
		//printf("Semaphore %d is in the list\n", tmp->sem->id);
		tmp = tmp->next;
	}

	//printf("\n\n");

	unlock();
}

void semaphoreList::empty(){
	lock();
	while(head!=0){
		semNode* tmp = head;
		head = head->next;
		delete tmp;
	}
	unlock();
}

waitList::waitList(){
	lock();
	this->head=0;
	this->tail=0;
	this->numOfElements = 0;
	unlock();
}

waitList::~waitList(){} // za sada ne radi nista, videcu za kasnije

void waitList::insert(PCB* pcb){
	lock();
	/*if(head==0){
		head = new node;
		head->pcb = pcb;
		numOfElements++;
		tail = head;
		lockFlag = 1;
		return;
	} else{
		node* n = new node;
		n->pcb = pcb;
		tail->next = n;
		tail = tail->next;
		numOfElements++;
		lockFlag = 1;
		return;
	}*/
	if(head==0){
		head = new node;
		head->pcb=pcb;
		numOfElements++;
		tail = head;
	} else{
		node* n = new node;
		n->pcb = pcb;
		n->next = head;
		head = n;
		numOfElements++;
	}
	//printf("Number of elements in waiting list is: %d\n", numOfElements);
	unlock();
	return;
}

void waitList::remove(){
	lock();
	/*PCB* ret = head->pcb;
	node* tmp = head;
	head = head->next;
	delete tmp;*/
	if(head==tail){
		head->pcb->state = PCB::ready;
		Scheduler::put(head->pcb);
		numOfElements--;
		delete head;
		/*head=0;
		tail=0;*/
	} else{
		node* newTail = head;
		node* tmp = tail;
		while(newTail->next!=tail)newTail=newTail->next;
		newTail->next = 0;
		tail = newTail;
		tmp->pcb->state = PCB::ready;
		Scheduler::put(tmp->pcb);
		numOfElements--;
		delete tmp;
	}

	if(numOfElements==0){
		head = 0;
		tail = 0;
	}
	unlock();
}

suspendList::suspendList(){
	lock();
	this->head = 0;
	this->numOfElements = 0;
	unlock();
}

suspendList::~suspendList(){} // za sada ne radi nista, videcu za kasnije

void suspendList::insert(PCB* pcb, unsigned int waitTime){
	// kod za ubacivanje u listu suspendovanih; ubacujem na pocetak liste
	lock();

	sleepNode* new_node = new sleepNode;
	new_node->pcb = pcb;
	new_node->sleepTime = waitTime;
	new_node->next = this->head;
	this->head = new_node;
	this->numOfElements++;

	unlock();
}

/*void suspendList::updateTime(KernelSem* curr){
	semFlag = 0;
	// kod za updateovanje vremena cekanja; ne treba lockFlag jer je u "roditeljskoj funkciji vec naveden lockFlag"
	//lockFlag = 0;
	sleepNode* tmp = this->head;
	sleepNode* prev = 0;

	while(tmp!=0){
		if(--tmp->sleepTime==0){
			sleepNode* toDelete = tmp;
			//printf("Time to awaken.\n");
			if(tmp==head){
				head = tmp->next;
				tmp->pcb->state = PCB::ready;
				Scheduler::put(tmp->pcb);
				tmp = tmp->next;
				curr->updateValue();
				this->numOfElements--;
				//printf("Number of suspended PCBs is %d", this->numOfElements);
				delete toDelete;
			} else{
				prev->next = tmp->next;
				tmp->pcb->state = PCB::ready;
				Scheduler::put(tmp->pcb);
				tmp = tmp->next;
				curr->updateValue();
				this->numOfElements--;
				//printf("Number of suspended PCBs is %d", this->numOfElements);
				delete toDelete;
			}
		} else{
			prev = tmp;
			tmp = tmp->next;
		}
	}

	if(this->numOfElements==0){
		this->head = 0;
	}
	//lockFlag = 1;
	semFlag = 1;
}*/

void suspendList::removeFirst(){
	lock();
	if(head!=0){
		sleepNode* tmp = head;
		head = head->next;
		tmp->pcb->state = PCB::ready;
		Scheduler::put(tmp->pcb);
		this->numOfElements--;
		delete tmp;
	}

	if(this->numOfElements==0){
			this->head = 0;
	}
	unlock();
}
