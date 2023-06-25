// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class VarDeclListMethDerived2 extends VarDeclListMeth {

    private VarMeth VarMeth;

    public VarDeclListMethDerived2 (VarMeth VarMeth) {
        this.VarMeth=VarMeth;
        if(VarMeth!=null) VarMeth.setParent(this);
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
        if(VarMeth!=null) VarMeth.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarMeth!=null) VarMeth.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarMeth!=null) VarMeth.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("VarDeclListMethDerived2(\n");

        if(VarMeth!=null)
            buffer.append(VarMeth.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarDeclListMethDerived2]");
        return buffer.toString();
    }
}
