import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

export default function Dashboard() {
  const { entries } = useExpenseContext();

  const totalIncome = entries
    .filter(entry => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpenses = entries
    .filter(entry => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-green-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-green-800">Income</h2>
        <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-red-800">Expenses</h2>
        <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800">Balance</h2>
        <p className="text-2xl font-bold text-blue-600">${balance.toFixed(2)}</p>
      </div>
    </div>
  );
}