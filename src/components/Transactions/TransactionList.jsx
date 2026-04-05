import { useState } from 'react';
import { useRole, useFilteredTransactions, useFinance } from '../../hooks/useFinance';
import { getCategoryColor } from '../../data/mockData';

export default function TransactionList() {
  const { isAdmin } = useRole();
  const filteredTransactions = useFilteredTransactions();
  const { deleteTransaction } = useFinance();
  const [sortBy, setSortBy] = useState('date-desc');
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':  return new Date(a.date) - new Date(b.date);
      case 'date-desc': return new Date(b.date) - new Date(a.date);
      case 'amount-asc': return a.amount - b.amount;
      case 'amount-desc': return b.amount - a.amount;
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sortedTransactions.length / PAGE_SIZE);
  const paginated = sortedTransactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSortChange = (val) => {
    setSortBy(val);
    setPage(1);
  };

  if (filteredTransactions.length === 0) {
    return (
      <div className="rounded-2xl bg-zinc-950 border border-white/10 p-16 flex flex-col items-center justify-center text-center shadow-2xl my-12">
        <span className="text-5xl mb-4 opacity-30">📭</span>
        <p className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase">No transactions found</p>
        <p className="text-white/20 text-xs mt-2 font-mono">Try adjusting your filters or add a new transaction</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl mx-3 bg-zinc-950 border border-white/10 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] my-12">

      {/* ── HEADER ── */}
      <div className="px-8 py-6 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.02]">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white/90">Transactions</h2>
          <p className="text-xs text-white/100 font-mono mt-0.5">
            {sortedTransactions.length} total transactions
          </p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="bg-white/5 border border-white/10 text-white/60 text-xs font-mono px-4 py-2.5 rounded-xl focus:outline-none focus:border-white/20 hover:border-white/20 transition-colors cursor-pointer"
        >
          <option value="date-desc" className="bg-zinc-900">Newest First</option>
          <option value="date-asc"  className="bg-zinc-900">Oldest First</option>
          <option value="amount-desc" className="bg-zinc-900">Highest Amount</option>
          <option value="amount-asc"  className="bg-zinc-900">Lowest Amount</option>
        </select>
      </div>

      {/* ── TABLE ── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Date', 'Description', 'Category', 'Type', 'Amount', isAdmin && 'Actions']
                .filter(Boolean)
                .map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-4 text-[9px] font-mono tracking-[0.2em] uppercase text-white/20 ${h === 'Amount' || h === 'Actions' ? 'text-right' : 'text-left'}`}
                  >
                    {h}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((transaction, idx) => (
              <tr
                key={transaction.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group"
              >
                {/* Date */}
                <td className="px-6 py-4 text-xs font-mono text-white/40 whitespace-nowrap">
                  {new Date(transaction.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-sm text-white/70 font-medium max-w-[200px]">
                  <span className="truncate block">{transaction.description}</span>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wide"
                    style={{
                      backgroundColor: `${getCategoryColor(transaction.category)}20`,
                      color: getCategoryColor(transaction.category),
                      border: `1px solid ${getCategoryColor(transaction.category)}40`,
                    }}
                  >
                    {transaction.category}
                  </span>
                </td>

                {/* Type */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wide border ${
                      transaction.type === 'income'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                  >
                    {transaction.type === 'income' ? '↑ Income' : '↓ Expense'}
                  </span>
                </td>

                {/* Amount */}
                <td className={`px-6 py-4 text-right font-mono font-black text-base whitespace-nowrap ${
                  transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'} ₹{transaction.amount.toLocaleString('en-IN')}
                </td>

                {/* Admin Delete */}
                {isAdmin && (
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/60 hover:text-red-400 hover:bg-red-400/10 text-xs font-mono px-3 py-1.5 rounded-lg border border-transparent hover:border-red-400/20"
                      title="Delete transaction"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── FOOTER / PAGINATION ── */}
      <div className="px-8 py-5 border-t border-white/[0.06] bg-white/[0.02] flex justify-between items-center">
        <p className="text-[10px] font-mono text-white/25 tracking-widest uppercase">
          Showing{' '}
          <span className="text-white/50">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sortedTransactions.length)}</span>
          {' '}of{' '}
          <span className="text-white/50">{sortedTransactions.length}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl text-xs font-mono border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>

          <span className="text-[10px] font-mono text-white/20 px-2">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl text-xs font-mono border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}