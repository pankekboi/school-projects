// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class VarMethDeclListDerived1 extends VarMethDeclList {

    private VarMethDeclList VarMethDeclList;
    private VarDeclMeth VarDeclMeth;

    public VarMethDeclListDerived1 (VarMethDeclList VarMethDeclList, VarDeclMeth VarDeclMeth) {
        this.VarMethDeclList=VarMethDeclList;
        if(VarMethDeclList!=null) VarMethDeclList.setParent(this);
        this.VarDeclMeth=VarDeclMeth;
        if(VarDeclMeth!=null) VarDeclMeth.setParent(this);
    }

    public VarMethDeclList getVarMethDeclList() {
        return VarMethDeclList;
    }

    public void setVarMethDeclList(VarMethDeclList VarMethDeclList) {
        this.VarMethDeclList=VarMethDeclList;
    }

    public VarDeclMeth getVarDeclMeth() {
        return VarDeclMeth;
    }

    public void setVarDeclMeth(VarDeclMeth VarDeclMeth) {
        this.VarDeclMeth=VarDeclMeth;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(VarMethDeclList!=null) VarMethDeclList.accept(visitor);
        if(VarDeclMeth!=null) VarDeclMeth.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(VarMethDeclList!=null) VarMethDeclList.traverseTopDown(visitor);
        if(VarDeclMeth!=null) VarDeclMeth.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(VarMethDeclList!=null) VarMethDeclList.traverseBottomUp(visitor);
        if(VarDeclMeth!=null) VarDeclMeth.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("VarMethDeclListDerived1(\n");

        if(VarMethDeclList!=null)
            buffer.append(VarMethDeclList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarDeclMeth!=null)
            buffer.append(VarDeclMeth.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [VarMethDeclListDerived1]");
        return buffer.toString();
    }
}
