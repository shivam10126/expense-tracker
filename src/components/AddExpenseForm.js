import React, { useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

export default function AddExpenseForm({ onSuccess, initialType = 'expense' }) {
  const { addEntry, incomeCategories, expenseCategories } = useExpenseContext();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState(initialType);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    addEntry({
      amount: parseFloat(amount),
      description,
      category,
      type,
      date
    });

    setAmount('');
    setDescription('');
    setCategory('');
    setType(initialType);
    setDate(new Date().toISOString().substr(0, 10));

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        >
          <option value="">Select a category</option>
          {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            <span className="ml-2">Expense</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="type"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            <span className="ml-2">Income</span>
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          type === 'expense' 
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
        } focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        Add {type === 'expense' ? 'Expense' : 'Income'}
      </button>
    </form>
  );
}