
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Trash2, Minus, Plus } from 'lucide-react'
import nfts from '../data/nfts'

type CartItem = {
  id: string
  name: string
  price: string
  image: string
  quantity: number
  tokenId?: string
}

function Cart() {
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoMessage, setPromoMessage] = useState('')

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('kurio-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('kurio-cart', JSON.stringify(cart))
  }, [cart])

  const removeItem = (id: string) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, amount: number) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    )
  }

  const subtotal = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0
    return sum + numericPrice * item.quantity
  }, 0)

  const networkFee = cart.length > 0 ? 0.016 : 0

  const applyPromo = () => {
  if (promoCode.trim().toUpperCase() === 'KURIO10') {
    setDiscount(subtotal * 0.10)
    setPromoMessage('Cupom aplicado com sucesso!')
    localStorage.setItem('kurio-promo-code', 'KURIO10')
  } else {
    setDiscount(0)
    setPromoMessage('Cupom inválido.')
    localStorage.removeItem('kurio-promo-code')
  }
}

  const total = subtotal - discount + networkFee

  return (
    <section className="cart-page">
      <nav className="cart-breadcrumb">
        <span>Início</span>
        <span>/</span>
        <span>Mercado</span>
        <span>/</span>
        <strong>Carrinho</strong>
      </nav>

      {cart.length === 0 ? (
        <div className="cart-empty-state">
          <p>Seu carrinho está vazio.</p>
          <Link to="/mercado">Explorar NFTs</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-table-wrapper">
            <div className="cart-table-header">
              <span>NFTs</span>
              <span>Preço</span>
              <span>Edições</span>
              <span>Total</span>
              <span className="th-action"></span>
            </div>

            <div className="cart-table-body">
              {cart.map((item) => {
                const numericPrice =
                  parseFloat(item.price.replace(/[^\d.]/g, '')) || 0

                const itemTotal = (numericPrice * item.quantity).toFixed(2)

                return (
                  <div className="cart-row" key={item.id}>
                    <div className="cart-col-nft">
                      <div className="cart-nft-thumb">
                        <img
                          src={`/imgNFT/${item.image}`}
                          alt={item.name}
                        />

                        <div className="cart-thumb-badge">
                          <img
                            src={`/imgNFT/${item.image}`}
                            alt=""
                          />
                        </div>
                      </div>

                      <div className="cart-nft-meta">
                        <h3>{item.name}</h3>
                        <p>ID do token: {item.tokenId || item.id}</p>
                      </div>
                    </div>

                    <div className="cart-col-price">
                      <span>{item.price}</span>
                    </div>

                    <div className="cart-col-quantity">
                      <div className="counter-pill">
                        <button
                          type="button"
                          aria-label="Diminuir quantidade"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus size={11} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          aria-label="Aumentar quantidade"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>

                    <div className="cart-col-total">
                      <span>{itemTotal} ETH</span>
                    </div>

                    <div className="cart-col-action">
                      <button
                        type="button"
                        aria-label={`Remover ${item.name}`}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <aside className="cart-summary-card">
            <h2>Resumo da carteira</h2>

            <div className="promo-box">
              <label htmlFor="promo-input">Código promocional</label>

              <div className="promo-form">
                <input
                  id="promo-input"
                  type="text"
                  placeholder="Digite o código promocional..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />

                <button type="button" onClick={applyPromo}>
                  Aplicar
                </button>
              </div>

              <p className="promo-message">{promoMessage}</p>
            </div>

            <div className="summary-breakdown">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} ETH</span>
              </div>

              <div className="summary-line">
                <span>Desconto do lançamento</span>
                <span>- {discount.toFixed(2)} ETH</span>
              </div>

              <div className="summary-line">
                <div>
                  <span>Taxa de rede</span>
                  <small>Taxa estimada</small>
                </div>

                <span>{networkFee.toFixed(3)} ETH</span>
              </div>
            </div>

            <div className="summary-total-line">
              <span>Total</span>
              <strong>{total.toFixed(3)} ETH</strong>
            </div>

            <Link to="/checkout" className="btn-checkout">
            Conectar e finalizar
            </Link>

            <Link to="/mercado" className="btn-continue">
              Continuar explorando
            </Link>
          </aside>
        </div>
      )}

      <section className="cart-recommendations">
        <h2>Colecionadores também viram</h2>

        <div className="rec-grid">
          {nfts.slice(0, 5).map((item) => (
            <Link
              to="/nft/$id"
              params={{ id: item.id }}
              className="rec-card"
              key={item.id}
            >
              <div className="rec-image">
                <img
                  src={`/imgNFT/${item.image}`}
                  alt={item.name}
                />
              </div>

              <h3>{item.name}</h3>

              <div className="rec-price">
                <span>{item.price}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="rec-dots">
          <span></span>
          <span className="active"></span>
          <span></span>
        </div>
      </section>
    </section>
  )
}

export default Cart
