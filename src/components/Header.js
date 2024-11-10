import React from 'react';

export default function Header() {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">
        <span className="text-blue-600">Expense</span> Tracker
      </h1>
      <p className="text-gray-600 mt-2">Manage your finances with ease</p>
    </header>
  );
}