/*
 * event.cpp
 *
 *  Created on: Aug 4, 2021
 *      Author: OS1
 */

#include"event.h"

#include "Ivtentry.h"
#include"krnleven.h"
#include "kernel.h"

Event::Event(IVTNo ivtNo){
	lock();
	this->myImpl = new KernelEv(ivtNo);
	IVTEntry::entry[ivtNo]->event = this;
	unlock();
}

Event::~Event(){
	delete this->myImpl;
}

void Event::wait(){
	this->myImpl->wait();
}

void Event::signal(){
	this->myImpl->signal();
}
