// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class DesignatorStmtArray extends DesignatorStatement {

    private DesignatorPar DesignatorPar;
    private DesignatorParList DesignatorParList;
    private Designator Designator;

    public DesignatorStmtArray (DesignatorPar DesignatorPar, DesignatorParList DesignatorParList, Designator Designator) {
        this.DesignatorPar=DesignatorPar;
        if(DesignatorPar!=null) DesignatorPar.setParent(this);
        this.DesignatorParList=DesignatorParList;
        if(DesignatorParList!=null) DesignatorParList.setParent(this);
        this.Designator=Designator;
        if(Designator!=null) Designator.setParent(this);
    }

    public DesignatorPar getDesignatorPar() {
        return DesignatorPar;
    }

    public void setDesignatorPar(DesignatorPar DesignatorPar) {
        this.DesignatorPar=DesignatorPar;
    }

    public DesignatorParList getDesignatorParList() {
        return DesignatorParList;
    }

    public void setDesignatorParList(DesignatorParList DesignatorParList) {
        this.DesignatorParList=DesignatorParList;
    }

    public Designator getDesignator() {
        return Designator;
    }

    public void setDesignator(Designator Designator) {
        this.Designator=Designator;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(DesignatorPar!=null) DesignatorPar.accept(visitor);
        if(DesignatorParList!=null) DesignatorParList.accept(visitor);
        if(Designator!=null) Designator.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(DesignatorPar!=null) DesignatorPar.traverseTopDown(visitor);
        if(DesignatorParList!=null) DesignatorParList.traverseTopDown(visitor);
        if(Designator!=null) Designator.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(DesignatorPar!=null) DesignatorPar.traverseBottomUp(visitor);
        if(DesignatorParList!=null) DesignatorParList.traverseBottomUp(visitor);
        if(Designator!=null) Designator.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("DesignatorStmtArray(\n");

        if(DesignatorPar!=null)
            buffer.append(DesignatorPar.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(DesignatorParList!=null)
            buffer.append(DesignatorParList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(Designator!=null)
            buffer.append(Designator.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [DesignatorStmtArray]");
        return buffer.toString();
    }
}
