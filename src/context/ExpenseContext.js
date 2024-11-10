import React, { createContext, useContext, useState } from 'react';

const initialData = {
  incomeCategories: ["Salary", "Freelance", "Investments", "Rental Income"],
  expenseCategories: ["Food", "Transportation", "Entertainment", "Utilities", "Rent", "Healthcare"],
  income: {
    "January": [
      {
        date: "2024-01-05",
        amount: 5000,
        description: "Monthly salary",
        category: "Salary"
      },
      {
        date: "2024-01-15",
        amount: 800,
        description: "Freelance project",
        category: "Freelance"
      }
    ],
    "February": [
      {
        date: "2024-02-05",
        amount: 5000,
        description: "Monthly salary",
        category: "Salary"
      },
      {
        date: "2024-02-20",
        amount: 300,
        description: "Investment dividends",
        category: "Investments"
      }
    ]
  },
  expenses: {
    "January": [
      {
        date: "2024-01-03",
        amount: 200,
        description: "Groceries",
        category: "Food"
      },
      {
        date: "2024-01-08",
        amount: 50,
        description: "Gas",
        category: "Transportation"
      },
      {
        date: "2024-01-15",
        amount: 100,
        description: "Movie night",
        category: "Entertainment"
      },
      {
        date: "2024-01-18",
        amount: 75,
        description: "Internet bill",
        category: "Utilities"
      },
      {
        date: "2024-01-25",
        amount: 40,
        description: "Dinner with friends",
        category: "Food"
      },
      {
        date: "2024-01-28",
        amount: 30,
        description: "Bus pass",
        category: "Transportation"
      }
    ],
    "February": [
      {
        date: "2024-02-01",
        amount: 500,
        description: "Rent",
        category: "Rent"
      },
      {
        date: "2024-02-10",
        amount: 75,
        description: "Electricity bill",
        category: "Utilities"
      },
      {
        date: "2024-02-18",
        amount: 60,
        description: "Doctor's visit",
        category: "Healthcare"
      },
      {
        date: "2024-02-15",
        amount: 150,
        description: "Groceries",
        category: "Food"
      },
      {
        date: "2024-02-22",
        amount: 25,
        description: "Coffee shop",
        category: "Entertainment"
      },
      {
        date: "2024-02-26",
        amount: 50,
        description: "Taxi fare",
        category: "Transportation"
      }
    ]
  }
};


const ExpenseContext = createContext();

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const addEntry = (entry) => {
    const { type, date, ...rest } = entry;
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    
    setData(prevData => {
      const updatedData = { ...prevData };
      const category = type === 'income' ? 'income' : 'expenses';
      
      if (!updatedData[category][month]) {
        updatedData[category][month] = [];
      }
      
      updatedData[category][month].push({ date, ...rest });
      return updatedData;
    });
  };

  const deleteEntry = (type, month, index) => {
    setData(prevData => {
      const updatedData = { ...prevData };
      updatedData[type][month].splice(index, 1);
      if (updatedData[type][month].length === 0) {
        delete updatedData[type][month];
      }
      return updatedData;
    });
  };

  const editEntry = (type, month, index, updatedEntry) => {
    setData(prevData => {
      const updatedData = { ...prevData };
      updatedData[type][month][index] = updatedEntry;
      return updatedData;
    });
  };

  const getAllEntries = () => {
    const allEntries = [];
    ['income', 'expenses'].forEach(type => {
      Object.entries(data[type]).forEach(([month, entries]) => {
        entries.forEach((entry, index) => {
          allEntries.push({ ...entry, type, month, index });
        });
      });
    });
    return allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <ExpenseContext.Provider value={{ 
      data, 
      addEntry, 
      deleteEntry, 
      editEntry, 
      getAllEntries,
      incomeCategories: data.incomeCategories,
      expenseCategories: data.expenseCategories
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};