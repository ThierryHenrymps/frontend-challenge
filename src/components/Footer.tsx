import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa'

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-strip">
          <div className="footer-logo">KURIO</div>

          <p className="footer-tagline">
            Feito para colecionadores,
            <br />
            criadores e cultura
          </p>

          <a href="mailto:contato@email.com" className="footer-contact">
            contato@email.com
          </a>

          <a href="tel:+551140028922" className="footer-contact">
            +55 11 4002 8922
          </a>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>Meu perfil</h4>
            <a href="#">Meu perfil</a>
            <a href="#">Minha coleção</a>
            <a href="#">Atividade</a>
            <a href="#">Estúdio do criador</a>
            <a href="#">Lista de interesse</a>
          </div>

          <div className="footer-column">
            <h4>Central de ajuda</h4>
            <a href="#">Central de ajuda</a>
            <a href="#">Como comprar NFTs</a>
            <a href="#">Carteira e segurança</a>
            <a href="#">Política do mercado</a>
            <a href="#">Denunciar item</a>
          </div>

          <div className="footer-column">
            <h4>Coleções</h4>
            <a href="#">Arte digital</a>
            <a href="#">Fotografia</a>
            <a href="#">Música</a>
            <a href="#">Arte 3D</a>
            <a href="#">Utilidade</a>
          </div>

          <div className="footer-column">
            <h4>Redes sociais</h4>

            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebookF size={13} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={13} /></a>
              <a href="#" aria-label="Twitter"><FaTwitter size={13} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={13} /></a>
              <a href="#" aria-label="YouTube"><FaYoutube size={13} /></a>
            </div>

            <h4>Carteiras compatíveis</h4>

            <div className="wallets-badge">
              <span>METAMASK</span>
              <span className="dot">•</span>
              <span>WALLETCONNECT</span>
              <span className="dot">•</span>
              <span>COINBASE</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-copyright">
        <p>© 2026 Kurio. Propriedade digital para todos.</p>
      </div>
    </>
  )
}

export default Footer