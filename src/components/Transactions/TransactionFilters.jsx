import { useFinance } from '../../hooks/useFinance';
import { categories } from '../../data/mockData';

export default function TransactionFilters() {
  const { filters, updateFilters, resetFilters } = useFinance();

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all';

  return (
    <div className="rounded-2xl mx-3 bg-zinc-950 border border-white/10 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] animate-slide-in-up">

      {/* ── HEADER ── */}
      <div className=" border-b border-white/[0.06] bg-white/[0.02] flex justify-between items-center">
        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 font-mono mb-1">Search & Filter</p>
          <h3 className="text-lg font-black tracking-tight text-white/90">Filter Transactions</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl text-xs font-mono border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/5 transition-all"
          >
            ↺ Reset All
          </button>
        )}
      </div>

      {/* ── FILTERS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-[9px] font-mono tracking-[0.2em] uppercase text-white/25 mb-2">
            Search
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm pointer-events-none">
              ⌕
            </span>
            <input
              type="text"
              placeholder="Search by description..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/10 text-white/70 placeholder-white/20 text-sm font-mono px-4 py-3 pl-10 rounded-xl focus:outline-none focus:border-white/20 hover:border-white/15 transition-colors"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-[9px] font-mono tracking-[0.2em] uppercase text-white/25 mb-2">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => updateFilters({ type: e.target.value })}
            className="w-full bg-white/[0.04] border border-white/10 text-white/60 text-sm font-mono px-4 py-3 rounded-xl focus:outline-none focus:border-white/20 hover:border-white/15 transition-colors cursor-pointer"
          >
            <option value="all" className="bg-zinc-900">All Types</option>
            <option value="income" className="bg-zinc-900">↑ Income</option>
            <option value="expense" className="bg-zinc-900">↓ Expense</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[9px] font-mono tracking-[0.2em] uppercase text-white/25 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="w-full bg-white/[0.04] border border-white/10 text-white/60 text-sm font-mono px-4 py-3 rounded-xl focus:outline-none focus:border-white/20 hover:border-white/15 transition-colors cursor-pointer"
          >
            <option value="all" className="bg-zinc-900">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-zinc-900">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── ACTIVE FILTERS ── */}
      {hasActiveFilters && (
        <div className="px-8 py-4 border-t border-white/[0.06] bg-white/[0.02] flex items-center gap-3 flex-wrap">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20">
            Active:
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Search: "{filters.search}"
              <button
                onClick={() => updateFilters({ search: '' })}
                className="hover:text-blue-200 transition-colors"
              >
                ×
              </button>
            </span>
          )}

          {filters.type !== 'all' && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {filters.type === 'income' ? '↑ Income' : '↓ Expense'}
              <button
                onClick={() => updateFilters({ type: 'all' })}
                className="hover:text-emerald-200 transition-colors"
              >
                ×
              </button>
            </span>
          )}

          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {filters.category}
              <button
                onClick={() => updateFilters({ category: 'all' })}
                className="hover:text-purple-200 transition-colors"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}