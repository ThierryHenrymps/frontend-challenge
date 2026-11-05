
import { Link, useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Heart, Search, Minus, Plus, Mail, Star } from 'lucide-react'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import nfts from '../data/nfts'

function NFTDetails() {
  const { id } = useParams({ strict: false })

  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('kurio-favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  const [quantity, setQuantity] = useState(1)

  const isFavorite = favorites.includes(id)

  useEffect(() => {
    localStorage.setItem('kurio-favorites', JSON.stringify(favorites))
  }, [favorites])

  const nft = nfts.find((item) => item.id === id)

  if (!nft) {
    return <h2>NFT não encontrado</h2>
  }

  const imageSrc = `/imgNFT/${nft.image}`

  return (
    <section className="nft-details">
      <nav className="details-breadcrumb">
        <span>Início</span>
        <span>/</span>
        <span>Mercado</span>
        <span>/</span>
        <strong>{nft.name}</strong>
      </nav>

      <div className="details-content">
        <div className="details-gallery">
          <div className="gallery-thumbnails">
            <div className="thumbnail-item active">
              <img src={imageSrc} alt={nft.name} />
              <div className="thumbnail-badge">
                <img src={imageSrc} alt="" />
              </div>
            </div>

            <div className="thumbnail-item">
              <img src={imageSrc} alt={nft.name} />
            </div>

            <div className="thumbnail-item">
              <img src={imageSrc} alt={nft.name} />
            </div>

            <div className="thumbnail-item">
              <img src={imageSrc} alt={nft.name} />
            </div>
          </div>

          <div className="main-image">
            <img src={imageSrc} alt={nft.name} />
            <button className="zoom-button" aria-label="Ampliar imagem">
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="details-info">
          <h1>{nft.name}</h1>

          <div className="price-rating-row">
            <div className="details-price">
              <strong>{nft.price}</strong>
            </div>

            <div className="details-rating">
              <div className="stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#cb854a" stroke="none" />
                ))}
              </div>
              <span>19 avaliações de colecionadores</span>
            </div>
          </div>

          <div className="details-summary-block">
            <h3 className="section-label">Sobre este NFT:</h3>
            <p className="details-summary">
              Um colecionável digital finalizado à mão da coleção Kurio Editions,
              verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.
            </p>
          </div>

          <div className="edition-section">
            <span className="section-label">Edição:</span>
            <div className="edition-options">
              <button className="edition-tag" type="button">1/1</button>
              <button className="edition-tag" type="button">1/10</button>
              <button className="edition-tag active" type="button">1/50</button>
              <span className="edition-tag open">ABERTA</span>
            </div>
          </div>

          <div className="purchase-row">
            <div className="counter-control">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <Minus size={13} />
              </button>

              <div className="counter-avatar">
                <img src={imageSrc} alt="Avatar" />
              </div>

              <span className="quantity-value">{quantity}</span>

              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((current) => current + 1)}
              >
                <Plus size={13} />
              </button>
            </div>

            <div className="details-actions">
              <button
                className="buy-button"
                type="button"
                onClick={() => {
                    const savedCart = localStorage.getItem('kurio-cart')
                    const cart = savedCart ? JSON.parse(savedCart) : []

                    const existingItem = cart.find((item: any) => item.id === nft.id)

                    if (existingItem) {
                    existingItem.quantity += quantity
                    } else {
                    cart.push({
                        id: nft.id,
                        name: nft.name,
                        price: nft.price,
                        image: nft.image,
                        quantity: quantity,
                    })
                    }

                    localStorage.setItem('kurio-cart', JSON.stringify(cart))
                }}
                >
                COMPRAR
                </button>
            </div>
          </div>

          <div className="meta-info-list">
            <div className="meta-info-item">
              <span>ID do token: </span>
              <strong>#0042</strong>
            </div>

            <div className="meta-info-item">
              <span>Coleção: </span>
              <strong>Kurio Apes</strong>
            </div>

            <div className="meta-info-item">
              <span>Atributos: </span>
              <strong>Óculos, Esmeralda, Raro</strong>
            </div>
          </div>

          <div className="social-share-row">
            <span>Compartilhar este NFT:</span>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn size={15} />
            </a>

            <a href="#" aria-label="E-mail">
              <Mail size={15} />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="details-tabs-header">
        <button className="tab-btn active" type="button">
          Detalhes do NFT
        </button>

        <button className="tab-btn" type="button">
          Avaliações de colecionadores (19)
        </button>
      </div>

      <div className="tab-description-content">
        <p>
          {nft.name} é uma obra digital 1/50 finalizada à mão da coleção Kurio Editions. Cada atributo fica armazenado nos metadados do token e verificado na Ethereum. A obra explora identidade, movimento e luz em um mundo digital sem fronteiras.
        </p>

        <p>
          A propriedade inclui a arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente de procedência registrada na rede. Nova Sato recebe 5% de direitos autorais nas vendas secundárias, apoiando novos trabalhos e lançamentos da comunidade.
        </p>

        <div className="meta-block">
          <h4>Rede:</h4>
          <p>Cunhado na Ethereum com procedência imutável e metadados armazenados no IPFS.</p>
        </div>

        <div className="meta-block">
          <h4>Contrato:</h4>
          <p>Direitos autorais do criador: 5% nas vendas secundárias, pagos automaticamente pelos mercados compatíveis.</p>
        </div>

        <div className="meta-block">
          <h4>Direitos autorais:</h4>
          <p>0x7A42...19E8 • Contrato inteligente ERC-721 verificado.</p>
        </div>
      </div>

      <section className="more-collection">
        <h2>Mais desta coleção</h2>

        <div className="more-collection-grid">
          {nfts
            .filter((item) => item.id !== nft.id)
            .slice(0, 5)
            .map((item) => (
              <Link
                to="/nft/$id"
                params={{ id: item.id }}
                className="collection-nft-card"
                key={item.id}
              >
                <div className="collection-nft-image">
                  <img
                    src={`/imgNFT/${item.image}`}
                    alt={item.name}
                  />
                </div>

                <h3>{item.name}</h3>

                <div className="collection-nft-price">
                  <span>{item.price}</span>
                </div>
              </Link>
            ))}
        </div>

        <div className="collection-dots">
          <span></span>
          <span className="active"></span>
          <span></span>
        </div>
      </section>
    </section>
  )
}

export default NFTDetails
