import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { Avatar, AvatarFallback } from './ui/avatar'
import { cn, getInitials } from '@/lib/utils'
import logo from '../assets/logo.svg'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/' },
  { label: 'Transações', to: '/transactions' },
  { label: 'Categorias', to: '/categories' },
]

export function Header() {
  const { user, isAuthenticated } = useAuthStore()
  const location = useLocation()

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
          <div className="min-w-48 flex items-center justify-end">
            <Link to="/profile" title="Perfil" aria-label="Perfil">
              <Avatar size="lg">
                <AvatarFallback className="bg-gray-200 text-sm font-medium text-gray-800">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
