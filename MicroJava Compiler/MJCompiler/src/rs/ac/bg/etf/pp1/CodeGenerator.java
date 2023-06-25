package rs.ac.bg.etf.pp1;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import rs.ac.bg.etf.pp1.VisitorCounter.FormParamCounter;
import rs.ac.bg.etf.pp1.VisitorCounter.VarCounter;
import rs.ac.bg.etf.pp1.ast.AddExpr;
import rs.ac.bg.etf.pp1.ast.AssignStmt;
import rs.ac.bg.etf.pp1.ast.BoolFactor;
import rs.ac.bg.etf.pp1.ast.CharFactor;
import rs.ac.bg.etf.pp1.ast.ConstNum;
import rs.ac.bg.etf.pp1.ast.Designator;
import rs.ac.bg.etf.pp1.ast.DesignatorArray;
import rs.ac.bg.etf.pp1.ast.DesignatorFactor;
import rs.ac.bg.etf.pp1.ast.DesignatorName;
import rs.ac.bg.etf.pp1.ast.DesignatorPar;
import rs.ac.bg.etf.pp1.ast.DesignatorParam;
import rs.ac.bg.etf.pp1.ast.DesignatorStmtArray;
import rs.ac.bg.etf.pp1.ast.DesignatorStmtDec;
import rs.ac.bg.etf.pp1.ast.DesignatorStmtInc;
import rs.ac.bg.etf.pp1.ast.MethName;
import rs.ac.bg.etf.pp1.ast.MethodDecl;
import rs.ac.bg.etf.pp1.ast.MinusTermExpr;
import rs.ac.bg.etf.pp1.ast.MulTerm;
import rs.ac.bg.etf.pp1.ast.NewArrayFactor;
import rs.ac.bg.etf.pp1.ast.NoDesignatorParam;
import rs.ac.bg.etf.pp1.ast.NumFactor;
import rs.ac.bg.etf.pp1.ast.OpDiv;
import rs.ac.bg.etf.pp1.ast.OpMinus;
import rs.ac.bg.etf.pp1.ast.OpMod;
import rs.ac.bg.etf.pp1.ast.OpMul;
import rs.ac.bg.etf.pp1.ast.OpPlus;
import rs.ac.bg.etf.pp1.ast.PrintNumber;
import rs.ac.bg.etf.pp1.ast.PrintStmt;
import rs.ac.bg.etf.pp1.ast.Program;
import rs.ac.bg.etf.pp1.ast.ReadStmt;
import rs.ac.bg.etf.pp1.ast.SyntaxNode;
import rs.ac.bg.etf.pp1.ast.VisitorAdaptor;
import rs.etf.pp1.mj.runtime.Code;
import rs.etf.pp1.symboltable.concepts.*;

public class CodeGenerator extends VisitorAdaptor {
	private int mainPc;
	
	private Integer printInt = null;

	private enum ErrorCode {
		MAIN_METHOD_NOT_FOUND(1), ARR_LEN_MISMATCH(2);

		private final int code;

		ErrorCode(int code) {
			this.code = code;
		}

		public int getCode() {
			return this.code;
		}
	};
	
	private enum AddOpCode {
		ADD, SUB
	};
	//AddOpCode currOpCode;
	
	private enum MulOpCode {
		MUL, DIV, MOD
	};
	//MulOpCode mulOpCode;
	
	List<Obj> arrParams = null;
	
	Stack<AddOpCode> addOpCodeStack = new Stack<>();
	Stack<MulOpCode> mulOpCodeStack = new Stack<>();

	public int getMainPc() {
		return mainPc;
	}

