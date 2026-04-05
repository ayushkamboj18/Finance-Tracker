import { useSpendingByCategory, useSummaryStats } from '../../hooks/useFinance';
import { insightCardTemplates } from '../../data/insightConfig';

export default function Insights() {
  const categoryData = useSpendingByCategory();
  const stats = useSummaryStats();

  const monthlyAverage = stats.totalExpense > 0 ? Math.round(stats.totalExpense / 3) : 0;
  const topCategory = categoryData[0];
  const savingsRate =
    stats.totalIncome > 0
      ? Math.round(((stats.totalIncome - stats.totalExpense) / stats.totalIncome) * 100)
      : 0;

  const insightCards = [
    {
      ...insightCardTemplates[0],
      value: topCategory?.category || 'N/A',
      subValue: topCategory ? `₹${topCategory.amount.toLocaleString('en-IN')}` : 'No data',
      detail: topCategory ? `${Math.round((topCategory.amount / stats.totalExpense) * 100)}% of total expenses` : null,
    },
    {
      ...insightCardTemplates[1],
      value: `₹${monthlyAverage.toLocaleString('en-IN')}`,
      subValue: 'per transaction',
      detail: `Based on ${stats.transactionCount} transactions`,
    },
    {
      ...insightCardTemplates[2],
      value: `${savingsRate}%`,
      subValue: 'of income saved',
      detail: `₹${(stats.totalIncome - stats.totalExpense).toLocaleString('en-IN')} total saved`,
    },
    {
      ...insightCardTemplates[3],
      value: `${(stats.totalIncome / (stats.totalExpense || 1)).toFixed(2)}x`,
      subValue: 'ratio',
      detail: stats.totalIncome > stats.totalExpense ? 'Income exceeds expenses' : 'Expenses exceed income',
    },
    {
      ...insightCardTemplates[4],
      value: categoryData.length,
      subValue: 'spending categories',
      detail: 'Diversified expenses',
    },
    {
      ...insightCardTemplates[5],
      value: `₹${stats.totalExpense.toLocaleString('en-IN')}`,
      subValue: 'total expenses',
      detail: `Across ${categoryData.length} categories`,
    },
  ];

  return (
    <section className="space-y-5 mx-3 animate-fade-in">

      {/* ── INSIGHT CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {insightCards.map((card, index) => (
          <div
            key={card.title}
            className="relative rounded-2xl bg-zinc-950 overflow-hidden p-7 hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
            style={{
              border: `1px solid ${card.accentBorder}`,
              animationDelay: `${index * 80}ms`,
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: card.accent }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/100">
                {card.title}
              </p>
              <span
                className="text-xs font-mono font-bold w-7 h-7 rounded-full flex items-center justify-center border"
                style={{
                  color: card.accent,
                  backgroundColor: card.accentDim,
                  borderColor: card.accentBorder,
                }}
              >
                {card.symbol}
              </span>
            </div>

            {/* Value */}
            <p
              className="text-3xl font-black tracking-tight mb-1"
              style={{ color: card.accent }}
            >
              {card.value}
            </p>
            <p className="text-xs text-white/70 font-mono mb-4">{card.subValue}</p>

            {/* Detail */}
            {card.detail && (
              <div
                className="pt-4 border-t"
                style={{ borderColor: card.accentBorder }}
              >
                <p className="text-[10px] font-mono text-white/30 tracking-wide">{card.detail}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── FINANCIAL ANALYSIS ── */}
      <div className="rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">

        {/* Header */}
        <div className="px-8 py-5 border-b border-white/[0.06] bg-white/[0.02]">
          <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/25 mb-1">AI Summary</p>
          <h3 className="text-lg font-black tracking-tight text-emerald-400">Financial Analysis</h3>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          <p className="text-sm text-white/50 font-mono leading-relaxed">
            {savingsRate >= 30
              ? `Excellent financial discipline. Your savings rate of ${savingsRate}% is well above average — you're on track to build substantial wealth over time.`
              : savingsRate >= 0
                ? `You're managing finances reasonably well with a ${savingsRate}% savings rate. Look for opportunities to trim discretionary spending.`
                : `Your expenses are currently exceeding income. Review your spending patterns and consider creating a strict monthly budget.`}
          </p>

          {/* Tips */}
          <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ['Track Regularly', 'Monitor spending categories to identify patterns'],
              ['Set Budgets', 'Create spending limits for each category'],
              ['Review Monthly', 'Check your insights dashboard each month'],
              topCategory
                ? ['Optimize', `Highest expense is ${topCategory.category} — look to reduce it`]
                : ['Diversify', 'Spread expenses across more categories'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3"
              >
                <span className="text-emerald-400 font-mono text-xs mt-0.5">✓</span>
                <div>
                  <p className="text-xs font-mono font-semibold text-white/50">{title}</p>
                  <p className="text-[10px] font-mono text-white/25 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORY BREAKDOWN ── */}
      {categoryData.length > 0 && (
        <div className="rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">

          {/* Header */}
          <div className="px-8 py-5 border-b border-white/[0.06] bg-white/[0.02]">
            <p className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/25 mb-1">Breakdown</p>
            <h3 className="text-lg font-black tracking-tight text-emerald-400">Category Spending</h3>
          </div>

          {/* Grid */}
          <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryData.map((item, i) => {
              const pct = Math.round((item.amount / stats.totalExpense) * 100);
              return (
                <div
                  key={item.category}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-200"
                >
                  <p className="text-[12px] font-mono tracking-[0.18em] uppercase text-pink-700 mb-3 truncate">
                    {item.category}
                  </p>
                  <p className="text-2xl font-black text-white/80 tracking-tight">
                    ₹{(item.amount / 1000).toFixed(1)}k
                  </p>

                  {/* Progress bar */}
                  <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-white/20 to-white/40 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[9px] font-mono text-white/20 mt-2">{pct}% of total</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}