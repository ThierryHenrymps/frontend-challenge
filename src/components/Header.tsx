
import { Search, ShoppingCart, LogOut } from 'lucide-react'
import { Link } from '@tanstack/react-router'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        KURIO
      </Link>

      <nav className="navigation">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: 'active' }}
        >
          Início
        </Link>

        <Link to="/mercado" activeProps={{ className: 'active' }}>
          Mercado
        </Link>

        <Link to="/criadores" activeProps={{ className: 'active' }}>
          Criadores
        </Link>

        <Link to="/aprenda" activeProps={{ className: 'active' }}>
          Aprenda
        </Link>
      </nav>

      <div className="header-actions">
        <button type="button" aria-label="Buscar">
          <Search size={19} />
        </button>

        <Link to="/carrinho" aria-label="Carrinho">
          <ShoppingCart size={19} />
        </Link>

        <button type="button" className="login-button">
          <LogOut size={16} />
          Entrar
        </button>
      </div>
    </header>
  )
}

export default Header
