import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Footprints, Layers, Coins } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/steps', label: 'Steps', icon: Footprints },
  { to: '/cards', label: 'Cards', icon: Layers },
  { to: '/wewards', label: 'WeWards', icon: Coins },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="bg-slate-800 md:w-56 w-full flex md:flex-col flex-row justify-around md:justify-start p-2 md:p-4 gap-1 md:gap-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Page content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}