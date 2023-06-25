// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class DesignatorParListDerived1 extends DesignatorParList {

    private DesignatorParList DesignatorParList;
    private DesignatorPar DesignatorPar;

    public DesignatorParListDerived1 (DesignatorParList DesignatorParList, DesignatorPar DesignatorPar) {
        this.DesignatorParList=DesignatorParList;
        if(DesignatorParList!=null) DesignatorParList.setParent(this);
        this.DesignatorPar=DesignatorPar;
        if(DesignatorPar!=null) DesignatorPar.setParent(this);
    }

    public DesignatorParList getDesignatorParList() {
        return DesignatorParList;
    }

    public void setDesignatorParList(DesignatorParList DesignatorParList) {
        this.DesignatorParList=DesignatorParList;
    }

    public DesignatorPar getDesignatorPar() {
        return DesignatorPar;
    }

    public void setDesignatorPar(DesignatorPar DesignatorPar) {
        this.DesignatorPar=DesignatorPar;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(DesignatorParList!=null) DesignatorParList.accept(visitor);
        if(DesignatorPar!=null) DesignatorPar.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(DesignatorParList!=null) DesignatorParList.traverseTopDown(visitor);
        if(DesignatorPar!=null) DesignatorPar.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(DesignatorParList!=null) DesignatorParList.traverseBottomUp(visitor);
        if(DesignatorPar!=null) DesignatorPar.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("DesignatorParListDerived1(\n");

        if(DesignatorParList!=null)
            buffer.append(DesignatorParList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(DesignatorPar!=null)
            buffer.append(DesignatorPar.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [DesignatorParListDerived1]");
        return buffer.toString();
    }
}
