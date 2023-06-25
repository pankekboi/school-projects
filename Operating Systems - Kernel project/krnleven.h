/*
 * krnleven.h
 *
 *  Created on: Aug 4, 2021
 *      Author: OS1
 */

#ifndef KRNLEVEN_H_
#define KRNLEVEN_H_

typedef unsigned char IVTNo;

class PCB;

class KernelEv{
public:
	int value;
	IVTNo ivtNum;
	PCB* owner;
	PCB* blocked;

	KernelEv(IVTNo ivtNum);
	~KernelEv();

	void wait();
	void signal();
};

#endif /* KRNLEVEN_H_ */
