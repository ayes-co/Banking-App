import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Icon({ children, variant = 'soft' }) {
  return <span className={`icon-badge icon-badge--${variant}`}>{children}</span>
}

export default function DashboardShell({
  brand = 'Enterprise Banking',
  role = 'Customer',
  activePath = '/',
  navItems = [],
  topTitle = 'Dashboard',
  topSubtitle = 'Welcome back!',
  userName = 'User',
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">EB</span>
          <div>
            <strong>{brand}</strong>
            <small>{role} Portal</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive || activePath === item.to ? 'nav-link active' : 'nav-link')}
            >
              <Icon variant={item.variant || 'soft'}>{item.icon}</Icon>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((current) => !current)}
          >
            ☰
          </button>

          <div className="topbar-actions">
            <button className="topbar-icon-button" type="button" aria-label="Notifications">
              <span className="notification-dot" />
              •
            </button>

            <div className="user-chip">
              <div className="user-avatar">{userName?.[0] || 'U'}</div>
              <div>
                <strong>{userName}</strong>
                <small>{role}</small>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">Enterprise Banking</p>
              <h1>{topTitle}</h1>
              <p>{topSubtitle}</p>
            </div>

            <Link className="ghost-pill" to={activePath}>
              Open overview
            </Link>
          </section>

          {children}
        </main>
      </div>
    </div>
  )
}

