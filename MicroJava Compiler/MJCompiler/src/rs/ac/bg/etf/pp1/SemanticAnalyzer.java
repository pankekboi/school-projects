package rs.ac.bg.etf.pp1;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import rs.ac.bg.etf.pp1.ast.*;
import rs.ac.bg.etf.pp1.symtable.SymTable;
import rs.etf.pp1.symboltable.Tab;
import rs.etf.pp1.symboltable.concepts.Obj;
import rs.etf.pp1.symboltable.concepts.Struct;
import rs.etf.pp1.symboltable.visitors.DumpSymbolTableVisitor;

public class SemanticAnalyzer extends VisitorAdaptor {

	public static boolean errorDetected = false;
	int nVars;

	Logger log = Logger.getLogger(getClass());

	private Type currentConstType = null;
	private Integer currentConstNumVal = null;
	private Character currentConstCharVal = null;
	private Boolean currentConstBoolVal = null;

	private Type currentVarType = null;

	private Obj currentMethod = null;
	private Type currentRetType = null;

	private List<Integer> complexArrayTypes = null;

	public void report_error(String message, SyntaxNode info) {
		errorDetected = true;
		StringBuilder msg = new StringBuilder(message);
		int line = (info == null) ? 0 : info.getLine();
		if (line != 0)
			msg.append(" na liniji ").append(line);
		log.error(msg.toString());
	}

	public void report_info(String message, SyntaxNode info) {
		StringBuilder msg = new StringBuilder(message);
		int line = (info == null) ? 0 : info.getLine();
		if (line != 0)
			msg.append(" na liniji ").append(line);
		log.info(msg.toString());
	}

	public void report_info_detected(String message, SyntaxNode info, Obj obj) {
		StringBuilder msg = new StringBuilder(message);
		int line = (info == null) ? 0 : info.getLine();
		if (line != 0)
			msg.append(" na liniji ").append(line).append('\n');

		DumpSymbolTableVisitor stv = new DumpSymbolTableVisitor();
		stv.visitObjNode(obj);
		msg.append("Izgled objektnog cvora: ").append(stv.getOutput());
		log.info(msg.toString());
	}

	public boolean checkIfTypeExists(String type) {
		switch (type) {
		case "int":
		case "char":
		case "bool":
			return true;
		default:
			return false;
		}
	}

	public void visit(ProgName progName) {
		progName.obj = SymTable.insert(Obj.Prog, progName.getProgName(), SymTable.noType);
		SymTable.openScope();
	}

	public void visit(Program program) {
		nVars = SymTable.currentScope().getnVars();
		SymTable.chainLocalSymbols(program.getProgName().obj);
		SymTable.closeScope();
	}

	// =================== PROVERA DEKLARISANJA SIMBOLICKE KONSTANTE
	// ==============================
	public void visit(ConstType constType) {
		currentConstType = constType.getType();
	}

	public void visit(ConstNum constNum) {
		currentConstNumVal = constNum.getValue();
	}

	public void visit(ConstChar constChar) {
		currentConstCharVal = constChar.getValue();
	}

	public void visit(ConstBool constBool) {
		currentConstBoolVal = constBool.getValue();
	}

	public void visit(Const constant) {
		Obj obj = SymTable.find(constant.getConstName());
		if (obj != Tab.noObj) {
			report_error("Simbolicka konstanta " + constant.getConstName() + " je vec deklarisana!", null);
			errorDetected = true;
		} else {
			if (!checkIfTypeExists(currentConstType.getTypeName())) {
				report_error("Tip podatka " + currentConstType.getTypeName() + " ne postoji!", null);
				errorDetected = true;
			} else {
				boolean checkType = false;

				switch (currentConstType.getTypeName()) {
				case "int":
					if (currentConstNumVal != null) {
						checkType = true;

						constant.obj = SymTable.insert(Obj.Con, constant.getConstName(), new Struct(Struct.Int));
						constant.obj.setAdr(currentConstNumVal);

						currentConstNumVal = null;
					}
					break;
				case "char":
					if (currentConstCharVal != null) {
						checkType = true;

						constant.obj = SymTable.insert(Obj.Con, constant.getConstName(), new Struct(Struct.Char));
						constant.obj.setAdr(currentConstCharVal);

						currentConstCharVal = null;
					}
					break;
				case "bool":
					if (currentConstBoolVal != null) {
						checkType = true;

						constant.obj = SymTable.insert(Obj.Con, constant.getConstName(), new Struct(Struct.Bool));
						constant.obj.setAdr(currentConstBoolVal ? 1 : 0);

						currentConstBoolVal = null;
					}
				}

				if (!checkType) {
					report_error(
							"Nekompatibilan tip se dodeljuje simbolickoj konstanti '" + constant.getConstName() + "'",
							constant);
					errorDetected = true;
				} else
					report_info("Deklarisana simbolicka konstanta '" + constant.getConstName() + "'", constant);
			}
		}
	}
	// =================== PROVERA DEKLARISANJA SIMBOLICKE KONSTANTE
	// ==============================

