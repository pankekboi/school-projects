// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class VarArgDeclListDerived1 extends VarArgDeclList {

    private VarArgDeclList VarArgDeclList;
    private VarArg VarArg;

    public VarArgDeclListDerived1 (VarArgDeclList VarArgDeclList, VarArg VarArg) {
        this.VarArgDeclList=VarArgDeclList;
        if(VarArgDeclList!=null) VarArgDeclList.setParent(this);
        this.VarArg=VarArg;
        if(VarArg!=null) VarArg.setParent(this);
    }

    public VarArgDeclList getVarArgDeclList() {
        return VarArgDeclList;
    }

    public void setVarArgDeclList(VarArgDeclList VarArgDeclList) {
        this.VarArgDeclList=VarArgDeclList;
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
        if(VarArgDeclList!=null) VarArgDeclList.accept(visitor);
        if(VarArg!=null) VarArg.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarArgDeclList!=null) VarArgDeclList.traverseTopDown(visitor);
        if(VarArg!=null) VarArg.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarArgDeclList!=null) VarArgDeclList.traverseBottomUp(visitor);
        if(VarArg!=null) VarArg.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("VarArgDeclListDerived1(\n");

        if(VarArgDeclList!=null)
            buffer.append(VarArgDeclList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarArg!=null)
            buffer.append(VarArg.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarArgDeclListDerived1]");
        return buffer.toString();
    }
}
