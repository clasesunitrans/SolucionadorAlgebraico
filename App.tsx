
import React from 'react';
import EquationSolverCard from './components/EquationSolverCard.js';

const App = () => {
  return (
    React.createElement('div', { className: "min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-slate-800" },
      React.createElement('header', { className: "mb-8 text-center" },
        React.createElement('h1', { className: "text-4xl font-bold text-orange-600" }, "Solucionador Algebraico IA"),
        React.createElement('p', { className: "text-slate-600 mt-2" }, "Ingresa tu ecuación y obtén la solución con IA.")
      ),
      React.createElement('main', { className: "w-full max-w-2xl" },
        React.createElement(EquationSolverCard)
      ),
      React.createElement('footer', { className: "mt-12 text-center text-sm text-slate-500" },
        React.createElement('p', null, `© ${new Date().getFullYear()} Felipe Martínez`),
        React.createElement('p', null, "clasesunitransfm@gmail.com")
      )
    )
  );
};

export default App;