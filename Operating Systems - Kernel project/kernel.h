/*
 * kernel.h
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */

#ifndef KERNEL_H_
#define KERNEL_H_

extern volatile unsigned int lockFlag;

#define lock() lockFlag++
#define unlock() if(lockFlag>0) lockFlag--;\
	if(Kernel::context_switch) Kernel::dispatch()

typedef void interrupt (*pInterrupt)(...);

class PCB;
class PCBList;
class semaphoreList;
class BlockedPCBList;
class IdleThread;

class Kernel{
public:
	static volatile PCB* running;
	static volatile int context_switch;
	static volatile int count;

	static volatile int semFlag;

	static volatile PCBList* pcbList;
	static volatile semaphoreList* semList;

	static void inic();
	static void restore();
	static void interrupt timer(...);
	static void dispatch();

	static void doSmth();
	static void wrapper();
private:
	friend class PCB;
	friend class BlockedPCBList;
	friend class PCBList;
};

#endif /* KERNEL_H_ */
