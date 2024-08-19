// src/ReportGenerator.tsx
import React, { useContext } from 'react';
import { BankContext } from '../context/BankContext';
import { Transaction } from '../types';

const ReportGenerator: React.FC = () => {
  const context = useContext(BankContext);

  if (!context) {
    throw new Error('BankContext must be used within a BankProvider');
  }

  const { state } = context;

  const generateMonthlyReport = (month: number) => {
    const transactionsByMonth = state.accounts.flatMap(acc =>
      acc.transactions.filter(tx => new Date(tx.date).getMonth() === month)
    );

    const transactionCounts = transactionsByMonth.reduce((acc, tx) => {
      acc[tx.id] = (acc[tx.id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(transactionCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([id, count]) => ({ id, count }));
  };

  const generateWithdrawalReport = (threshold: number) => {
    const withdrawals = state.accounts.flatMap(acc =>
      acc.transactions.filter(tx => tx.type === 'withdraw' && tx.amount > threshold)
    );

    const withdrawalTotals = withdrawals.reduce((acc, tx) => {
      acc[tx.id] = (acc[tx.id] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(withdrawalTotals)
      .filter(([, total]) => total > threshold)
      .map(([id, total]) => ({ id, total }));
  };

  return (
    <div>
      <h2>Monthly Report</h2>
      {/* Call generateMonthlyReport and display results */}
      
      <h2>Withdrawal Report</h2>
      {/* Call generateWithdrawalReport and display results */}
    </div>
  );
};

export default ReportGenerator;
