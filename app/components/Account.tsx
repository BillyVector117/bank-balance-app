// src/Account.tsx
import React, { useContext } from 'react';
import { BankContext } from '../context/BankContext';
import { Account as AccountType, Transaction } from '../types';

interface Props {
  accountId: string;
}

const Account: React.FC<Props> = ({ accountId }) => {
  const context = useContext(BankContext);

  if (!context) {
    throw new Error('BankContext must be used within a BankProvider');
  }

  const { state } = context;
  const account = state.accounts.find(acc => acc.id === accountId);

  if (!account) return <div>Account not found</div>;

  return (
    <div>
      <h2>Account ID: {account.id}</h2>
      <p>Balance: ${account.balance}</p>
      <TransactionHistory transactions={account.transactions} />
    </div>
  );
};

const TransactionHistory: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <div>
    <h3>Transaction History</h3>
    <ul>
      {transactions.map(tx => (
        <li key={tx.id}>
          {tx.type}: ${tx.amount} on {tx.date.toLocaleDateString()} at {tx.location}
        </li>
      ))}
    </ul>
  </div>
);

export default Account;
