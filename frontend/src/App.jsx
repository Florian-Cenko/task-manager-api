import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import { ToastContainer } from './components/UI.jsx'
import { useApi } from './hooks/useApi.js'
import { useToast } from './hooks/useToast.js'
import Dashboard  from './pages/Dashboard.jsx'
import Users      from './pages/Users.jsx'
import Categories from './pages/Categories.jsx'
import Tasks      from './pages/Tasks.jsx'
import Filter     from './pages/Filter.jsx'
import Stats      from './pages/Stats.jsx'

const PAGE_TITLES = {
  dashboard: 'Dashboard', users: 'Users', categories: 'Categories',
  tasks: 'Tasks', filter: 'Filter & Search', stats: 'Statistics',
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [baseUrl, setBaseUrl] = useState('http://localhost:8080')
  const api = useApi(baseUrl)
  const { toasts, toast } = useToast()
  const pageProps = { api, toast }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':  return <Dashboard  {...pageProps} />
      case 'users':      return <Users      {...pageProps} />
      case 'categories': return <Categories {...pageProps} />
      case 'tasks':      return <Tasks      {...pageProps} />
      case 'filter':     return <Filter     {...pageProps} />
      case 'stats':      return <Stats      {...pageProps} />
      default: return null
    }
  }

  return (
    <div className="app">
      <Sidebar active={activePage} onNavigate={setActivePage} baseUrl={baseUrl} onBaseUrlChange={setBaseUrl} />
      <main className="main">
        <header className="topbar">
          <div className="topbar-title">{PAGE_TITLES[activePage]}</div>
          <div className="topbar-sub">Spring Boot API Explorer</div>
        </header>
        <div className="content">{renderPage()}</div>
      </main>
      <ToastContainer toasts={toasts} />
    </div>
  )
}