	public void visit(MethName methName) {
		boolean reportError = false;

		if ("main".equalsIgnoreCase(methName.getMethName())) {
			if (((MethodDecl) methName.getParent()).getMethodRetType().obj.getType().getKind() == Struct.None) {
				mainPc = Code.pc;
			} else
				reportError = true;
		} else
			reportError = true;

		if (reportError) {
			Code.put(Code.trap);
			Code.put(ErrorCode.MAIN_METHOD_NOT_FOUND.getCode());
		} else {
			methName.obj.setAdr(Code.pc);

			SyntaxNode methDecl = methName.getParent();
			
			VarCounter varCounter = new VarCounter();
			methDecl.traverseTopDown(varCounter);

			FormParamCounter fpCounter = new FormParamCounter();
			methDecl.traverseTopDown(fpCounter);

			Code.put(Code.enter);
			Code.put(fpCounter.getCount());
			Code.put(fpCounter.getCount() + varCounter.getCount());
		}
	}
	
	public void visit(MethodDecl methodDecl) {
		Code.put(Code.exit);
		Code.put(Code.return_);
	}

	public void visit(PrintStmt printStmt) {
		if (printStmt.getExpr().obj.getType().getKind() == Struct.Int || printStmt.getExpr().obj.getType().getKind() == Struct.Bool) {
			if(printInt != null) {
				Code.loadConst(printInt);
				printInt = null;
			} else Code.loadConst(5);
			Code.put(Code.print);
		} else {
			if(printInt != null) {
				Code.loadConst(printInt);
				printInt = null;
			} else Code.loadConst(1);
			Code.put(Code.bprint);
		}
	}
	
	public void visit(PrintNumber printNumber) {
		printInt = printNumber.getValue();
	}
	
	public void visit(ReadStmt readStmt) {
		if(readStmt.getDesignator().obj.getType().getKind() == Struct.Int || readStmt.getDesignator().obj.getType().getKind() == Struct.Bool) {
			Code.put(Code.read);
			Code.store(readStmt.getDesignator().obj);
		} else if(readStmt.getDesignator().obj.getType().getKind() == Struct.Char) {
			Code.put(Code.bread);
			Code.store(readStmt.getDesignator().obj);
		} else if(readStmt.getDesignator().obj.getType().getKind() == Struct.Array) {
			if(readStmt.getDesignator().obj.getType().getElemType().getKind() == Struct.Int || readStmt.getDesignator().obj.getType().getElemType().getKind() == Struct.Bool) {
				Code.put(Code.read);
				Code.put(Code.astore);
			} else if(readStmt.getDesignator().obj.getType().getElemType().getKind() == Struct.Char) {
				Code.put(Code.read);
				Code.put(Code.bastore);
			}
		}
	}

	public void visit(DesignatorStmtInc incStmt) {
		Code.loadConst(1);
		Code.put(Code.add);
		Code.store(incStmt.getDesignator().obj);
	}
	
	public void visit(DesignatorStmtDec decStmt) {
		Code.loadConst(1);
		Code.put(Code.sub);
		Code.store(decStmt.getDesignator().obj);
	}
	
	public void visit(AssignStmt assignStmt) {
		Code.store(assignStmt.getDesignator().obj);
	}
	
	public void visit(NewArrayFactor newArray) {
		Code.put(Code.newarray);
		if(newArray.getType().getTypeName().equalsIgnoreCase("int") || newArray.getType().getTypeName().equalsIgnoreCase("bool")) {
			Code.loadConst(1);
		} else Code.loadConst(0);
	}
	
	public void visit(MinusTermExpr minusTerm) {
		Code.put(Code.neg);
	}
	
	public void visit(AddExpr addExpr) {
		switch(addOpCodeStack.pop()) {
		case ADD:
			Code.put(Code.add);
			break;
		case SUB:
			Code.put(Code.sub);
			break;
		}
	}
	
	public void visit(MulTerm mulExpr) {
		switch(mulOpCodeStack.pop()) {
		case MUL:
			Code.put(Code.mul);
			break;
		case DIV:
			Code.put(Code.div);
			break;
		case MOD:
			Code.put(Code.rem);
			break;
		}
	}
	
