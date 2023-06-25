// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class FormParsListDerived1 extends FormParsList {

    private VarArgDecl VarArgDecl;

    public FormParsListDerived1 (VarArgDecl VarArgDecl) {
        this.VarArgDecl=VarArgDecl;
        if(VarArgDecl!=null) VarArgDecl.setParent(this);
    }

    public VarArgDecl getVarArgDecl() {
        return VarArgDecl;
    }

    public void setVarArgDecl(VarArgDecl VarArgDecl) {
        this.VarArgDecl=VarArgDecl;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarArgDecl!=null) VarArgDecl.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarArgDecl!=null) VarArgDecl.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarArgDecl!=null) VarArgDecl.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("FormParsListDerived1(\n");

        if(VarArgDecl!=null)
            buffer.append(VarArgDecl.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [FormParsListDerived1]");
        return buffer.toString();
    }
}
