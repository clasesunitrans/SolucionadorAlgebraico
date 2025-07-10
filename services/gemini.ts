
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "NO_KEY_FALLBACK" });
const modelName = 'gemini-2.5-flash-preview-04-17';

export const solveWithGemini = async (equation) => {
  if (!API_KEY) {
     return Promise.reject(new Error("La API Key de Gemini no está configurada."));
  }
  try {
    const prompt = `
Eres un asistente matemático experto para estudiantes universitarios de primer año de ciencias de la computación o ingeniería.
Resuelve la siguiente ecuación algebraica.

**Instrucciones de formato MUY IMPORTANTES:**
1.  **Utiliza LaTeX para TODAS las expresiones matemáticas.** Esto incluye variables (ej. $x, y, z$), números en ecuaciones, operadores ($+, -, =, \\times, \\div$), fracciones (ej. $\\frac{a}{b}$), exponentes (ej. $x^2$), raíces (ej. $\\sqrt{x}$), etc.
2.  Cuando uses raíces cuadradas, usa el formato específico \`\\sqrt{expresión_interna}\`. Por ejemplo, para la raíz cuadrada de 'b al cuadrado menos 4ac', escribe \`\\sqrt{b^2-4ac}\`.
3.  Para ecuaciones o expresiones que deban mostrarse en su propia línea (display math), utiliza la sintaxis LaTeX \`$$expresión$$\`.
4.  Para expresiones matemáticas dentro de un texto (inline math), utiliza la sintaxis LaTeX \`$expresión$\`.
5.  Proporciona la solución final y los pasos clave para llegar a ella de forma concisa. Formatea también los pasos y cualquier matemática dentro de ellos usando LaTeX según las reglas 2, 3 y 4.
6.  Asegúrate de que el LaTeX sea VÁLIDO y ESTÁNDAR. No utilices paquetes o comandos LaTeX obscuros. Usa comandos comunes como \\times, \\frac, \\sqrt, etc.
7.  Si la ecuación tiene múltiples variables, intenta resolverla para la variable más común (como '$x$', '$y$', '$z$') o indica si se necesita especificar para cuál variable resolver, usando LaTeX para las variables.
8.  Si la ecuación es trivial (ej. '$x=5$'), simplemente confírmala usando LaTeX.
9.  Si la ecuación no parece ser una ecuación algebraica estándar, es demasiado compleja para una solución directa, o no tiene solución, explícalo brevemente.
10. La respuesta debe estar completamente en español. Mantén el texto explicativo conciso.

Ecuación: ${equation}

Ejemplo de formato de respuesta esperado:
Solución:
$$x = 5$$

Pasos clave:
1.  Dado que $2x + 3 = 13$.
2.  Restamos $3$ de ambos lados de la ecuación:
    $$2x + 3 - 3 = 13 - 3$$
    $$2x = 10$$
3.  Dividimos ambos lados por $2$:
    $$\\frac{2x}{2} = \\frac{10}{2}$$
    $$x = 5$$

Si la ecuación es, por ejemplo, $ax^2 + bx + c = 0$ y se pide resolver para $x$:
Solución:
$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$
Pasos clave:
1. Dada la ecuación cuadrática $ax^2 + bx + c = 0$.
2. Aplicamos la fórmula cuadrática: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.
3. Se calculan los valores de $x_1$ y $x_2$ usando el discriminante $D = b^2-4ac$.
   Si $D > 0$, hay dos soluciones reales distintas.
   Si $D = 0$, hay una solución real (o dos soluciones reales iguales).
   Si $D < 0$, no hay soluciones reales (hay dos soluciones complejas conjugadas).
    `;

    const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
             throw new Error("API Key de Gemini no válida. Por favor, verifica tu configuración.");
        }
        if (error.message.toLowerCase().includes('quota')) {
            throw new Error("Se ha alcanzado la cuota de la API de Gemini. Inténtalo más tarde.");
        }
    }
    throw new Error("No se pudo obtener una respuesta del servicio de IA. Inténtalo de nuevo más tarde.");
  }
};