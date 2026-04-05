// Mock data for Finance Dashboard
export const mockTransactions = [
  // March 2024
  { id: 1, date: '2024-03-01', amount: 50000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: 2, date: '2024-03-03', amount: 2500, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: 3, date: '2024-03-05', amount: 15000, category: 'Rent', type: 'expense', description: 'Monthly rent' },
  { id: 4, date: '2024-03-07', amount: 500, category: 'Entertainment', type: 'expense', description: 'Movie tickets' },
  { id: 5, date: '2024-03-10', amount: 1200, category: 'Utilities', type: 'expense', description: 'Electricity & water bill' },
  { id: 6, date: '2024-03-12', amount: 3000, category: 'Shopping', type: 'expense', description: 'Clothing' },
  { id: 7, date: '2024-03-15', amount: 5000, category: 'Restaurant', type: 'expense', description: 'Dining out' },
  { id: 8, date: '2024-03-18', amount: 8000, category: 'Freelance', type: 'income', description: 'Side project income' },
  { id: 9, date: '2024-03-20', amount: 2000, category: 'Transportation', type: 'expense', description: 'Gas & maintenance' },
  { id: 10, date: '2024-03-22', amount: 1500, category: 'Entertainment', type: 'expense', description: 'Gaming equipment' },

  // April 2024
  { id: 11, date: '2024-04-01', amount: 50000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: 12, date: '2024-04-02', amount: 2800, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: 13, date: '2024-04-05', amount: 15000, category: 'Rent', type: 'expense', description: 'Monthly rent' },
  { id: 14, date: '2024-04-08', amount: 3500, category: 'Shopping', type: 'expense', description: 'New shoes & accessories' },
  { id: 15, date: '2024-04-10', amount: 1200, category: 'Utilities', type: 'expense', description: 'Electricity & water bill' },
  { id: 16, date: '2024-04-12', amount: 4000, category: 'Restaurant', type: 'expense', description: 'Dinner with friends' },
  { id: 17, date: '2024-04-15', amount: 600, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
  { id: 18, date: '2024-04-18', amount: 5000, category: 'Freelance', type: 'income', description: 'Freelance project' },
  { id: 19, date: '2024-04-20', amount: 2200, category: 'Transportation', type: 'expense', description: 'Car insurance' },
  { id: 20, date: '2024-04-25', amount: 1800, category: 'Shopping', type: 'expense', description: 'Online shopping' },

  // May 2024
  { id: 21, date: '2024-05-01', amount: 50000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: 22, date: '2024-05-03', amount: 2600, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: 23, date: '2024-05-05', amount: 15000, category: 'Rent', type: 'expense', description: 'Monthly rent' },
  { id: 24, date: '2024-05-08', amount: 2500, category: 'Healthcare', type: 'expense', description: 'Doctor visit & medicines' },
  { id: 25, date: '2024-05-10', amount: 1200, category: 'Utilities', type: 'expense', description: 'Electricity & water bill' },
  { id: 26, date: '2024-05-12', amount: 3200, category: 'Restaurant', type: 'expense', description: 'Casual dining' },
  { id: 27, date: '2024-05-15', amount: 12000, category: 'Freelance', type: 'income', description: 'Major freelance project' },
  { id: 28, date: '2024-05-18', amount: 2000, category: 'Transportation', type: 'expense', description: 'Gas' },
  { id: 29, date: '2024-05-20', amount: 1000, category: 'Entertainment', type: 'expense', description: 'Streaming subscriptions' },
  { id: 30, date: '2024-05-22', amount: 4000, category: 'Shopping', type: 'expense', description: 'Electronics' },
];

export const categories = [
  'Salary',
  'Freelance',
  'Groceries',
  'Rent',
  'Utilities',
  'Transportation',
  'Restaurant',
  'Entertainment',
  'Shopping',
  'Healthcare',
];

export const getCategoryColor = (category) => {
  const colors = {
    Salary: '#10b981',
    Freelance: '#3b82f6',
    Groceries: '#f97316',
    Rent: '#ef4444',
    Utilities: '#8b5cf6',
    Transportation: '#ec4899',
    Restaurant: '#f59e0b',
    Entertainment: '#06b6d4',
    Shopping: '#d946ef',
    Healthcare: '#14b8a6',
  };
  return colors[category] || '#6b7280';
};
