function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span>Bem-vindo à Kurio</span>

        <h1>SEJA DONO DO FUTURO DA ARTE DIGITAL</h1>

        <p>
          Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.
        </p>

        <button type="button">EXPLORAR</button>
      </div>

    <div className="hero-image">
    <img src="/imgNFT/macacoOculos.png" alt="Macaco NFT usando óculos" />

    <div className="carousel-dots">
        <span className="active"></span>
        <span></span>
        <span></span>
    </div>
    </div>
    </section>
  )
}

export default Hero