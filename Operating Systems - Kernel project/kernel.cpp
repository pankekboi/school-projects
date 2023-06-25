/*
 * kernel.cpp
 *
 *  Created on: Jul 30, 2021
 *      Author: OS1
 */

#include"kernel.h"
#include"pcb.h"
#include"assets.h"
#include"SCHEDULE.H"
#include"idleThr.h"
#include<dos.h>
#include<stdio.h>

#include "krnlsem.h"

pInterrupt oldISR;

volatile PCB* Kernel::running = 0;
volatile int Kernel::context_switch = 0;
volatile int Kernel::count = 0;
volatile PCBList* Kernel::pcbList = new PCBList();
volatile semaphoreList* Kernel::semList = new semaphoreList();

volatile int Kernel::semFlag = 1; // no one is using timed wait semaphore

volatile unsigned tsp;
volatile unsigned tss;
volatile unsigned tbp;

volatile IdleThread* idle = 0;

/*volatile unsigned int lockFlag = 1; // 1 - sekcija je slobodna, 0- sekcija nije slobodna
volatile unsigned int semFlag = 1;*/
volatile unsigned int lockFlag = 0;

extern void tick();

void Kernel::inic(){
	asm cli;
	oldISR = getvect(0x08);
	setvect(0x08, timer);
	setvect(0x60, oldISR);
	asm sti;
}

void Kernel::restore(){
	asm cli;
	setvect(0x08, oldISR);
	asm sti;
}

/*void Kernel::doSmth(){
	for(int i=0; i<10; i++){
		lockFlag = 0;
		printf("In doSmth() is PCB with PID: %d\n", Kernel::running->pid);
		lockFlag = 1;

		for(int j=0; j<30000; j++)
			for(int k=0; k<30000; k++);
	}
	lockFlag = 0;
	if(Kernel::running->myBlocked!=0)
		Kernel::running->myBlocked->unblockAll();
	Kernel::running->state=PCB::finished;
	lockFlag = 1;
	dispatch();
}*/

void Kernel::wrapper(){
	running->myThread->run();
	lock();
	Kernel::running->state=PCB::finished;
	// izbaci iz globalne liste PCB-ova koji cekaju na waitToComplete
	Kernel::running->waitList->unblockAll();
	unlock();
	dispatch();
}

void interrupt Kernel::timer(...){
	if(!Kernel::context_switch) {
		//Kernel::semList->updateTime();
		if(semFlag)
			KernelSem::updateTime();
		Kernel::count--;
	}

	if((Kernel::count==0 && Kernel::running->timeSlice!=0) || Kernel::context_switch){
		if(lockFlag == 0) {
			/*lockFlag = 0;
			printf("Starting interrupt routine timer\n");
			lockFlag = 1;*/

			Kernel::context_switch = 0;

			asm{
				mov tsp, sp
				mov tss, ss
				mov tbp, bp
			}
			Kernel::running->sp = tsp;
			Kernel::running->ss = tss;
			Kernel::running->bp = tbp;

			/*lock();
			printf("Saved context of process %d\n", Kernel::running->pid);
			unlock();*/

			if(Kernel::running->state!=PCB::finished && Kernel::running->state!=PCB::blocked && Kernel::running!=idle->myPCB){
				Scheduler::put((PCB*) Kernel::running);
			}
			Kernel::running=(volatile PCB*)Scheduler::get();
			/*if(Kernel::running!=0){
				lock();
				printf("Scheduler returned PCB with ID: %d\n", Kernel::running->pid);
				unlock();
			}*/
			if(Kernel::running==0){
				Kernel::running=idle->myPCB;
				//printf("Idle took over CPU!\n");
			}

			tsp = Kernel::running->sp;
			tss = Kernel::running->ss;
			tbp = Kernel::running->bp;
			Kernel::count = Kernel::running->timeSlice;
			asm{
				mov sp, tsp
				mov ss, tss
				mov bp, tbp
			}


			//printf("Restored context of process %d. Ending interrupt routine\n", Kernel::running->pid);
		} else Kernel::context_switch = 1;
	}

	if(!Kernel::context_switch) {
		asm int 60h;
		tick();
	}
}

void Kernel::dispatch(){
	//printf("Explicit dispatch call\n");
	Kernel::context_switch = 1;
	Kernel::timer();
}
