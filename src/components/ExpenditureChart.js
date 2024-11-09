import React, { useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

export default function ExpenditureChart() {
  const { entries } = useExpenseContext();
  const [chartType, setChartType] = useState('daily');

  const aggregateData = () => {
    const aggregated = {};

    entries.forEach(entry => {
      let key;
      if (chartType === 'daily') {
        key = entry.date.toISOString().split('T')[0];
      } else if (chartType === 'weekly') {
        const date = new Date(entry.date);
        const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
        key = weekStart.toISOString().split('T')[0];
      } else {
        key = `${entry.date.getFullYear()}-${String(entry.date.getMonth() + 1).padStart(2, '0')}`;
      }

      if (!aggregated[key]) {
        aggregated[key] = { income: 0, expense: 0 };
      }
      aggregated[key][entry.type] += entry.amount;
    });

    return Object.entries(aggregated)
      .sort(([a], [b]) => a.localeCompare(b))
      .reduce((acc, [date, data]) => {
        acc.labels.push(date);
        acc.income.push(data.income);
        acc.expense.push(data.expense);
        return acc;
      }, { labels: [], income: [], expense: [] });
  };

  const data = aggregateData();

  const barChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Income',
        data: data.income,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: data.expense,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Balance',
        data: data.income.map((income, index) => income - data.expense[index]),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Expenditure Charts</h2>
      <div className="mb-4">
        <label className="mr-2">View:</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Income vs Expenses</h3>
          <Bar data={barChartData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Balance Trend</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
}