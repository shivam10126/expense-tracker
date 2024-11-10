import React, { useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';
import AddExpenseForm from './AddExpenseForm';
import Modal from './Modal';

export default function ExpenseList() {
  const { getAllEntries } = useExpenseContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState('expense');

  const entries = getAllEntries();

  const openModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="space-x-2">
          <button
            onClick={() => openModal('expense')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>
          <button
            onClick={() => openModal('income')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Income
          </button>
        </div>
      </div>
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center">No entries yet. Add some expenses or income!</p>
      ) : (
        entries.map((entry, index) => (
          <ExpenseItem key={index} entry={entry} />
        ))
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">
          Add New {formType === 'expense' ? 'Expense' : 'Income'}
        </h2>
        <AddExpenseForm onSuccess={() => setIsModalOpen(false)} initialType={formType} />
      </Modal>
    </div>
  );
}