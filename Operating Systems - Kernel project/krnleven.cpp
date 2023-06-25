/*
 * krnleven.cpp
 *
 *  Created on: Aug 4, 2021
 *      Author: OS1
 */

#include"krnleven.h"
#include"kernel.h"
#include"pcb.h"
#include"SCHEDULE.H"

extern volatile unsigned int lockFlag;

KernelEv::KernelEv(IVTNo ivtNum){
	lock();
	this->value=0;
	this->ivtNum = ivtNum;
	this->owner = (PCB*)Kernel::running;
	this->blocked = 0;
	unlock();
}

KernelEv::~KernelEv(){
	if(this->owner->state==PCB::blocked){
		this->owner->state = PCB::ready;
		Scheduler::put(this->owner);
	}
}

void KernelEv::wait(){
	lock();
	if(Kernel::running==this->owner){
		if(this->value==0){
			//this->owner->state = PCB::blocked;
			//this->value = 1;
			Kernel::running->state = PCB::blocked;
			this->blocked = (PCB*)Kernel::running;
			unlock();
			Kernel::dispatch();
		} else {
			this->value=0;
			unlock();
		}
	} else unlock();
}

void KernelEv::signal(){
	lock();
//	if(this->owner->state==PCB::blocked){
//		this->owner->state=PCB::ready;
//		Scheduler::put(this->owner);
//		this->value=0;
//		unlock();
//		Kernel::dispatch();
//	} else {
//		this->value = 1;
//		unlock();
//	}
	if(blocked){
		blocked->state = PCB::ready;
		Scheduler::put(blocked);
		blocked = 0;
		unlock();
		Kernel::dispatch();
	} else {
		value = 1;
		unlock();
	}
}
