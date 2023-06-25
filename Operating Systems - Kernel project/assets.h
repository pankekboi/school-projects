/*
 * assets.h
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */

#ifndef ASSETS_H_
#define ASSETS_H_

#include"thread.h"

class PCB;
class KernelSem;

typedef struct node{
	PCB* pcb;
	node* next;
	node();
};

typedef struct sleepNode{
	PCB* pcb;
	sleepNode* next;
	unsigned int sleepTime;
	sleepNode();
};

typedef struct semNode{
	KernelSem* sem;
	semNode* next;
	semNode();
};

class BlockedPCBList{
private:
	node* head;

	friend class PCB;

public:
	BlockedPCBList();
	~BlockedPCBList(){}

	void insert(PCB* pcb);
	void unblockAll();
};

class PCBList{
private:
	node* head;

	friend class PCB;

	void empty();

public:
	PCBList();
	~PCBList();

	void insert(PCB* pcb)volatile;
	Thread* getThread(ID id)volatile;
};

class semaphoreList{
private:
	semNode* head;

	friend class KernelSem;

	void empty();

public:
	semaphoreList();
	~semaphoreList();

	void insert(KernelSem* sem)volatile;
};

class waitList{
private:
	node* head;
	node* tail;
	int numOfElements;

	friend class PCB;
	friend class KernelSem;

public:
	waitList();
	~waitList();

	void insert(PCB* pcb);
	void remove();
};

class suspendList{
private:
	sleepNode* head;
	int numOfElements;

	friend class PCB;
	friend class KernelSem;

public:
	suspendList();
	~suspendList();

	void insert(PCB* pcb, unsigned int waitTime);
	void removeFirst();
	void updateTime(KernelSem* curr);
};

#endif /* ASSETS_H_ */
