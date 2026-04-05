import TransactionFilters from './TransactionFilters';
import TransactionList from './TransactionList';
import AddTransactionButton from './AddTransactionButton';

export default function Transactions() {
  return (
    <section>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h1>
      <TransactionFilters />
      <TransactionList />
      <AddTransactionButton />
    </section>
  );
}