	// =================== DEKLARISANJE GLOBALNE PROMENLJIVE
	// ==============================
	public void visit(VarType varType) {
		currentVarType = varType.getType();
	}

	public void visit(RegVar regVar) {
		Obj obj = SymTable.find(regVar.getVarName());
		if (obj != Tab.noObj) {
			report_error("Globalna promenljiva " + regVar.getVarName() + " je vec deklarisana!", null);
			errorDetected = true;
		} else if (!checkIfTypeExists(currentVarType.getTypeName())) {
			report_error("Tip podatka " + currentVarType.getTypeName() + " ne postoji!", null);
			errorDetected = true;
		} else {
			Struct struct = null;

			switch (currentVarType.getTypeName()) {
			case "int":
				struct = new Struct(Struct.Int);
				break;
			case "char":
				struct = new Struct(Struct.Char);
				break;
			case "bool":
				struct = new Struct(Struct.Bool);
				break;
			}

			regVar.obj = SymTable.insert(Obj.Var, regVar.getVarName(), struct);

			report_info("Deklarisana globalna promenljiva '" + regVar.getVarName() + "'", regVar);
		}
	}

	public void visit(ArrVar arrVar) {
		Obj obj = SymTable.find(arrVar.getArrName());
		if (obj != Tab.noObj) {
			report_error("Globalna promenljiva " + arrVar.getArrName() + " je vec deklarisana!", null);
			errorDetected = true;
		} else if (!checkIfTypeExists(currentVarType.getTypeName())) {
			report_error("Tip podatka " + currentVarType.getTypeName() + " ne postoji!", null);
			errorDetected = true;
		} else {
			Struct struct = null;

			switch (currentVarType.getTypeName()) {
			case "int":
				struct = new Struct(Struct.Int);
				break;
			case "char":
				struct = new Struct(Struct.Char);
				break;
			case "bool":
				struct = new Struct(Struct.Bool);
				break;
			}

			Struct structArr = new Struct(Struct.Array);
			structArr.setElementType(new Struct(struct.getKind()));

			arrVar.obj = SymTable.insert(Obj.Var, arrVar.getArrName(), structArr);

			report_info("Deklarisana globalna promenljiva '" + arrVar.getArrName() + "'", arrVar);
		}
	}
	// =================== DEKLARISANJE GLOBALNE PROMENLJIVE
	// ==============================

	// =================== DEKLARISANJE KLASE ==============================
	public void visit(ClassName className) {
		Obj obj = SymTable.find(className.getClassName());
		if (obj != Tab.noObj) {
			report_error("Klasa " + className.getClassName() + " je vec deklarisana!", null);
			errorDetected = true;
		} else {
			className.obj = SymTable.insert(Obj.Type, className.getClassName(), new Struct(Struct.Class));

			report_info("Deklarisana klasa '" + className.getClassName() + "'", className);
		}
	}
	// =================== DEKLARISANJE KLASE ==============================

	// =================== DEKLARISANJE LOKALNE PROMENLJIVE ===================
	public void visit(VarTypeMeth varTypeMeth) {
		currentVarType = varTypeMeth.getType();
	}

	public void visit(RegVarMeth regVarMeth) {
		Obj obj = SymTable.currentScope.findSymbol(regVarMeth.getVarName());
		if (obj == null)
			obj = SymTable.noObj;
		if (obj != Tab.noObj) {
			report_error("Lokalna promenljiva " + regVarMeth.getVarName() + " je vec deklarisana!", null);
			errorDetected = true;
		} else if (!checkIfTypeExists(currentVarType.getTypeName())) {
			report_error("Tip podatka " + currentVarType.getTypeName() + " ne postoji!", null);
			errorDetected = true;
		} else {
			Struct struct = null;

			switch (currentVarType.getTypeName()) {
			case "int":
				struct = new Struct(Struct.Int);
				break;
			case "char":
				struct = new Struct(Struct.Char);
				break;
			case "bool":
				struct = new Struct(Struct.Bool);
				break;
			}

			regVarMeth.obj = SymTable.insert(Obj.Var, regVarMeth.getVarName(), struct);

			report_info("Deklarisana lokalna promenljiva '" + regVarMeth.getVarName() + "'", regVarMeth);
		}
	}

