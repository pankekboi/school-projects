// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class CondFactDerived1 extends CondFact {

    private Expr Expr;
    private CondFactOptRelop CondFactOptRelop;

    public CondFactDerived1 (Expr Expr, CondFactOptRelop CondFactOptRelop) {
        this.Expr=Expr;
        if(Expr!=null) Expr.setParent(this);
        this.CondFactOptRelop=CondFactOptRelop;
        if(CondFactOptRelop!=null) CondFactOptRelop.setParent(this);
    }

    public Expr getExpr() {
        return Expr;
    }

    public void setExpr(Expr Expr) {
        this.Expr=Expr;
    }

    public CondFactOptRelop getCondFactOptRelop() {
        return CondFactOptRelop;
    }

    public void setCondFactOptRelop(CondFactOptRelop CondFactOptRelop) {
        this.CondFactOptRelop=CondFactOptRelop;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(Expr!=null) Expr.accept(visitor);
        if(CondFactOptRelop!=null) CondFactOptRelop.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(Expr!=null) Expr.traverseTopDown(visitor);
        if(CondFactOptRelop!=null) CondFactOptRelop.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(Expr!=null) Expr.traverseBottomUp(visitor);
        if(CondFactOptRelop!=null) CondFactOptRelop.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("CondFactDerived1(\n");

        if(Expr!=null)
            buffer.append(Expr.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(CondFactOptRelop!=null)
            buffer.append(CondFactOptRelop.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [CondFactDerived1]");
        return buffer.toString();
    }
}
