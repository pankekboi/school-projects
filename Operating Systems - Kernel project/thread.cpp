/*
 * thread.cpp
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */
#include"thread.h"
#include"pcb.h"
#include"kernel.h"

#include<stdio.h>

Thread::Thread(StackSize stackSize, Time timeSlice){
	lock();
	myPCB = new PCB(this, stackSize, timeSlice);
	unlock();
}

Thread::~Thread(){
	waitToComplete();
	lock();
	//printf("Vreme je da obrisem svoj PCB :)\n");
	delete this->myPCB;
	unlock();
}

void Thread::start(){
	myPCB->start();
}

void Thread::waitToComplete(){
	myPCB->waitToComplete();
}

ID Thread::getId(){
	lock();
	ID ret = myPCB->getId();
	unlock();
	return ret;
}

ID Thread::getRunningId(){
	lock();
	ID ret = PCB::getRunningId();
	unlock();
	return ret;
}

Thread* Thread::getThreadById(ID id){
	lock();
	Thread* ret = PCB::getThreadById(id);
	unlock();
	return ret;
}

void dispatch(){
	Kernel::dispatch();
}
