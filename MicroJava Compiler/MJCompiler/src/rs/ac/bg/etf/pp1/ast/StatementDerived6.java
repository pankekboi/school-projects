// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class StatementDerived6 extends Statement {

    private RetExpr RetExpr;

    public StatementDerived6 (RetExpr RetExpr) {
        this.RetExpr=RetExpr;
        if(RetExpr!=null) RetExpr.setParent(this);
    }

    public RetExpr getRetExpr() {
        return RetExpr;
    }

    public void setRetExpr(RetExpr RetExpr) {
        this.RetExpr=RetExpr;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(RetExpr!=null) RetExpr.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(RetExpr!=null) RetExpr.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(RetExpr!=null) RetExpr.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("StatementDerived6(\n");

        if(RetExpr!=null)
            buffer.append(RetExpr.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [StatementDerived6]");
        return buffer.toString();
    }
}
