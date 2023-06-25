// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public class ClassDeclDerived1 extends ClassDecl {

    private ClassName ClassName;
    private OptExtends OptExtends;
    private VarMethDeclList VarMethDeclList;
    private OptClassInit OptClassInit;

    public ClassDeclDerived1 (ClassName ClassName, OptExtends OptExtends, VarMethDeclList VarMethDeclList, OptClassInit OptClassInit) {
        this.ClassName=ClassName;
        if(ClassName!=null) ClassName.setParent(this);
        this.OptExtends=OptExtends;
        if(OptExtends!=null) OptExtends.setParent(this);
        this.VarMethDeclList=VarMethDeclList;
        if(VarMethDeclList!=null) VarMethDeclList.setParent(this);
        this.OptClassInit=OptClassInit;
        if(OptClassInit!=null) OptClassInit.setParent(this);
    }

    public ClassName getClassName() {
        return ClassName;
    }

    public void setClassName(ClassName ClassName) {
        this.ClassName=ClassName;
    }

    public OptExtends getOptExtends() {
        return OptExtends;
    }

    public void setOptExtends(OptExtends OptExtends) {
        this.OptExtends=OptExtends;
    }

    public VarMethDeclList getVarMethDeclList() {
        return VarMethDeclList;
    }

    public void setVarMethDeclList(VarMethDeclList VarMethDeclList) {
        this.VarMethDeclList=VarMethDeclList;
    }

    public OptClassInit getOptClassInit() {
        return OptClassInit;
    }

    public void setOptClassInit(OptClassInit OptClassInit) {
        this.OptClassInit=OptClassInit;
    }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void childrenAccept(Visitor visitor) {
        if(ClassName!=null) ClassName.accept(visitor);
        if(OptExtends!=null) OptExtends.accept(visitor);
        if(VarMethDeclList!=null) VarMethDeclList.accept(visitor);
        if(OptClassInit!=null) OptClassInit.accept(visitor);
    }

    public void traverseTopDown(Visitor visitor) {
        accept(visitor);
        if(ClassName!=null) ClassName.traverseTopDown(visitor);
        if(OptExtends!=null) OptExtends.traverseTopDown(visitor);
        if(VarMethDeclList!=null) VarMethDeclList.traverseTopDown(visitor);
        if(OptClassInit!=null) OptClassInit.traverseTopDown(visitor);
    }

    public void traverseBottomUp(Visitor visitor) {
        if(ClassName!=null) ClassName.traverseBottomUp(visitor);
        if(OptExtends!=null) OptExtends.traverseBottomUp(visitor);
        if(VarMethDeclList!=null) VarMethDeclList.traverseBottomUp(visitor);
        if(OptClassInit!=null) OptClassInit.traverseBottomUp(visitor);
        accept(visitor);
    }

    public String toString(String tab) {
        StringBuffer buffer=new StringBuffer();
        buffer.append(tab);
        buffer.append("ClassDeclDerived1(\n");

        if(ClassName!=null)
            buffer.append(ClassName.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(OptExtends!=null)
            buffer.append(OptExtends.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(VarMethDeclList!=null)
            buffer.append(VarMethDeclList.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        if(OptClassInit!=null)
            buffer.append(OptClassInit.toString("  "+tab));
        else
            buffer.append(tab+"  null");
        buffer.append("\n");

        buffer.append(tab);
        buffer.append(") [ClassDeclDerived1]");
        return buffer.toString();
    }
}
