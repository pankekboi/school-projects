// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class VarArgDeclDerived1 extends VarArgDecl {

    private VarArgDeclList VarArgDeclList;

    public VarArgDeclDerived1 (VarArgDeclList VarArgDeclList) {
        this.VarArgDeclList=VarArgDeclList;
        if(VarArgDeclList!=null) VarArgDeclList.setParent(this);
    }

    public VarArgDeclList getVarArgDeclList() {
        return VarArgDeclList;
    }

    public void setVarArgDeclList(VarArgDeclList VarArgDeclList) {
        this.VarArgDeclList=VarArgDeclList;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarArgDeclList!=null) VarArgDeclList.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarArgDeclList!=null) VarArgDeclList.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarArgDeclList!=null) VarArgDeclList.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("VarArgDeclDerived1(\n");

        if(VarArgDeclList!=null)
            buffer.append(VarArgDeclList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarArgDeclDerived1]");
        return buffer.toString();
    }
}
