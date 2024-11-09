import React, { createContext, useState, useContext, useEffect } from 'react';

export const ExpenseContext = createContext();

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('expenseEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries).map(entry => ({
        ...entry,
        date: new Date(entry.date)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenseEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setEntries(prev => [newEntry, ...prev]);
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const editEntry = (id, updatedEntry) => {
    setEntries(prev => prev.map(entry => entry.id === id ? { ...updatedEntry, id } : entry));
  };

  return (
    <ExpenseContext.Provider value={{ entries, addEntry, deleteEntry, editEntry }}>
      {children}
    </ExpenseContext.Provider>
  );
};