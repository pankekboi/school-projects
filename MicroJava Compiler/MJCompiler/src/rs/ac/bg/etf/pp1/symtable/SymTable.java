package rs.ac.bg.etf.pp1.symtable;

import rs.etf.pp1.symboltable.Tab;
import rs.etf.pp1.symboltable.concepts.Obj;
import rs.etf.pp1.symboltable.concepts.Scope;
import rs.etf.pp1.symboltable.concepts.Struct;
import rs.etf.pp1.symboltable.visitors.SymbolTableVisitor;

public class SymTable extends Tab {
	public static final Struct boolType = new Struct(Struct.Bool);

	public static void init() {
		Tab.init();
		currentScope.addToLocals(new Obj(Obj.Type, "bool", boolType));
	}

	public static void dump(SymbolTableVisitor stv) {
		System.out.println("=====================SYMBOL TABLE=========================");
		if (stv == null)
			stv = new EditedDumpSymbolTableVisitor();
		for (Scope s = currentScope; s != null; s = s.getOuter()) {
			s.accept(stv);
		}
		System.out.println(stv.getOutput());
	}
	
	public static void dump() {
		dump(null);
	}
}
