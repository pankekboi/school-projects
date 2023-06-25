/*
 * testThr.h
 *
 *  Created on: Jul 31, 2021
 *      Author: OS1
 */

#ifndef IDLETHR_H_
#define IDLETHR_H_

#include"thread.h"

class IdleThread : public Thread{
public:
	IdleThread() : Thread(1024, 1){}
	~IdleThread(){}

protected:
	void run();
};

#endif /* IDLETHR_H_ */
