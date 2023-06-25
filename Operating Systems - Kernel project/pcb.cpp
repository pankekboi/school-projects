/*
 * pcb.cpp
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */

#include"pcb.h"
#include"kernel.h"
#include"assets.h"
#include"thread.h"
#include"idleThr.h"
#include"SCHEDULE.H"
#include<dos.h>
#include<stdio.h>

ID PCB::next = 0;

extern volatile IdleThread* idle;

PCB::PCB(Thread* myThread, StackSize stackSize ,Time timeSlice){
	lock();
	this->pid = next++;
	this->stack = 0;
	this->sp = 0;
	this->ss = 0;
	this->sp = 0;
	this->state = created;
	this->waitList = new BlockedPCBList();
	this->myThread = myThread;
	if(stackSize<1024)stackSize=1024;
	this->stackSize = stackSize/sizeof(unsigned);
	this->timeSlice = timeSlice;
	unlock();
}

PCB::~PCB(){
	lock();
	if(stack) delete stack;
	unlock();
}

void PCB::start(){
	lock();
	if(this->state==created){
		//printf("Startujem PCB\n");
		this->state=ready;
		initStack();
		Kernel::pcbList->insert(this);
		Scheduler::put(this);
	}
	unlock();
}

void PCB::startMain()volatile{
	lock();
	if(this->state==created){
		this->state=ready;
		Scheduler::put((PCB*)this);
	}
	unlock();
}

void PCB::startIdle(){
	lock();
	if(this->state==created){
		this->state=ready;
		initStack();
	}
	unlock();
}

void PCB::waitToComplete(){
	lock();

	if(Kernel::running == this || this->state == PCB::created || this->state == PCB::finished || this == idle->myPCB){
		unlock();
		return;
	}

	//printf("waitToComplete invoked\n");
	Kernel::running->state = blocked;
	this->waitList->insert((PCB*)Kernel::running);
	unlock();
	Kernel::dispatch();
}

void PCB::initStack(){
	lock();
	this->stack = new unsigned[stackSize];

#ifndef BCC_BLOCK_IGNORE
	this->stack[stackSize-1]=0x200; // PSWI=1
	this->stack[stackSize-2]=FP_SEG(&Kernel::wrapper);
	this->stack[stackSize-3]=FP_OFF(&Kernel::wrapper);

	this->sp = FP_OFF(stack+stackSize-12);
	this->ss = FP_SEG(stack+stackSize-12);
	this->bp = FP_OFF(stack+stackSize-12);
#endif
	unlock();
}

ID PCB::getId(){
	return this->pid;
}

ID PCB::getRunningId(){
	return Kernel::running->pid;
}

Thread* PCB::getThreadById(ID id){
	Thread* ret = Kernel::pcbList->getThread(id);
	return ret;
}
