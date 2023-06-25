package rs.ac.bg.etf.pp1;

import rs.ac.bg.etf.pp1.ast.ArrVarMeth;
import rs.ac.bg.etf.pp1.ast.RegVarMeth;
import rs.ac.bg.etf.pp1.ast.VarArg;
import rs.ac.bg.etf.pp1.ast.VisitorAdaptor;

public class VisitorCounter extends VisitorAdaptor {
	protected int count;
	
	public int getCount() {
		return count;
	}
	
	public static class FormParamCounter extends VisitorCounter{
		public void visit(VarArg varArg) {
			count++;
		}
	}
	
	public static class VarCounter extends VisitorCounter{
		public void visit(RegVarMeth varMeth) {
			count++;
		}
		
		public void visit(ArrVarMeth varMeth) {
			count++;
		}
	}
}
