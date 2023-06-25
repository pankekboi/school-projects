/*
 * pcb.h
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */

#ifndef PCB_H_
#define PCB_H_

#include"thread.h"

class Thread;

class PCB{
public:
	PCB(Thread* myThread, StackSize stackSize, Time timeSlice);
	~PCB();

	friend class Thread;
	friend class IdleThread;
	friend class Kernel;
	friend class KernelSem;
	friend class BlockedPCBList;
	friend class PCBList;
	friend class suspendList;
	friend class waitList;
	friend class KernelEv;

	typedef enum State{
		created, ready, blocked, finished
	};

	void start();
	void startMain()volatile;
	void startIdle();
	void waitToComplete();
	void initStack();

	ID getId();

	static ID getRunningId();
	static Thread* getThreadById(ID id);

private:
	static ID next;
	ID pid;

	Thread* myThread;
	StackSize stackSize;
	Time timeSlice;

	BlockedPCBList* waitList;

	unsigned* stack;
	volatile unsigned sp;
	volatile unsigned ss;
	volatile unsigned bp;
	volatile State state;
};

#endif /* PCB_H_ */
