
import React, { useState, useCallback } from 'react';
import { solveWithGemini } from '../services/gemini.js';
import { CopyIcon, ClearIcon, SparklesIcon, LoadingIcon } from './icons.js';
import KatexDisplay from './KatexDisplay.js';

const EquationSolverCard = () => {
  const [equation, setEquation] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSolve = useCallback(async () => {
    if (!equation.trim()) {
      setError('Por favor, ingresa una ecuación.');
      setSolution('');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSolution('');
    try {
      const result = await solveWithGemini(equation);
      setSolution(result);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al contactar el servicio de IA. Por favor, revisa tu API Key o inténtalo más tarde.');
      setSolution('');
    } finally {
      setIsLoading(false);
    }
  }, [equation]);

  const handleClear = () => {
    setEquation('');
    setSolution('');
    setError(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (solution) {
      navigator.clipboard.writeText(solution)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Error al copiar: ', err);
          setError('No se pudo copiar el resultado.');
        });
    }
  };

  return (
    React.createElement('div', { className: "bg-white p-6 sm:p-8 rounded-xl shadow-2xl space-y-6" },
      React.createElement('div', null,
        React.createElement('label', { htmlFor: "equation", className: "block text-sm font-medium text-slate-700 mb-1" },
          "Ecuación Algebraica"
        ),
        React.createElement('textarea', {
          id: "equation",
          value: equation,
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setEquation(e.target.value),
          placeholder: "Ej: 2x + 5 = 10  o  x^2 - 3x + 2 = 0",
          rows: 3,
          className: "w-full p-3 border border-blue-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out text-slate-800",
          disabled: isLoading,
          "aria-label": "Campo de entrada para la ecuación algebraica"
        })
      ),
      React.createElement('div', { className: "flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-3" },
        React.createElement('button', {
          onClick: handleSolve,
          disabled: isLoading || !equation.trim(),
          className: "w-full sm:w-auto flex-grow justify-center items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
          "aria-label": "Resolver la ecuación ingresada"
        },
          isLoading ? React.createElement(LoadingIcon, { className: "animate-spin h-5 w-5 mr-2" }) : React.createElement(SparklesIcon, { className: "h-5 w-5 mr-2" }),
          isLoading ? 'Resolviendo...' : 'Resolver Ecuación'
        ),
        React.createElement('button', {
          onClick: handleClear,
          disabled: isLoading && !equation.trim(),
          className: "w-full sm:w-auto flex justify-center items-center px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50",
          "aria-label": "Limpiar el campo de ecuación y el resultado"
        },
          React.createElement(ClearIcon, { className: "h-5 w-5 mr-2" }),
          "Limpiar"
        )
      ),
      error && (
        React.createElement('div', { role: "alert", className: "p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm" },
          error
        )
      ),
      solution && !isLoading && (
        React.createElement('div', { className: "space-y-3" },
          React.createElement('div', { className: "flex justify-between items-center" },
            React.createElement('h3', { className: "text-lg font-semibold text-slate-700" }, "Solución:"),
            React.createElement('button', {
              onClick: handleCopy,
              className: "flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md text-sm font-medium transition",
              title: "Copiar resultado",
              "aria-label": "Copiar el resultado de la solución"
            },
              React.createElement(CopyIcon, { className: "h-4 w-4 mr-1.5" }),
              copied ? '¡Copiado!' : 'Copiar'
            )
          ),
          React.createElement('div', { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg text-slate-700 overflow-x-auto" },
            React.createElement(KatexDisplay, { content: solution, className: "solution-output" })
          )
        )
      ),
      !solution && !isLoading && !error && (
         React.createElement('div', { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg text-slate-500 text-center" },
            "La solución y los pasos aparecerán aquí."
          )
      )
    )
  );
};

export default EquationSolverCard;
