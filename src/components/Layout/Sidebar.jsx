import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../hooks/useFinance';
import { navItems } from '../../data/navigationConfig';

export default function Sidebar({ isOpen, onNavigate }) {
  const location = useLocation();
  const { isAdmin } = useRole();

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={`w-64 h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{
        background: 'rgba(9, 9, 11, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ── LOGO ── */}
      <div className="px-6 pt-5 pb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-emerald-400 text-xs font-black">₹</span>
          </div>
          <div>
            <p className="text-sm font-black tracking-tight text-white/90 leading-none">
              Finance
            </p>
            <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-white/25 mt-0.5">
              Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

        <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-white/20 px-3 pb-2">
          Navigation
        </p>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
              isActive(item.path)
                ? 'bg-white/[0.07] border border-white/10'
                : 'hover:bg-white/[0.07] border border-transparent'
            }`}
          >
            {/* Active indicator */}
            {isActive(item.path) && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-400 rounded-full" />
            )}

            {/* Icon */}
            <span
              className={`text-base w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/[0.03] border-white/[0.06] text-white/30 group-hover:text-white/50 group-hover:border-white/90'
              }`}
            >
              {item.icon}
            </span>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-semibold tracking-tight leading-none ${
                  isActive(item.path) ? 'text-white/90' : 'text-white/40 group-hover:text-white/60'
                }`}
              >
                {item.label}
              </p>
              <p className="text-[9px] font-mono text-white/20 mt-1 tracking-wide truncate">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </nav>

      {/* ── ROLE BADGE ── */}
      <div className="px-3 py-3 mx-3 mb-3 rounded-xl border bg-white/[0.02]"
        style={{
          borderColor: isAdmin ? '#34d39920' : '#60a5fa20',
        }}
      >
        <p className="text-[8px] font-mono tracking-[0.22em] uppercase text-white/20 mb-2">
          Current Mode
        </p>
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: isAdmin ? '#34d399' : '#60a5fa' }}
          />
          <span
            className="text-xs font-mono font-semibold"
            style={{ color: isAdmin ? '#34d399' : '#60a5fa' }}
          >
            {isAdmin ? 'Administrator' : 'Viewer'}
          </span>
        </div>
        <p
          className="text-[9px] font-mono mt-2 tracking-wide"
          style={{ color: isAdmin ? '#34d39960' : '#60a5fa60' }}
        >
          {isAdmin ? 'Full read & write access' : 'Read-only access'}
        </p>
      </div>

      {/* ── FOOTER ── */}
      <div className="px-6 py-4 border-t border-white/[0.06]">
        <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-white/15 text-center">
          Finance Dashboard · v1.0.0
        </p>
      </div>
    </aside>
  );
}