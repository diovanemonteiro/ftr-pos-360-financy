import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { LayoutDashboard, LogOut, Tag } from 'lucide-react'
import logoIcon from '../assets/logo-icon.png'

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const isDashboard = location.pathname === '/'
  const isCategories = location.pathname === '/categories'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="w-full px-8 pt-6">
      {isAuthenticated && (
        <div className="flex justify-between w-full items-center">
          <div className="min-w-48">
            <img src={logoIcon} alt="Logo Icon" />
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button size="sm" className="gap-2" variant={isDashboard ? 'default' : 'ghost'}>
                <LayoutDashboard className="h-4 w-4" />
                Transações
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="sm" className="gap-2" variant={isCategories ? 'default' : 'ghost'}>
                <Tag className="h-4 w-4" />
                Categorias
              </Button>
            </Link>
          </div>
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
