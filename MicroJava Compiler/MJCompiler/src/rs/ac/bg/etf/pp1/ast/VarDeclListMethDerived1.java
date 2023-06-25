// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class VarDeclListMethDerived1 extends VarDeclListMeth {

    private VarDeclListMeth VarDeclListMeth;
    private VarMeth VarMeth;

    public VarDeclListMethDerived1 (VarDeclListMeth VarDeclListMeth, VarMeth VarMeth) {
        this.VarDeclListMeth=VarDeclListMeth;
        if(VarDeclListMeth!=null) VarDeclListMeth.setParent(this);
        this.VarMeth=VarMeth;
        if(VarMeth!=null) VarMeth.setParent(this);
    }

    public VarDeclListMeth getVarDeclListMeth() {
        return VarDeclListMeth;
    }

    public void setVarDeclListMeth(VarDeclListMeth VarDeclListMeth) {
        this.VarDeclListMeth=VarDeclListMeth;
    }

    public VarMeth getVarMeth() {
        return VarMeth;
    }

    public void setVarMeth(VarMeth VarMeth) {
        this.VarMeth=VarMeth;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarDeclListMeth!=null) VarDeclListMeth.accept(visitor);
        if(VarMeth!=null) VarMeth.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarDeclListMeth!=null) VarDeclListMeth.traverseTopDown(visitor);
        if(VarMeth!=null) VarMeth.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarDeclListMeth!=null) VarDeclListMeth.traverseBottomUp(visitor);
        if(VarMeth!=null) VarMeth.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("VarDeclListMethDerived1(\n");

        if(VarDeclListMeth!=null)
            buffer.append(VarDeclListMeth.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarMeth!=null)
            buffer.append(VarMeth.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarDeclListMethDerived1]");
        return buffer.toString();
    }
}
