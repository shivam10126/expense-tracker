import React, { useState, useEffect, useCallback } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExpenditureChart() {
  const { getAllEntries, incomeCategories, expenseCategories } = useExpenseContext();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('monthlyOverview');
  const [graphType, setGraphType] = useState('bar');

  const aggregateData = useCallback((entries, type) => {
    const aggregated = {};

    switch (type) {
      case 'dailyOverview':
        entries.forEach(entry => {
          const date = new Date(entry.date).toISOString().split('T')[0];
          if (!aggregated[date]) {
            aggregated[date] = { date, income: 0, expense: 0 };
          }
          if (entry.type === 'income') {
            aggregated[date].income += entry.amount;
          } else {
            aggregated[date].expense += entry.amount;
          }
        });
        break;
      case 'monthlyOverview':
        entries.forEach(entry => {
          const month = new Date(entry.date).toLocaleString('default', { month: 'long' });
          if (!aggregated[month]) {
            aggregated[month] = { month, income: 0, expense: 0 };
          }
          if (entry.type === 'income') {
            aggregated[month].income += entry.amount;
          } else {
            aggregated[month].expense += entry.amount;
          }
        });
        break;
      case 'expenseCategory':
        expenseCategories.forEach(category => {
          aggregated[category] = { category, amount: 0 };
        });
        entries.forEach(entry => {
          if (entry.type === 'expenses') {
            aggregated[entry.category].amount += entry.amount;
          }
        });
        break;
      case 'incomeCategory':
        incomeCategories.forEach(category => {
          aggregated[category] = { category, amount: 0 };
        });
        entries.forEach(entry => {
          if (entry.type === 'income') {
            aggregated[entry.category].amount += entry.amount;
          }
        });
        break;
    }

    return Object.values(aggregated).sort((a, b) => {
      if (a.date) return new Date(a.date) - new Date(b.date);
      if (a.month) return new Date(a.month + ' 1, 2024') - new Date(b.month + ' 1, 2024');
      return 0;
    });
  }, [expenseCategories, incomeCategories]);

  useEffect(() => {
    const entries = getAllEntries();
    const aggregatedData = aggregateData(entries, chartType);
    setChartData(aggregatedData);
  }, [getAllEntries, chartType, aggregateData]);

  const renderChart = () => {
    const ChartComponent = graphType === 'bar' ? BarChart : LineChart;
    const DataComponent = graphType === 'bar' ? Bar : Line;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={chartType === 'dailyOverview' ? 'date' : chartType === 'monthlyOverview' ? 'month' : 'category'} 
            tickFormatter={chartType === 'dailyOverview' ? (tick) => new Date(tick).toLocaleDateString() : undefined}
          />
          <YAxis />
          <Tooltip labelFormatter={chartType === 'dailyOverview' ? (label) => new Date(label).toLocaleDateString() : undefined} />
          <Legend />
          {(chartType === 'monthlyOverview' || chartType === 'dailyOverview') ? (
            <>
              <DataComponent dataKey="income" fill="#4CAF50" stroke="#4CAF50" name="Income" />
              <DataComponent dataKey="expense" fill="#F44336" stroke="#F44336" name="Expense" />
            </>
          ) : (
            <DataComponent dataKey="amount" fill="#2196F3" stroke="#2196F3" name="Amount" />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <select
          className="p-2 border rounded-md"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="dailyOverview">Daily Overview</option>
          <option value="monthlyOverview">Monthly Overview</option>
          <option value="expenseCategory">Expense by Category</option>
          <option value="incomeCategory">Income by Category</option>
        </select>

        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="graphType"
              value="bar"
              checked={graphType === 'bar'}
              onChange={() => setGraphType('bar')}
            />
            <span className="ml-2">Bar</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="graphType"
              value="line"
              checked={graphType === 'line'}
              onChange={() => setGraphType('line')}
            />
            <span className="ml-2">Line</span>
          </label>
        </div>
      </div>

      {renderChart()}
    </div>
  );
}