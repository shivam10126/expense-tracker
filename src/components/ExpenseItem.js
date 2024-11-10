import React, { useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

export default function ExpenseItem({ entry }) {
  const { deleteEntry, editEntry } = useExpenseContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState(entry);

  const handleEdit = () => {
    editEntry(entry.type, entry.month, entry.index, editedEntry);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteEntry(entry.type, entry.month, entry.index);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <input
          type="number"
          value={editedEntry.amount}
          onChange={(e) => setEditedEntry({ ...editedEntry, amount: parseFloat(e.target.value) })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          value={editedEntry.description}
          onChange={(e) => setEditedEntry({ ...editedEntry, description: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <select
          value={editedEntry.category}
          onChange={(e) => setEditedEntry({ ...editedEntry, category: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        >
          {entry.type === 'income' ? (
            <>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investments">Investments</option>
              <option value="Rental Income">Rental Income</option>
            </>
          ) : (
            <>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
              <option value="Healthcare">Healthcare</option>
            </>
          )}
        </select>
        <input
          type="date"
          value={editedEntry.date}
          onChange={(e) => setEditedEntry({ ...editedEntry, date: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${entry.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{entry.description}</h3>
          <p className="text-sm text-gray-500">{entry.category}</p>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            ${entry.amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700">Edit</button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">Delete</button>
      </div>
    </div>
  );
}