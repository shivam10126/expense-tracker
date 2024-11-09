import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  const { entries } = useExpenseContext();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Expense List</h2>
      <div className="space-y-4">
        {entries.map(entry => (
          <ExpenseItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}