import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

// Hook to use Finance Context
export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}

// Hook to check user role
export function useRole() {
  const { role } = useFinance();
  return {
    role,
    isAdmin: role === 'admin',
    isViewer: role === 'viewer',
  };
}

// Hook to get filtered transactions
export function useFilteredTransactions() {
  const { transactions, filters } = useFinance();

  return transactions.filter((tx) => {
    // Filter by type
    if (filters.type !== 'all' && tx.type !== filters.type) {
      return false;
    }

    // Filter by category
    if (filters.category !== 'all' && tx.category !== filters.category) {
      return false;
    }

    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        tx.description.toLowerCase().includes(searchLower) ||
        tx.category.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
}

// Hook to calculate summary statistics
export function useSummaryStats() {
  const { transactions } = useFinance();

  const stats = {
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    transactionCount: transactions.length,
  };

  transactions.forEach((tx) => {
    if (tx.type === 'income') {
      stats.totalIncome += tx.amount;
    } else {
      stats.totalExpense += tx.amount;
    }
  });

  stats.totalBalance = stats.totalIncome - stats.totalExpense;

  return stats;
}

// Hook to get spending by category
export function useSpendingByCategory() {
  const { transactions } = useFinance();

  const categorySpending = {};

  transactions
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      categorySpending[tx.category] =
        (categorySpending[tx.category] || 0) + tx.amount;
    });

  return Object.entries(categorySpending)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
}

// Hook to get daily balance trend
export function useDailyBalanceTrend() {
  const { transactions } = useFinance();

  const dailyBalance = {};
  let runningBalance = 0;

  // Sort by date
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  sorted.forEach((tx) => {
    if (tx.type === 'income') {
      runningBalance += tx.amount;
    } else {
      runningBalance -= tx.amount;
    }

    dailyBalance[tx.date] = runningBalance;
  });

  return Object.entries(dailyBalance)
    .map(([date, balance]) => ({
      date,
      balance,
    }))
    .slice(-30); // Last 30 entries
}
