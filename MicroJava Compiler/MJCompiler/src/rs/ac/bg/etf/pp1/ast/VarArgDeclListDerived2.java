// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class VarArgDeclListDerived2 extends VarArgDeclList {

    private VarArg VarArg;

    public VarArgDeclListDerived2 (VarArg VarArg) {
        this.VarArg=VarArg;
        if(VarArg!=null) VarArg.setParent(this);
    }

    public VarArg getVarArg() {
        return VarArg;
    }

    public void setVarArg(VarArg VarArg) {
        this.VarArg=VarArg;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarArg!=null) VarArg.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarArg!=null) VarArg.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarArg!=null) VarArg.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("VarArgDeclListDerived2(\n");

        if(VarArg!=null)
            buffer.append(VarArg.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarArgDeclListDerived2]");
        return buffer.toString();
    }
}
