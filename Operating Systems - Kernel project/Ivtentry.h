/*
 * ivtentry.h
 *
 *  Created on: Aug 4, 2021
 *      Author: OS1
 */

#ifndef IVTENTRY_H_
#define IVTENTRY_H_

typedef void interrupt (*pInterrupt)(...);
typedef unsigned char IVTNo;

class Event;
class KernelEv;

class IVTEntry{
public:
	IVTEntry(IVTNo ivtNum, pInterrupt oldISR);
	~IVTEntry();

	int ivtNum;
	pInterrupt oldISR;
	Event* event;

	static IVTEntry* entry[256];

	void callOldISR();
	void signal();
};

#define PREPAREENTRY(entryNum, callOld)\
void interrupt inter##Entry(...);\
IVTEntry newInter##Entry(entryNum, inter##Entry);\
void interrupt inter##Entry(...){\
newInter##Entry.signal();\
if(callOld==1) newInter##Entry.callOldISR();\
}

#endif /* IVTENTRY_H_ */
