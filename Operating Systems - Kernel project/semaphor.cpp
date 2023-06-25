/*
 * semaphor.cpp
 *
 *  Created on: Aug 8, 2021
 *      Author: OS1
 */

#include"semaphor.h"
#include"krnlsem.h"
#include"kernel.h"

Semaphore::Semaphore(int init){
	lock();
	this->myImpl = new KernelSem(init);
	unlock();
}

Semaphore::~Semaphore(){
//	lock();
//	delete myImpl;
//	unlock();
}


int Semaphore::val()const{
	lock();
	int ret = this->myImpl->val();
	unlock();
	return ret;
}

int Semaphore::wait(Time maxTimeToWait){
	lock();
	int ret = this->myImpl->wait(maxTimeToWait);
	unlock();
	return ret;
}

void Semaphore::signal(){
	lock();
	this->myImpl->signal();
	unlock();
}
