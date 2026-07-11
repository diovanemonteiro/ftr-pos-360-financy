import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoIcon from '../assets/logo-icon.png'
import logo from '../assets/logo.svg'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/' },
  { label: 'Transações', to: '/transactions' },
  { label: 'Categorias', to: '/categories' },
]

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="w-full border-b bg-white px-12 py-4">
      {isAuthenticated && (
        <div className="flex w-full items-center justify-between">
          <div className="min-w-48 flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-6 w-auto" />
          </div>
          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'text-sm font-normal leading-5 transition-colors',
                    isActive ? 'font-semibold text-primary' : 'text-gray-600 hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
