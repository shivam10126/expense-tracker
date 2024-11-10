import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

export default function Dashboard() {
  const { getAllEntries } = useExpenseContext();
  const entries = getAllEntries();

  const totalIncome = entries
    .filter(entry => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpenses = entries
    .filter(entry => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
      </div>
      <div className={`p-4 rounded-lg shadow ${balance >= 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}>
        <h3 className={`text-lg font-semibold ${balance >= 0 ? 'text-blue-800' : 'text-yellow-800'}`}>Balance</h3>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
          ${Math.abs(balance).toFixed(2)}
          {balance < 0 && ' (Deficit)'}
        </p>
      </div>
    </div>
  );
}