
import React, { useState, useEffect, useMemo } from 'react';

// KaTeX is expected to be loaded globally via CDN script in index.html

declare global {
  interface Window {
    katex: any; // You could define a more specific type if available or necessary
  }
}

const KatexDisplay = ({ content, className }) => {
  const [isKatexReady, setIsKatexReady] = useState(() => {
    return typeof window.katex !== 'undefined' && typeof window.katex.renderToString === 'function';
  });

  useEffect(() => {
    if (isKatexReady) return; 

    let attempts = 0;
    const maxAttempts = 10; 
    let intervalId = null; 

    const checkKatex = () => {
      if (typeof window.katex !== 'undefined' && typeof window.katex.renderToString === 'function') {
        setIsKatexReady(true);
        if (intervalId) clearInterval(intervalId);
      } else {
        attempts++;
        if (attempts >= maxAttempts && intervalId) {
          clearInterval(intervalId);
          if (typeof window !== 'undefined') { 
            console.warn("KaTeXDisplay: KaTeX did not load after several attempts. Mathematical notation may not render correctly.");
          }
        }
      }
    };

    if (!isKatexReady) {
      checkKatex(); 
      if (!isKatexReady && typeof window.katex === 'undefined') {
        intervalId = setInterval(checkKatex, 500);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isKatexReady]);

  useEffect(() => {
    if (isKatexReady && typeof window !== 'undefined' && window.katex) {
      console.log("KaTeXDisplay: KaTeX is ready. Running self-test for \\sqrt rendering...");
      try {
        const testLatex1 = "\\sqrt{x}";
        const testRender1 = window.katex.renderToString(testLatex1, { displayMode: false, throwOnError: true, output: 'html' });
        console.log(`KaTeXDisplay: Test render of "${testLatex1}":`, testRender1.substring(0, 100) + "..."); 
        if (!testRender1 || !testRender1.includes("sqrt")) { 
            console.error(`KaTeXDisplay: SELF-TEST FAILED! "${testLatex1}" did not render as expected or output is empty.`);
        } else {
            console.log(`KaTeXDisplay: SELF-TEST PASSED for "${testLatex1}".`);
        }

        const testLatex2 = "\\sqrt{b^2-4ac}";
        const testRender2 = window.katex.renderToString(testLatex2, { displayMode: false, throwOnError: true, output: 'html' });
        console.log(`KaTeXDisplay: Test render of "${testLatex2}":`, testRender2.substring(0, 100) + "...");
        if (!testRender2 || !testRender2.includes("sqrt")) {
            console.error(`KaTeXDisplay: SELF-TEST FAILED! "${testLatex2}" did not render as expected or output is empty.`);
        } else {
            console.log(`KaTeXDisplay: SELF-TEST PASSED for "${testLatex2}".`);
        }
      } catch (e) {
        console.error("KaTeXDisplay: Error during KaTeX self-test for \\sqrt:", e.message, e);
      }
    }
  }, [isKatexReady]);

  const htmlContent = useMemo(() => {
    if (!content) return '';

    if (!isKatexReady || !window.katex) { // Added !window.katex check for safety
      return content.replace(/\n/g, '<br />');
    }

    const lines = content.split('\n');
    const processedLines = lines.map(line => {
      let currentLine = line;

      currentLine = currentLine.replace(/\$\$([\s\S]*?)\$\$/g, (match, latexExp) => {
        const trimmedExp = latexExp.trim();
        if (!trimmedExp) return '';
        try {
          const rendered = window.katex.renderToString(trimmedExp, {
            displayMode: true,
            throwOnError: false, 
            errorColor: '#D8000C',
            output: 'html',
          });
          if (!rendered && trimmedExp) {
              console.warn(`KaTeXDisplay (display): Rendered empty string for non-empty LaTeX: "${trimmedExp}"`);
              return `<span style="color:orange; font-family:monospace; display:block; padding: 5px; border: 1px dashed orange;">[KaTeX Error (display): No output for <pre style="display:inline; white-space: pre-wrap;">${trimmedExp}</pre>]</span>`;
          }
          return rendered;
        } catch (e) {
          console.error(`KaTeXDisplay (display) rendering error for "${trimmedExp}":`, e.message, e);
          return `<span style="color:#D8000C; font-family:monospace; display:block; border: 1px solid #D8000C; padding: 5px;">Error en LaTeX (display): ${e.message}<br/>Expresión: <pre style="margin-top:5px; white-space: pre-wrap;">${trimmedExp}</pre></span>`;
        }
      });

      currentLine = currentLine.replace(/(?<!\$)\$([\s\S]+?)\$(?!\$)/g, (match, latexExp) => {
         const trimmedExp = latexExp.trim();
         if (!trimmedExp) return '';
         try {
          const rendered = window.katex.renderToString(trimmedExp, {
            displayMode: false,
            throwOnError: false,
            errorColor: '#D8000C',
            output: 'html',
          });
          if (!rendered && trimmedExp) {
              console.warn(`KaTeXDisplay (inline): Rendered empty string for non-empty LaTeX: "${trimmedExp}"`);
              return `<span style="color:orange; font-family:monospace; padding: 2px; border: 1px dashed orange;">[KaTeX Error (inline): No output for <pre style="display:inline; white-space: pre-wrap;">${trimmedExp}</pre>]</span>`;
          }
          return rendered;
        } catch (e) {
          console.error(`KaTeXDisplay (inline) rendering error for "${trimmedExp}":`, e.message, e);
          return `<span style="color:#D8000C; font-family:monospace;">Error en LaTeX (inline): ${e.message} (Expresión: <pre style="display:inline; white-space: pre-wrap;">${trimmedExp}</pre>)</span>`;
        }
      });
      
      return currentLine;
    });
    
    return processedLines.join('<br />');

  }, [content, isKatexReady]);

  if (!isKatexReady && (typeof window !== 'undefined' && !window.katex)) { 
    return (
      React.createElement('div', { className: className },
        React.createElement('p', { style: {color: 'red', fontWeight: 'bold', fontSize: '0.9em', marginBottom: '8px', border: '1px solid red', padding: '5px'} },
          "ADVERTENCIA CRÍTICA: KaTeX (renderizador matemático) NO está cargado. La notación matemática NO se mostrará. Revise la consola del navegador y la conexión a internet."
        ),
        React.createElement('pre', { style: {whiteSpace: 'pre-wrap', wordBreak: 'break-all'} }, content)
      )
    );
  }
  
  return (
    React.createElement('div', { className: className, dangerouslySetInnerHTML: { __html: htmlContent } })
  );
};

export default KatexDisplay;
