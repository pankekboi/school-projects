// generated with ast extension for cup
// version 0.8
// 15/0/2023 16:20:0


package rs.ac.bg.etf.pp1.ast;

public interface Visitor { 

    public void visit(DesignatorPar DesignatorPar);
    public void visit(VarMeth VarMeth);
    public void visit(Mulop Mulop);
    public void visit(DesignatorParList DesignatorParList);
    public void visit(ConstructorDecl ConstructorDecl);
    public void visit(CondFactOptRelop CondFactOptRelop);
    public void visit(Relop Relop);
    public void visit(Assignop Assignop);
    public void visit(CondTermList CondTermList);
    public void visit(MethodRetType MethodRetType);
    public void visit(Var Var);
    public void visit(ElseStmt ElseStmt);
    public void visit(StatementList StatementList);
    public void visit(RetExpr RetExpr);
    public void visit(Addop Addop);
    public void visit(Factor Factor);
    public void visit(CondTerm CondTerm);
    public void visit(VarDeclListMeth VarDeclListMeth);
    public void visit(CondFactList CondFactList);
    public void visit(Designator Designator);
    public void visit(OptClassInit OptClassInit);
    public void visit(OptExtends OptExtends);
    public void visit(Term Term);
    public void visit(FormParsList FormParsList);
    public void visit(PrintParam PrintParam);
    public void visit(Condition Condition);
    public void visit(ConstValue ConstValue);
    public void visit(VarArgDeclList VarArgDeclList);
    public void visit(ConstDeclList ConstDeclList);
    public void visit(ActParsList ActParsList);
    public void visit(Label Label);
    public void visit(GlobalDeclList GlobalDeclList);
    public void visit(VarMethDeclList VarMethDeclList);
    public void visit(VarDeclList VarDeclList);
    public void visit(Expr Expr);
    public void visit(VarArgDecl VarArgDecl);
    public void visit(ActPars ActPars);
    public void visit(DesignatorStatement DesignatorStatement);
    public void visit(Decl Decl);
    public void visit(Statement Statement);
    public void visit(VarDecl VarDecl);
    public void visit(ExprAssign ExprAssign);
    public void visit(ClassDecl ClassDecl);
    public void visit(ConstDecl ConstDecl);
    public void visit(CondFact CondFact);
    public void visit(MethodDeclList MethodDeclList);
    public void visit(LabelDerived1 LabelDerived1);
    public void visit(Type Type);
    public void visit(DesignatorParListDerived2 DesignatorParListDerived2);
    public void visit(DesignatorParListDerived1 DesignatorParListDerived1);
    public void visit(NoDesignatorParam NoDesignatorParam);
    public void visit(DesignatorParam DesignatorParam);
    public void visit(ActParsListDerived2 ActParsListDerived2);
    public void visit(ActParsListDerived1 ActParsListDerived1);
    public void visit(ActParsDerived2 ActParsDerived2);
    public void visit(ActParsDerived1 ActParsDerived1);
    public void visit(OpMod OpMod);
    public void visit(OpDiv OpDiv);
    public void visit(OpMul OpMul);
    public void visit(DelimitedFactor DelimitedFactor);
    public void visit(FactorDerived2 FactorDerived2);
    public void visit(NewArrayFactor NewArrayFactor);
    public void visit(BoolFactor BoolFactor);
    public void visit(CharFactor CharFactor);
    public void visit(NumFactor NumFactor);
    public void visit(FactorDerived1 FactorDerived1);
    public void visit(DesignatorFactor DesignatorFactor);
    public void visit(OpMinus OpMinus);
    public void visit(OpPlus OpPlus);
    public void visit(MulTerm MulTerm);
    public void visit(TermFactor TermFactor);
    public void visit(AddExpr AddExpr);
    public void visit(MinusTermExpr MinusTermExpr);
    public void visit(TermExpr TermExpr);
    public void visit(OkExpr OkExpr);
    public void visit(AssignopDerived1 AssignopDerived1);
    public void visit(DesignatorArray DesignatorArray);
    public void visit(DesignatorDerived1 DesignatorDerived1);
    public void visit(DesignatorName DesignatorName);
    public void visit(DesignatorStmtArray DesignatorStmtArray);
    public void visit(DesignatorStmtDec DesignatorStmtDec);
    public void visit(DesignatorStmtInc DesignatorStmtInc);
    public void visit(DesignatorStatementDerived2 DesignatorStatementDerived2);
    public void visit(DesignatorStatementDerived1 DesignatorStatementDerived1);
    public void visit(AssignStmt AssignStmt);
    public void visit(RelopDerived6 RelopDerived6);
    public void visit(RelopDerived5 RelopDerived5);
    public void visit(RelopDerived4 RelopDerived4);
    public void visit(RelopDerived3 RelopDerived3);
    public void visit(RelopDerived2 RelopDerived2);
    public void visit(RelopDerived1 RelopDerived1);
    public void visit(CondFactOptRelopDerived2 CondFactOptRelopDerived2);
    public void visit(CondFactOptRelopDerived1 CondFactOptRelopDerived1);
    public void visit(CondFactListDerived2 CondFactListDerived2);
    public void visit(CondFactListDerived1 CondFactListDerived1);
    public void visit(CondFactDerived1 CondFactDerived1);
    public void visit(CondTermListDerived2 CondTermListDerived2);
    public void visit(CondTermListDerived1 CondTermListDerived1);
    public void visit(CondTermDerived1 CondTermDerived1);
    public void visit(ConditionDerived1 ConditionDerived1);
    public void visit(ElseStmtDerived2 ElseStmtDerived2);
    public void visit(ElseStmtDerived1 ElseStmtDerived1);
    public void visit(RetExprDerived2 RetExprDerived2);
    public void visit(RetExprDerived1 RetExprDerived1);
    public void visit(PrintNumber PrintNumber);
    public void visit(PrintParamDerived2 PrintParamDerived2);
    public void visit(PrintParamDerived1 PrintParamDerived1);
    public void visit(StatementDerived7 StatementDerived7);
    public void visit(PrintStmt PrintStmt);
    public void visit(ReadStmt ReadStmt);
    public void visit(StatementDerived6 StatementDerived6);
    public void visit(StatementDerived5 StatementDerived5);
    public void visit(StatementDerived4 StatementDerived4);
    public void visit(StatementDerived3 StatementDerived3);
    public void visit(StatementDerived2 StatementDerived2);
    public void visit(StatementDerived1 StatementDerived1);
    public void visit(StatementListDerived2 StatementListDerived2);
    public void visit(StatementListDerived1 StatementListDerived1);
    public void visit(ArrVarMeth ArrVarMeth);
    public void visit(RegVarMeth RegVarMeth);
    public void visit(VarDeclListMethDerived2 VarDeclListMethDerived2);
    public void visit(VarDeclListMethDerived1 VarDeclListMethDerived1);
    public void visit(VarTypeMeth VarTypeMeth);
    public void visit(VarDeclMeth VarDeclMeth);
    public void visit(VarMethDeclListDerived2 VarMethDeclListDerived2);
    public void visit(VarMethDeclListDerived1 VarMethDeclListDerived1);
    public void visit(VarArg VarArg);
    public void visit(VarArgDeclListDerived2 VarArgDeclListDerived2);
    public void visit(VarArgDeclListDerived1 VarArgDeclListDerived1);
    public void visit(VarArgDeclDerived1 VarArgDeclDerived1);
    public void visit(FormParsListDerived2 FormParsListDerived2);
    public void visit(FormParsListDerived1 FormParsListDerived1);
    public void visit(MethName MethName);
    public void visit(VoidRetType VoidRetType);
    public void visit(MethRetType MethRetType);
    public void visit(MethodDecl MethodDecl);
    public void visit(MethodDeclListDerived2 MethodDeclListDerived2);
    public void visit(MethodDeclListDerived1 MethodDeclListDerived1);
    public void visit(ConstructorDeclDerived1 ConstructorDeclDerived1);
    public void visit(OptClassInitDerived2 OptClassInitDerived2);
    public void visit(OptClassInitDerived1 OptClassInitDerived1);
    public void visit(OptExtendsDerived2 OptExtendsDerived2);
    public void visit(OptExtendsDerived1 OptExtendsDerived1);
    public void visit(ClassName ClassName);
    public void visit(ClassDeclDerived1 ClassDeclDerived1);
    public void visit(ArrVar ArrVar);
    public void visit(RegVar RegVar);
    public void visit(SingleVarDecl SingleVarDecl);
    public void visit(MultiVarDecl MultiVarDecl);
    public void visit(VarType VarType);
    public void visit(VarDeclDerived1 VarDeclDerived1);
    public void visit(VarDeclType VarDeclType);
    public void visit(NoConstDeclList NoConstDeclList);
    public void visit(ConstDeclListDerived1 ConstDeclListDerived1);
    public void visit(ConstBool ConstBool);
    public void visit(ConstChar ConstChar);
    public void visit(ConstNum ConstNum);
    public void visit(Const Const);
    public void visit(ConstType ConstType);
    public void visit(ConstDeclDerived2 ConstDeclDerived2);
    public void visit(ConstDeclDerived1 ConstDeclDerived1);
    public void visit(DeclDerived3 DeclDerived3);
    public void visit(DeclDerived2 DeclDerived2);
    public void visit(DeclDerived1 DeclDerived1);
    public void visit(GlobalDeclListDerived2 GlobalDeclListDerived2);
    public void visit(GlobalDeclListDerived1 GlobalDeclListDerived1);
    public void visit(ProgName ProgName);
    public void visit(Program Program);

}