	// ODNOSI SE NA KOMPLEKSNU NIZOVNU DODELU
	public void visit(DesignatorStmtArray desigStmtArr) {
		Code.loadConst(arrParams.size());
		Code.load(desigStmtArr.getDesignator().obj);
		Code.put(Code.arraylength);
		// mora provera za duzinu niza
		Code.put(Code.jcc + Code.le);
		Code.put2(5);
		Code.put(Code.trap);
		Code.put(ErrorCode.ARR_LEN_MISMATCH.getCode());
		
		for(int i=arrParams.size(); i>0; i--) {
			if(arrParams.get(i-1) == null) continue;
			else {
				Code.load(desigStmtArr.getDesignator().obj);
				Code.loadConst(i-1);
				if(desigStmtArr.getDesignator().obj.getType().getElemType().getKind() == Struct.Int || desigStmtArr.getDesignator().obj.getType().getElemType().getKind() == Struct.Bool)
					Code.put(Code.aload);
				else Code.put(Code.baload);
				
				Code.store(arrParams.get(i-1));
			}
		}
		arrParams = null;
	}
	
	public void visit(DesignatorParam designatorParam) {
		if(arrParams == null) arrParams = new ArrayList<>();
		arrParams.add(designatorParam.getDesignator().obj);
	}
	
	public void visit(NoDesignatorParam noDesignatorParam) {
		if(arrParams == null) arrParams = new ArrayList<>();
		arrParams.add(null);
	}
	// ODNOSI SE NA KOMPLEKSNU NIZOVNU DODELU
	
	public void visit(OpPlus opPlus) {
		addOpCodeStack.push(AddOpCode.ADD);
		//currOpCode = AddOpCode.ADD;
	}
	
	public void visit(OpMinus opMinus) {
		addOpCodeStack.push(AddOpCode.SUB);
		//currOpCode = AddOpCode.SUB;
	}
	
	public void visit(OpMul opMul) {
		mulOpCodeStack.push(MulOpCode.MUL);
		//mulOpCode = MulOpCode.MUL;
	}
	
	public void visit(OpDiv opDiv) {
		mulOpCodeStack.push(MulOpCode.DIV);
		//mulOpCode = MulOpCode.DIV;
	}
	
	public void visit(OpMod opMod) {
		mulOpCodeStack.push(MulOpCode.MOD);
		//mulOpCode = MulOpCode.MOD;
	}
	
	public void visit(NumFactor numFactor) {
		Code.load(numFactor.obj);
	}
	
	public void visit(CharFactor charFactor) {
		Code.load(charFactor.obj);
	}
	
	public void visit(BoolFactor boolFactor) {
		Code.load(boolFactor.obj);
	}
	
	public void visit(DesignatorArray desigArray) {
		//Code.load(desigArray.getDesignator().obj);
		if(desigArray.getParent().getClass() == DesignatorStmtInc.class || desigArray.getParent().getClass() == DesignatorStmtDec.class) {
			Code.put(Code.dup2);
		}
		
		if((desigArray.getDesignator().obj.getType().getElemType().getKind() == Struct.Int || desigArray.getDesignator().obj.getType().getElemType().getKind() == Struct.Bool) && desigArray.getParent().getClass() != ReadStmt.class && desigArray.getParent().getClass() != AssignStmt.class && desigArray.getParent().getClass() != DesignatorParam.class) {
			Code.put(Code.aload);
		} else if(desigArray.getDesignator().obj.getType().getElemType().getKind() == Struct.Char && desigArray.getParent().getClass() != ReadStmt.class && desigArray.getParent().getClass() != AssignStmt.class && desigArray.getParent().getClass() != DesignatorParam.class) {
			Code.put(Code.baload);
		}
	}

	public void visit(DesignatorName designator) {
		SyntaxNode parent = designator.getParent();
		
		if((designator.getParent().getClass() != AssignStmt.class && designator.getParent().getClass() != ReadStmt.class && designator.getParent().getClass() != DesignatorStmtArray.class && designator.getParent().getClass() != DesignatorParam.class)) {
			Code.load(designator.obj);
		}
	}
}
