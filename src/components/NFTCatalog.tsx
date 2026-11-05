import nfts from '../data/nfts'
import { Link } from '@tanstack/react-router'

const categories = [
  { name: 'Arte digital', count: 33 },
  { name: 'Fotografia', count: 12 },
  { name: 'Música', count: 65 },
  { name: 'Arte 3D', count: 39 },
  { name: 'Colecionáveis', count: 23 },
  { name: 'Generativa', count: 17 },
  { name: 'Jogos', count: 19 },
  { name: 'Assinaturas', count: 13 },
  { name: 'Utilidade', count: 18 },
]

const networks = [
  { name: 'Ethereum', count: 119 },
  { name: 'Polygon', count: 78 },
  { name: 'Solana', count: 86 },
]

function NFTCatalog() {
  return (
    <section className="nft-catalog">
      <div className="catalog-header">
        <div className="catalog-tabs">
          <button className="active">Todos os NFTs</button>
          <button>Novos lançamentos</button>
          <button>Em alta</button>
        </div>

        <div className="catalog-sort">
          <span>Ordenar por:</span>
          <select>
            <option>Listados recentemente</option>
          </select>
        </div>
      </div>

      <div className="catalog-content">
        <aside className="catalog-sidebar">
          <div className="catalog-filters">
            <h3>Coleções</h3>

            <div className="filter-list">
              {categories.map((category) => (
                <div className="filter-item" key={category.name}>
                  <span>{category.name}</span>
                  <span>({category.count})</span>
                </div>
              ))}
            </div>

            <div className="price-filter">
              <h3>Faixa de preço</h3>
              <div className="price-range">
                <span></span>
                <span></span>
              </div>
              <p>Preço: 0,02 - 12,30 ETH</p>
              <button>Aplicar</button>
            </div>

            <div className="network-filter">
              <h3>Rede</h3>

              {networks.map((network) => (
                <div className="filter-item" key={network.name}>
                  <span>{network.name}</span>
                  <span>({network.count})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="featured-nft">
            <h3>NFT EM DESTAQUE</h3>
            <h4>OFERTA LIMITADA</h4>
            <img src="/imgNFT/macacoChapel.png" alt="NFT em destaque" />
          </div>
        </aside>

        <div className="catalog-results">
          <div className="nft-grid">
            {nfts.map((nft) => (
              <Link
                to="/nft/$id"
                params={{ id: nft.id }}
                className="nft-card"
                key={nft.id}
              >
                <div className="nft-image">
                  <img
                    src={`/imgNFT/${nft.image}`}
                    alt={nft.name}
                  />
                </div>

                <h3>{nft.name}</h3>

                <div className="nft-price">
                  <span>{nft.price}</span>
                  {nft.oldPrice && (
                    <del>{nft.oldPrice}</del>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="catalog-pagination">
            <button className="selected">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>›</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NFTCatalog