package rs.ac.bg.etf.pp1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;

import java_cup.runtime.Symbol;
import rs.ac.bg.etf.pp1.ast.Program;
import rs.ac.bg.etf.pp1.symtable.SymTable;
import rs.ac.bg.etf.pp1.util.Log4JUtils;
import rs.etf.pp1.mj.runtime.Code;

public class Compiler {
	static {
		DOMConfigurator.configure(Log4JUtils.instance().findLoggerConfigFile());
		Log4JUtils.instance().prepareLogFile(Logger.getRootLogger());
	}
	
	public static void tsdump() {
		SymTable.dump();
	}

	public static void main(String[] args) throws Exception {

		Logger log = Logger.getLogger(Compiler.class);
		
		if(args.length != 2) {
			log.error("Compiler zahteva dva argumenta: <naziv-src-fajla> <naziv-obj-fajla>");
			return;
		}

		Reader br = null;
		try {
			// File sourceCode = new File("test/program.mj");
			File sourceCode = new File(args[0]);
			
			if(!sourceCode.exists()) {
				log.error("Fajl sa izvornim kodom " + sourceCode.getAbsolutePath() + " ne postoji!");
				return;
			}
			
			log.info("Kompajliranje fajla sa izvornim kodom: " + sourceCode.getAbsolutePath());

			br = new BufferedReader(new FileReader(sourceCode));
			Yylex lexer = new Yylex(br);

			MJParser p = new MJParser(lexer);
			Symbol s = p.parse(); // pocetak parsiranja

			Program prog = (Program) (s.value);
			SymTable.init();
			// ispis sintaksnog stabla
			log.info(prog.toString(""));
			log.info("===================================");

			// ispis prepoznatih programskih konstrukcija
			SemanticAnalyzer analyzer = new SemanticAnalyzer();
			prog.traverseBottomUp(analyzer);

			tsdump();
			log.info("===================================");

			if (SemanticAnalyzer.errorDetected) {
				log.info("KOMPAJLIRANJE NIJE USPESNO ZAVRSENO!");
			} else {
				File objFile = new File(args[1]);
				
				log.info("Generisanje bajtkoda za fajl: " + objFile.getAbsolutePath());
				
				if (objFile.exists())
					objFile.delete();

				CodeGenerator codeGenerator = new CodeGenerator();
				prog.traverseBottomUp(codeGenerator);
				Code.dataSize = analyzer.nVars;
				Code.mainPc = codeGenerator.getMainPc();
				Code.write(new FileOutputStream(objFile));

				log.info("===================================");
				log.info("KOMPAJLIRANJE JE USPESNO ZAVRSENO!");
			}

		} finally {
			if (br != null)
				try {
					br.close();
				} catch (IOException e1) {
					log.error(e1.getMessage(), e1);
				}
		}

	}
}
