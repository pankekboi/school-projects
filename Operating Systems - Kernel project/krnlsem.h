/*
 * krnlsem.h
 *
 *  Created on: Aug 8, 2021
 *      Author: OS1
 */

#ifndef KRNLSEM_H_
#define KRNLSEM_H_

class semaphoreList;
class PCB;

typedef unsigned int Time;

typedef struct blockedNode{
	PCB* pcb;
	blockedNode* next;

	blockedNode(PCB* p): pcb(p), next(0){}
} blockedNode;

typedef struct suspendedNode{
	PCB* pcb;
	Time time;
	suspendedNode* next;

	suspendedNode(PCB* p, Time t): pcb(p), time(t), next(0){}
} suspendedNode;

class KernelSem{
public:
	KernelSem(int init=1);
	~KernelSem();

	static int semID;
	int id;
	int value;
	blockedNode* headWait;
	blockedNode* tailWait;

	suspendedNode* headSuspend;
	int numberOfSuspended;

	int wait(Time maxTimeToWait);
	void signal();
	int val()const;

	void insertWait(PCB* pcb);
	void removeWait();

	void insertSuspend(PCB* pcb, Time time);
	void removeSuspend();
	static void updateTime();

	static semaphoreList* semaphores;

	friend class semaphoreList;
};

#endif /* KRNLSEM_H_ */
