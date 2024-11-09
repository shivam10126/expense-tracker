import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenditureChart from './components/ExpenditureChart';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <Header />
            <Dashboard />
            <div className="mt-10 space-y-10">
              <AddExpenseForm />
              <ExpenseList />
              <ExpenditureChart />
            </div>
          </div>
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;