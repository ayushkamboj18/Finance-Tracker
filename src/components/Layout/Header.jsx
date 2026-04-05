import { useFinance, useRole } from '../../hooks/useFinance';
import { useEffect, useState } from 'react';

export default function Header({ toggleSidebar, sidebarOpen }) {
  const { role, switchRole } = useFinance();
  const { isAdmin } = useRole();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 z-40 h-16 flex items-center px-6 transition-all duration-300 ${
        sidebarOpen && !isMobile ? 'md:left-64' : 'left-0'
      }`}
      style={{
        background: 'rgba(9, 9, 11, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex justify-between items-center w-full">

        {/* ── LEFT: Hamburger + Title ── */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 hover:bg-white/5 rounded-lg transition-colors group"
            title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            <span className={`block h-px bg-white/40 transition-all duration-300 group-hover:bg-white/70 ${sidebarOpen ? 'w-4' : 'w-5'}`} />
            <span className="block w-5 h-px bg-white/40 group-hover:bg-white/70 transition-colors" />
            <span className={`block h-px bg-white/40 transition-all duration-300 group-hover:bg-white/70 ${sidebarOpen ? 'w-3' : 'w-5'}`} />
          </button>

          <div className="w-px h-6 bg-white/[0.06]" />

          <div>
            <h1 className="text-sm font-black tracking-tight text-emerald-400 leading-none">
              Finance Dashboard
            </h1>
            <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/25 mt-0.5">
              Personal Financial Management
            </p>
          </div>
        </div>

        {/* ── RIGHT: Role + User ── */}
        <div className="flex items-center gap-3">

          {/* Role Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-white/25 hidden sm:block">
              Role
            </span>
            <select
              value={role}
              onChange={(e) => switchRole(e.target.value)}
              className="bg-white/[0.04] border border-white/10 text-white/60 text-xs font-mono px-3 py-2 rounded-xl focus:outline-none focus:border-white/20 hover:border-white/15 hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              <option value="viewer" className="bg-zinc-900">Viewer</option>
              <option value="admin" className="bg-zinc-900">Admin</option>
            </select>
          </div>

          <div className="w-px h-6 bg-white/[0.06]" />

          {/* User Badge */}
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-mono font-semibold text-white/60 leading-none">
                {isAdmin ? 'Administrator' : 'Viewer'}
              </p>
              <p className="text-[9px] font-mono text-white/25 mt-0.5 tracking-wide">
                {isAdmin ? 'Full access' : 'Read only'}
              </p>
            </div>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black border"
              style={{
                backgroundColor: isAdmin ? '#34d39915' : '#60a5fa15',
                borderColor: isAdmin ? '#34d39930' : '#60a5fa30',
                color: isAdmin ? '#34d399' : '#60a5fa',
              }}
            >
              {isAdmin ? 'A' : 'V'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}