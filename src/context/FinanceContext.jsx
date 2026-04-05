import { createContext, useState, useCallback } from 'react';
import { mockTransactions } from '../data/mockData';

export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('viewer'); // 'viewer' | 'admin'
  const [filters, setFilters] = useState({
    type: 'all', // 'all' | 'income' | 'expense'
    category: 'all',
    search: '',
  });

  // Switch user role
  const switchRole = useCallback((newRole) => {
    setRole(newRole);
  }, []);

  // Add new transaction (Admin only)
  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
    };
    setTransactions([...transactions, newTransaction]);
  }, [transactions]);

  // Update transaction (Admin only)
  const updateTransaction = useCallback((id, updatedData) => {
    setTransactions(
      transactions.map((tx) => (tx.id === id ? { ...tx, ...updatedData } : tx))
    );
  }, [transactions]);

  // Delete transaction (Admin only)
  const deleteTransaction = useCallback((id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  }, [transactions]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      type: 'all',
      category: 'all',
      search: '',
    });
  }, []);

  const value = {
    // State
    transactions,
    role,
    filters,

    // Actions
    switchRole,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateFilters,
    resetFilters,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}
