import TransactionFilters from '../components/Transactions/TransactionFilters';
import TransactionList from '../components/Transactions/TransactionList';
import AddTransactionButton from '../components/Transactions/AddTransactionButton';
import { useFilteredTransactions, useSummaryStats } from '../hooks/useFinance';

export default function TransactionsPage() {
  const filteredTransactions = useFilteredTransactions();
  const stats = useSummaryStats();

  return (
    <div className="space-y-16 animate-fade-in bg-black">
      {/* Page Header */}
      <div className="my-7 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Transactions</h1>
        <p className="text-emerald-400">Manage and track all your financial transactions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mx-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 font-semibold">Total Transactions</p>
          <p className="text-3xl font-bold text-blue-700">{stats.transactionCount}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 font-semibold">Total Income</p>
          <p className="text-3xl font-bold text-green-700">₹{stats.totalIncome.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 font-semibold">Total Expenses</p>
          <p className="text-3xl font-bold text-red-700">₹{stats.totalExpense.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Filters */}
      <section>
        <TransactionFilters />
      </section>

      {/* Transaction List */}
      <section>
        <TransactionList />
      </section>

      {/* Add Button */}
      <AddTransactionButton />
    </div>
  );
}
