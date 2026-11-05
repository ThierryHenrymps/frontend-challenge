import { Link } from '@tanstack/react-router'
import { useState } from 'react'

type CartItem = {
  id: string
  name: string
  price: string
  image: string
  quantity: number
  tokenId?: string
}

type PaymentStatus = 'pending' | 'confirmed' | 'rejected' | null

function Checkout() {
  const [wallet, setWallet] = useState('Coinbase Wallet')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null)

  const savedCart = localStorage.getItem('kurio-cart')
  const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : []

  const promoCode = localStorage.getItem('kurio-promo-code')

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0
    return sum + price * item.quantity
  }, 0)

  const discount = promoCode === 'KURIO10' ? subtotal * 0.1 : 0
  const networkFee = cart.length > 0 ? 0.016 : 0
  const total = subtotal - discount + networkFee

  const confirmPurchase = () => {
    setPaymentStatus('pending')

    setTimeout(() => {
      if (wallet === 'Coinbase Wallet') {
        setPaymentStatus('rejected')
      } else {
        setPaymentStatus('confirmed')
        localStorage.removeItem('kurio-cart')
        localStorage.removeItem('kurio-promo-code')
      }
    }, 2000)
  }

  if (paymentStatus === 'pending') {
    return (
      <main className="checkout-page">
        <section className="checkout-result">
          <h1>Processando pagamento...</h1>
          <p>Aguarde enquanto confirmamos seu pedido.</p>
        </section>
      </main>
    )
  }

  if (paymentStatus === 'confirmed') {
    return (
      <main className="checkout-page">
        <section className="checkout-result">
          <h1>Compra confirmada!</h1>
          <p>Seu pedido foi realizado com sucesso.</p>
          <Link to="/mercado" className="btn-confirm-purchase" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
            Continuar explorando
          </Link>
        </section>
      </main>
    )
  }

  if (paymentStatus === 'rejected') {
    return (
      <main className="checkout-page">
        <section className="checkout-result">
          <h1>Pagamento recusado</h1>
          <p>Não foi possível concluir seu pagamento com {wallet}.</p>
          <button
            type="button"
            className="btn-confirm-purchase"
            onClick={() => setPaymentStatus(null)}
          >
            Tentar novamente
          </button>
        </section>
      </main>
    )
  }

  return (
    <div className="checkout-page">
      <nav className="checkout-breadcrumb">
        <Link to="/" style={{ color: '#c9bdb4', textDecoration: 'none' }}>Início</Link>
        <span>/</span>
        <Link to="/mercado" style={{ color: '#c9bdb4', textDecoration: 'none' }}>Mercado</Link>
        <span>/</span>
        <strong>Pagamento</strong>
      </nav>

      {cart.length === 0 ? (
        <div className="cart-empty-state">
          <p>Seu carrinho está vazio.</p>
          <Link to="/mercado">Explorar NFTs</Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-collector-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Perfil do colecionador</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Nome de exibição<span className="required">*</span></label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Nome de usuário<span className="required">*</span></label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Rede<span className="required">*</span></label>
                <div className="select-wrapper">
                  <select defaultValue="">
                    <option value="" disabled>Selecione uma rede</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                    <option value="solana">Solana</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Nome do perfil<span className="required">*</span></label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Endereço da carteira<span className="required">*</span></label>
                <input type="text" placeholder="Endereço 0x da carteira" />
              </div>

              <div className="form-group no-label">
                <input type="text" placeholder="ENS ou carteira secundária (opcional)" />
              </div>

              <div className="form-group">
                <label>Tipo de carteira<span className="required">*</span></label>
                <div className="select-wrapper">
                  <select defaultValue="">
                    <option value="" disabled>Selecione uma carteira</option>
                    <option value="metamask">MetaMask</option>
                    <option value="coinbase">Coinbase</option>
                    <option value="walletconnect">WalletConnect</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Código de indicação<span className="required">*</span></label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>E-mail<span className="required">*</span></label>
                <input type="email" />
              </div>

              <div className="form-group">
                <label>Nome ENS<span className="required">*</span></label>
                <div className="select-wrapper short">
                  <select defaultValue=".eth">
                    <option value=".eth">.eth</option>
                  </select>
                </div>
              </div>
            </div>

            <label className="checkbox-control">
              <input type="checkbox" />
              <span className="radio-circle"></span>
              <span>Usar outra carteira?</span>
            </label>

            <div className="form-group full-width">
              <label>Observação do colecionador (opcional)</label>
              <textarea rows={5}></textarea>
            </div>
          </form>

          <aside className="checkout-summary-panel">
            <div className="summary-section-title">
              <h3>Seus NFTs</h3>
            </div>

            <div className="checkout-items-table-header">
              <span>NFTs</span>
              <span>Subtotal</span>
            </div>

            <div className="checkout-items-list">
              {cart.map((item) => {
                const numericPrice =
                  parseFloat(item.price.replace(/[^\d.]/g, '')) || 0
                const itemTotal = (numericPrice * item.quantity).toFixed(2)

                return (
                  <div className="checkout-item-row" key={item.id}>
                    <div className="checkout-item-nft">
                      <div className="checkout-item-thumb">
                        <img src={`/imgNFT/${item.image}`} alt={item.name} />
                      </div>
                      <div className="checkout-item-info">
                        <h4>{item.name}</h4>
                        <p>ID do token: {item.tokenId || `#00${item.id}`}</p>
                      </div>
                    </div>
                    <span className="checkout-item-qty">(x {item.quantity})</span>
                    <strong className="checkout-item-price">{itemTotal} ETH</strong>
                  </div>
                )
              })}
            </div>

            <div className="checkout-promo-link">
              <a href="#">Tem um código promocional? Aplique aqui</a>
            </div>

            <div className="checkout-financial-breakdown">
              <div className="financial-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} ETH</span>
              </div>
              <div className="financial-row">
                <span>Desconto do lançamento</span>
                <span>(-) {discount > 0 ? discount.toFixed(2) : '00.00'}</span>
              </div>
              <div className="financial-row fee-row">
                <div className="fee-label">
                  <span>Taxa de rede</span>
                  <small>Taxa estimada</small>
                </div>
                <span>{networkFee.toFixed(3)} ETH</span>
              </div>
            </div>

            <div className="checkout-total-row">
              <span>Total</span>
              <strong>{total.toFixed(3)} ETH</strong>
            </div>

            <div className="wallet-selection-section">
              <h4>Carteira e rede</h4>

              <div className="wallet-radio-list">
                <label
                  className={`wallet-radio-card ${wallet === 'WalletConnect' ? 'selected' : ''}`}
                  onClick={() => setWallet('WalletConnect')}
                >
                  <input
                    type="radio"
                    name="checkout-wallet"
                    checked={wallet === 'WalletConnect'}
                    readOnly
                  />
                  <span className="wallet-custom-radio"></span>
                  <div className="wallet-badge-chip">
                    <span>METAMASK</span>
                    <span>•</span>
                    <span>WALLETCONNECT</span>
                  </div>
                </label>

                <label
                  className={`wallet-radio-card ${wallet === 'MetaMask' ? 'selected' : ''}`}
                  onClick={() => setWallet('MetaMask')}
                >
                  <input
                    type="radio"
                    name="checkout-wallet"
                    checked={wallet === 'MetaMask'}
                    readOnly
                  />
                  <span className="wallet-custom-radio"></span>
                  <span className="wallet-name">MetaMask</span>
                </label>

                <label
                  className={`wallet-radio-card ${wallet === 'Coinbase Wallet' ? 'selected' : ''}`}
                  onClick={() => setWallet('Coinbase Wallet')}
                >
                  <input
                    type="radio"
                    name="checkout-wallet"
                    checked={wallet === 'Coinbase Wallet'}
                    readOnly
                  />
                  <span className="wallet-custom-radio"></span>
                  <span className="wallet-name">Coinbase Wallet</span>
                </label>
              </div>
            </div>

            <button
              type="button"
              className="btn-confirm-purchase"
              onClick={confirmPurchase}
            >
              Confirmar compra
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Checkout