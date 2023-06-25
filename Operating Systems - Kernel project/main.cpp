/*
 * main.cpp
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */
#include"kernel.h"
#include"pcb.h"
#include"idleThr.h"
#include<stdio.h>

extern int userMain(int argc, char** argv);
extern volatile IdleThread* idle;

int main(int argc, char** argv){
	printf("Program starting\n");
	Kernel::running = new PCB(0, 1024, 0);
	Kernel::running->startMain();

	idle = new IdleThread();
	idle->myPCB->startIdle();
	Kernel::inic();

	int ret = userMain(argc, argv);

	/*PCB* p1 = new PCB(0, 1024, 2);
	p1->start();

	PCB* p2 = new PCB(0, 1024, 1);
	p2->start();

	PCB* p3 = new PCB(0, 1024, 4);
	p3->start();

	PCB* p4 = new PCB(0, 1024, 1);
	p4->start();

	p1->waitToComplete();
	p2->waitToComplete();
	p3->waitToComplete();*/

	Kernel::restore();
	printf("userMain returned: %d\n", ret);
	printf("HappY EnD\n");
	return ret;
}
