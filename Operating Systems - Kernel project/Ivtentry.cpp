/*
 * ivtentry.cpp
 *
 *  Created on: Aug 4, 2021
 *      Author: OS1
 */

#include"event.h"
#include<dos.h>
#include "Ivtentry.h"
#include "kernel.h"

extern volatile unsigned int lockFlag;

IVTEntry* IVTEntry::entry[256];

IVTEntry::IVTEntry(IVTNo ivtNum, pInterrupt routine){
	lock();
	this->ivtNum = ivtNum;
#ifndef BCC_BLOCK_IGNORE
	this->oldISR = getvect(ivtNum);
	setvect(ivtNum, routine);
#endif
	IVTEntry::entry[ivtNum] = this;
	this->event = 0;
	unlock();
}

IVTEntry::~IVTEntry(){
#ifndef BCC_BLOCK_IGNORE
	setvect(ivtNum, oldISR);
#endif
	IVTEntry::entry[ivtNum]=0;
}

void IVTEntry::signal(){
	this->event->signal();
}

void IVTEntry::callOldISR(){
	(*oldISR)();
}
