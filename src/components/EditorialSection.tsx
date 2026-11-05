
const articles = [
  {
    date: '12 de setembro',
    time: 'Leitura de 6 min',
    title: 'Como funciona a propriedade de NFTs',
    description: 'Aprenda a colecionar, negociar e verificar ativos digitais.',
    image: '/imgNFT/macacoTerno.png'
  },
  {
    date: '13 de setembro',
    time: 'Leitura de 2 min',
    title: '10 artistas digitais para acompanhar',
    description: 'Conheça criadores que moldam a cultura digital.',
    image: '/imgNFT/macacoOculos.png'
  },
  {
    date: '15 de setembro',
    time: 'Leitura de 3 min',
    title: 'Raridade, atributos e procedência',
    description: 'Entenda raridade, procedência, direitos autorais e utilidade.',
    image: '/imgNFT/macacoChapel.png'
  },
  {
    date: '15 de setembro',
    time: 'Leitura de 2 min',
    title: 'Como proteger sua carteira',
    description: 'Proteja sua carteira, seus ativos e sua identidade.',
    image: '/imgNFT/macacoFone.png'
  }
]

function EditorialSection() {
  return (
    <main className="editorial-section">
      <section className="promo-grid">
        <article className="promo-card">
          <img src="/imgNFT/macacoOculos.png" alt="NFT de macaco usando óculos" />
          <div className="promo-content">
            <h2>Lançamentos gênesis de edição limitada</h2>
            <p>Colecione edições escassas diretamente dos criadores antes da revelação pública.</p>
            <button type="button">Explorar →</button>
          </div>
        </article>

        <article className="promo-card">
          <img src="/imgNFT/macacoTerno.png" alt="NFT de macaco com roupa social" />
          <div className="promo-content">
            <h2>Arte digital selecionada e muito mais</h2>
            <p>Explore novos artistas, coleções verificadas e obras digitais que definem a cultura.</p>
            <button type="button">Explorar →</button>
          </div>
        </article>
      </section>

      <section className="journal-section">
        <div className="journal-header">
          <h2>Diário da Cunhagem</h2>
          <p>Histórias, guias e insights para colecionadores sobre o universo da propriedade digital.</p>
        </div>

        <div className="journal-grid">
          {articles.map((article) => (
            <article className="journal-card" key={article.title}>
              <img src={article.image} alt={article.title} />
              <div className="journal-content">
                <span className="journal-date">
                  {article.date} <span>|</span> {article.time}
                </span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href="#">Ler mais →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="bottom-wrapper">
        <section className="benefits-section">
          <article className="benefit-card">
            <div className="benefit-icon">W</div>
            <h3>Segurança da carteira</h3>
            <p>Proteja sua carteira e colecione arte digital verificada com confiança.</p>
          </article>

          <article className="benefit-card">
            <div className="benefit-icon">C</div>
            <h3>Criadores em destaque</h3>
            <p>Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.</p>
          </article>

          <article className="benefit-card">
            <div className="benefit-icon">D</div>
            <h3>Alertas de lançamentos</h3>
            <p>Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.</p>
          </article>

          <form className="newsletter-card" onSubmit={(e) => e.preventDefault()}>
            <h3>Antecipe-se ao próximo lançamento</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="digite seu e-mail..." aria-label="Seu e-mail" />
              <button type="submit">Enviar</button>
            </div>
            <p>Receba lançamentos selecionados, histórias de criadores e novidades do mercado.</p>
          </form>
        </section>
      </div>
    </main>
  )
}

export default EditorialSection
