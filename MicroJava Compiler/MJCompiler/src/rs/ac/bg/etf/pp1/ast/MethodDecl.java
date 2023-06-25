// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class MethodDecl implements SyntaxNode {

    private SyntaxNode parent;
    private int line;
    public rs.etf.pp1.symboltable.concepts.Obj obj = null;

    private MethodRetType MethodRetType;
    private MethName MethName;
    private FormParsList FormParsList;
    private VarMethDeclList VarMethDeclList;
    private StatementList StatementList;

    public MethodDecl (MethodRetType MethodRetType, MethName MethName, FormParsList FormParsList, VarMethDeclList VarMethDeclList, StatementList StatementList) {
        this.MethodRetType=MethodRetType;
        if(MethodRetType!=null) MethodRetType.setParent(this);
        this.MethName=MethName;
        if(MethName!=null) MethName.setParent(this);
        this.FormParsList=FormParsList;
        if(FormParsList!=null) FormParsList.setParent(this);
        this.VarMethDeclList=VarMethDeclList;
        if(VarMethDeclList!=null) VarMethDeclList.setParent(this);
        this.StatementList=StatementList;
        if(StatementList!=null) StatementList.setParent(this);
    }

    public MethodRetType getMethodRetType() {
        return MethodRetType;
    }

    public void setMethodRetType(MethodRetType MethodRetType) {
        this.MethodRetType=MethodRetType;
    }

    public MethName getMethName() {
        return MethName;
    }

    public void setMethName(MethName MethName) {
        this.MethName=MethName;
    }

    public FormParsList getFormParsList() {
        return FormParsList;
    }

    public void setFormParsList(FormParsList FormParsList) {
        this.FormParsList=FormParsList;
    }

    public VarMethDeclList getVarMethDeclList() {
        return VarMethDeclList;
    }

    public void setVarMethDeclList(VarMethDeclList VarMethDeclList) {
        this.VarMethDeclList=VarMethDeclList;
    }

    public StatementList getStatementList() {
        return StatementList;
    }

    public void setStatementList(StatementList StatementList) {
        this.StatementList=StatementList;
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
        if(MethodRetType!=null) MethodRetType.accept(visitor);
        if(MethName!=null) MethName.accept(visitor);
        if(FormParsList!=null) FormParsList.accept(visitor);
        if(VarMethDeclList!=null) VarMethDeclList.accept(visitor);
        if(StatementList!=null) StatementList.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(MethodRetType!=null) MethodRetType.traverseTopDown(visitor);
        if(MethName!=null) MethName.traverseTopDown(visitor);
        if(FormParsList!=null) FormParsList.traverseTopDown(visitor);
        if(VarMethDeclList!=null) VarMethDeclList.traverseTopDown(visitor);
        if(StatementList!=null) StatementList.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(MethodRetType!=null) MethodRetType.traverseBottomUp(visitor);
        if(MethName!=null) MethName.traverseBottomUp(visitor);
        if(FormParsList!=null) FormParsList.traverseBottomUp(visitor);
        if(VarMethDeclList!=null) VarMethDeclList.traverseBottomUp(visitor);
        if(StatementList!=null) StatementList.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("MethodDecl(\n");

        if(MethodRetType!=null)
            buffer.append(MethodRetType.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(MethName!=null)
            buffer.append(MethName.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(FormParsList!=null)
            buffer.append(FormParsList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarMethDeclList!=null)
            buffer.append(VarMethDeclList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(StatementList!=null)
            buffer.append(StatementList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [MethodDecl]");
        return buffer.toString();
    }
}