	public void visit(ArrVarMeth arrVarMeth) {
		Obj obj = SymTable.currentScope.findSymbol(arrVarMeth.getArrName());
		if (obj == null)
			obj = SymTable.noObj;
		if (obj != SymTable.noObj) {
			report_error("Lokalna promenljiva " + arrVarMeth.getArrName() + " je vec deklarisana!", null);
			errorDetected = true;
		} else if (!checkIfTypeExists(currentVarType.getTypeName())) {
			report_error("Tip podatka " + currentVarType.getTypeName() + " ne postoji!", null);
			errorDetected = true;
		} else {
			Struct struct = null;

			switch (currentVarType.getTypeName()) {
			case "int":
				struct = new Struct(Struct.Int);
				break;
			case "char":
				struct = new Struct(Struct.Char);
				break;
			case "bool":
				struct = new Struct(Struct.Bool);
				break;
			}

			Struct structArr = new Struct(Struct.Array);
			structArr.setElementType(new Struct(struct.getKind()));

			arrVarMeth.obj = SymTable.insert(Obj.Var, arrVarMeth.getArrName(), structArr);

			report_info("Deklarisana lokalna promenljiva '" + arrVarMeth.getArrName() + "'", arrVarMeth);
		}
	}

	public void visit(MethRetType retType) {
		retType.obj = retType.getType().obj;
		currentRetType = retType.getType();
	}
	
	public void visit(VoidRetType voidRetType) {
		voidRetType.obj = new Obj(Obj.NO_VALUE, "void", new Struct(Struct.None));
	}

	public void visit(MethName methName) {
		if (currentRetType != null) {
			if (!checkIfTypeExists(currentRetType.getTypeName())) {
				report_error("Tip podatka " + currentRetType.getTypeName() + " ne postoji!", null);
				errorDetected = true;
			} else {
				Struct struct = null;

				switch (currentRetType.getTypeName()) {
				case "int":
					struct = new Struct(Struct.Int);
					break;
				case "char":
					struct = new Struct(Struct.Char);
					break;
				case "bool":
					struct = new Struct(Struct.Bool);
					break;
				}

				methName.obj = SymTable.insert(Obj.Meth, methName.getMethName(), struct);
			}
		} else
			methName.obj = SymTable.insert(Obj.Meth, methName.getMethName(), new Struct(Struct.None));

		currentMethod = methName.obj;

		SymTable.openScope();
	}

	public void visit(MethodDecl methDecl) {
		SymTable.chainLocalSymbols(currentMethod);
		SymTable.closeScope();
	}
	// =================== DEKLARISANJE LOKALNE PROMENLJIVE ===================

	// =================== PROVERA KORISCENJA PROMENLJIVIH ===================
	public void visit(DesignatorName designatorName) {
		Obj obj = SymTable.find(designatorName.getName());
		designatorName.obj = obj;
		if (obj == SymTable.noObj) {
			report_error("Promenljiva " + designatorName.getName() + " nije deklarisana", designatorName);
			errorDetected = true;
		} else {
			report_info_detected("Detektovano koriscenje promenljive " + designatorName.getName(), designatorName, obj);
		}
	}

	public void visit(DesignatorArray designatorArray) {
		// provera da li je Expr int zbog indeksiranja
		// mozda dodeliti Designator.obj designatorArray.obj-u?
		Struct indexType = designatorArray.getExpr().obj.getType();
		Struct varType = designatorArray.getDesignator().obj.getType();

		if (varType.getKind() != Struct.Array) {
			report_error("Promenljiva nije niz. Greska", designatorArray);
			errorDetected = true;
			designatorArray.obj = SymTable.noObj;
		} else if (indexType.getKind() != Struct.Int) {
			report_error("Indeks mora biti tipa 'int'! Greska prilikom indeksiranja niza", designatorArray);
			errorDetected = true;
			designatorArray.obj = SymTable.noObj;
		} else {
			designatorArray.obj = new Obj(Obj.Elem, "", varType.getElemType());
		}
	}

