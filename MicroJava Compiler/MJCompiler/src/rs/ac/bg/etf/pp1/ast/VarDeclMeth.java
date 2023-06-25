// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class VarDeclMeth implements SyntaxNode {

    private SyntaxNode parent;
    private int line;
    public rs.etf.pp1.symboltable.concepts.Obj obj = null;

    private VarTypeMeth VarTypeMeth;
    private VarDeclListMeth VarDeclListMeth;

    public VarDeclMeth (VarTypeMeth VarTypeMeth, VarDeclListMeth VarDeclListMeth) {
        this.VarTypeMeth=VarTypeMeth;
        if(VarTypeMeth!=null) VarTypeMeth.setParent(this);
        this.VarDeclListMeth=VarDeclListMeth;
        if(VarDeclListMeth!=null) VarDeclListMeth.setParent(this);
    }

    public VarTypeMeth getVarTypeMeth() {
        return VarTypeMeth;
    }

    public void setVarTypeMeth(VarTypeMeth VarTypeMeth) {
        this.VarTypeMeth=VarTypeMeth;
    }

    public VarDeclListMeth getVarDeclListMeth() {
        return VarDeclListMeth;
    }

    public void setVarDeclListMeth(VarDeclListMeth VarDeclListMeth) {
        this.VarDeclListMeth=VarDeclListMeth;
    }

    public SyntaxNode getParent() {
        return parent;
    }

    public void setParent(SyntaxNode parent) {
        this.parent=parent;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line=line;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarTypeMeth!=null) VarTypeMeth.accept(visitor);
        if(VarDeclListMeth!=null) VarDeclListMeth.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarTypeMeth!=null) VarTypeMeth.traverseTopDown(visitor);
        if(VarDeclListMeth!=null) VarDeclListMeth.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarTypeMeth!=null) VarTypeMeth.traverseBottomUp(visitor);
        if(VarDeclListMeth!=null) VarDeclListMeth.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("VarDeclMeth(\n");

        if(VarTypeMeth!=null)
            buffer.append(VarTypeMeth.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarDeclListMeth!=null)
            buffer.append(VarDeclListMeth.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarDeclMeth]");
        return buffer.toString();
    }
}
