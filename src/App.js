import React, { useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenditureChart from './components/ExpenditureChart';

function App() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative bg-white shadow-lg sm:rounded-3xl overflow-hidden flex flex-col">
            <div className="px-4 py-6 sm:px-8 sm:py-10 flex-shrink-0">
              <Header />
              <Dashboard />
            </div>
            <div className="flex flex-col ">
              <div className="flex border-b border-gray-200 flex-shrink-0">
                {['list', 'chart'].map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-4 text-center flex-1 transition-colors duration-300 ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'list' ? 'Expense List' : 'Charts'}
                  </button>
                ))}
              </div>
              <div className="relative ">
                <div
                  className={` inset-0 h-fit transition-opacity duration-300 ease-in-out ${
                    activeTab === 'list' ? 'opacity-100 z-10 block' : 'opacity-0 z-0 hidden'
                  }`}
                >
                  <div className=" p-4">
                    <ExpenseList />
                  </div>
                </div>
                <div
                  className={` inset-0 h-fit transition-opacity duration-300 ease-in-out ${
                    activeTab === 'chart' ? 'opacity-100 z-10 block' : 'opacity-0 z-0 hidden'
                  }`}
                >
                  <div className=" p-4">
                    <ExpenditureChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;