	// =================== PROVERA KORISCENJA PROMENLJIVIH ===================
	// =================== PROVERA KONTEKSTNIH USLOVA ZA ISKAZE ===================

	public void visit(DesignatorStmtInc stmtInc) {
		String desigName = stmtInc.getDesignator().obj.getName();
		Obj obj = SymTable.find(desigName);
		if (obj != SymTable.noObj) {
			if (obj.getKind() != Obj.Var && obj.getKind() != Obj.Elem) {
				report_error("Identifikator '" + desigName + "' mora biti promenljiva ili element niza! Greska",
						stmtInc);
				errorDetected = true;
			} else if (obj.getType().getKind() != Struct.Int) {
				report_error("Promenljiva '" + desigName + "' mora biti tipa 'int'! Greska", stmtInc);
				errorDetected = true;
			}
		}
	}

	public void visit(DesignatorStmtDec stmtDec) {
		String desigName = stmtDec.getDesignator().obj.getName();
		Obj obj = SymTable.find(desigName);
		if (obj != SymTable.noObj) {
			if (obj.getKind() != Obj.Var && obj.getKind() != Obj.Elem) {
				report_error("Identifikator '" + desigName + "' mora biti tipa promenljiva ili element niza! Greska",
						stmtDec);
				errorDetected = true;
			} else if (obj.getType().getKind() != Struct.Int) {
				report_error("Promenljiva '" + desigName + "' mora biti tipa 'int'! Greska", stmtDec);
				errorDetected = true;
			}
		}
	}

	public void visit(ReadStmt stmtRead) {
		String desigName = stmtRead.getDesignator().obj.getName();
		Obj obj = SymTable.find(desigName);
		if (obj != SymTable.noObj) {
			if (obj.getKind() != Obj.Var && obj.getKind() != Obj.Elem) {
				report_error("Identifikator '" + desigName + "' mora biti tipa promenljiva ili element niza! Greska",
						stmtRead);
				errorDetected = true;
			} else if (obj.getType().getKind() != Struct.Int && obj.getType().getKind() != Struct.Char
					&& obj.getType().getKind() != Struct.Bool) {
				report_error("Promenljiva '" + desigName + "' mora biti tipa 'int', 'char' ili 'bool'!Greska",
						stmtRead);
				errorDetected = true;
			}
		}
	}

	public void visit(PrintStmt stmtPrint) {
		Struct exprType = stmtPrint.getExpr().obj.getType();

		if (exprType.getKind() != Struct.Int && exprType.getKind() != Struct.Char
				&& exprType.getKind() != Struct.Bool) {
			report_error("Argument funckije print() mora biti tipa 'int', 'char' ili 'bool'!Greska", stmtPrint);
			errorDetected = true;
		}
	}

	public void visit(AssignStmt assignStmt) {
		Obj expr = ((OkExpr) assignStmt.getExprAssign()).getExpr().obj;
		Obj desig = assignStmt.getDesignator().obj;

		Struct exprType = expr.getType();
		Struct desigType = desig.getType();

		if (assignStmt.getDesignator().obj.getKind() == Obj.Con) {
			report_error("Konstanti se ne moze dodeliti vrednost", assignStmt.getDesignator());
			errorDetected = true;
			return;
		}

		if (exprType.getKind() != Struct.Int && desigType.getKind() == Struct.Int) {
			report_error("Tipovi podataka nisu kompatibilni pri dodeli vrednosti", assignStmt);
			errorDetected = true;
			return;
		}
	}

	public void visit(TermExpr termExpr) {
		termExpr.obj = termExpr.getTerm().obj;
	}

	public void visit(MinusTermExpr minusTermExpr) {
		if (minusTermExpr.getTerm().obj.getType().getKind() != Struct.Int) {
			report_error("Promenljive u aritmetickom izrazu moraju biti tipa 'int'", minusTermExpr);
			errorDetected = true;
			minusTermExpr.obj = SymTable.noObj;
		} else {
			minusTermExpr.obj = minusTermExpr.getTerm().obj;
		}
	}

	public void visit(AddExpr addExpr) {
		Struct exprType = addExpr.getExpr().obj.getType();
		Struct termType = addExpr.getTerm().obj.getType();

		if (exprType.getKind() == Struct.Int && termType.getKind() == Struct.Int) {
			addExpr.obj = new Obj(Obj.Var, "", SymTable.intType);
		} else {
			report_error("Promenljive u aritmetickom izrazu moraju biti tipa 'int'! Greska", addExpr);
			errorDetected = true;
			addExpr.obj = SymTable.noObj;
		}
	}

	public void visit(MulTerm mulTerm) {
		Struct termType = mulTerm.getTerm().obj.getType();
		Struct factorType = mulTerm.getFactor().obj.getType();

		if (termType.getKind() == Struct.Int && factorType.getKind() == Struct.Int) {
			mulTerm.obj = new Obj(Obj.Var, "", SymTable.intType);
		} else {
			report_error("Promenljive u aritmetickom izrazu moraju biti tipa 'int'! Greska", mulTerm);
			errorDetected = true;
			mulTerm.obj = SymTable.noObj;
		}
	}

	public void visit(DesignatorStmtArray stmtArray) {
		// proci kroz listu tipova i videti da li se slazu tipovi sa designatorom sa
		// desne strane
		// vratiti na null listu jer mozemo da imamo vise takvih dodela vrednosti u
		// programu
		Struct desigType = stmtArray.getDesignator().obj.getType();
		
		if(desigType.getKind() != Struct.Array) {
			report_error("Promenljiva sa desne strane dodele mora biti niz! Greska", stmtArray);
			errorDetected = true;
		} else {
			for (int i = 0; i < complexArrayTypes.size(); i++) {
				if(complexArrayTypes.get(i) != desigType.getElemType().getKind()) {
					report_error("Tip podatka nije kompatibilan na indeksu " + i + "! Greska", stmtArray);
					errorDetected = true;
					break;
				}
			}
		}
		
		complexArrayTypes.clear();
		complexArrayTypes = null;
	}

	public void visit(DesignatorParam designatorParam) {
		String desigName = designatorParam.getDesignator().obj.getName();
		Obj obj = designatorParam.getDesignator().obj;

		if (obj != SymTable.noObj) {
			if (obj.getKind() != Obj.Var && obj.getKind() != Obj.Elem) {
				report_error("Identifikator '" + desigName + "' mora biti promenljiva ili element niza! Greska",
						designatorParam);
				errorDetected = true;
			} else {
				// uvezati u listu tipova
				if (complexArrayTypes == null)
					complexArrayTypes = new ArrayList<Integer>();
				complexArrayTypes.add(obj.getType().getKind());
			}
		}
	}

	public void visit(TermFactor termFactor) {
		termFactor.obj = termFactor.getFactor().obj;
	}

	public void visit(DesignatorFactor designatorFactor) {
		designatorFactor.obj = designatorFactor.getDesignator().obj;
	}

	public void visit(DelimitedFactor delimitedFactor) {
		delimitedFactor.obj = delimitedFactor.getExpr().obj;
	}

	public void visit(NewArrayFactor newArrayFactor) {
		if(newArrayFactor.getExpr().obj.getType().getKind() != Struct.Int) {
			report_error("Velicina niza mora biti tipa 'int'! Greska", newArrayFactor);
			newArrayFactor.obj = SymTable.noObj;
			errorDetected = true;
		} else {
			newArrayFactor.obj = new Obj(Obj.Var, "", new Struct(Struct.Array, newArrayFactor.getType().obj.getType()));
		}
	}

	public void visit(NumFactor numFactor) {
		numFactor.obj = new Obj(Obj.Con, "", SymTable.intType, numFactor.getValue(), 1);
	}

	public void visit(CharFactor charFactor) {
		charFactor.obj = new Obj(Obj.Con, "", SymTable.charType, charFactor.getValue(), 1);
	}

	public void visit(BoolFactor boolFactor) {
		boolFactor.obj = new Obj(Obj.Con, "", SymTable.boolType, boolFactor.getValue() ? 1 : 0, 1);
	}

	public void visit(Type type) {
		Obj typeObj = SymTable.find(type.getTypeName());

		if (typeObj.getKind() == Obj.Type) {
			type.obj = typeObj;
		} else {
			type.obj = new Obj(Obj.Type, type.getTypeName(), SymTable.noType);
			report_error("Tip podatka '" + type.getTypeName() + "' ne postoji u specifikaciji. Greska", type);
			errorDetected = true;
		}
	}
	// =================== PROVERA KONTEKSTNIH USLOVA ZA ISKAZE ===================
}
