import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../../styles/homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Pursuit Athletics</h1>
          <p>
            Elevate your performance with elite-level athletic wear built for winners.
          </p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <h2>Featured Gear</h2>
        <div className="product-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="product-card">
              <div className="product-image">Product Image</div>
              <div className="product-info">
                <h3>Product Name</h3>
                <p>$XX.XX</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Train Hard. Recover Stronger.</h2>
        <p>
          From warmups to post-workout chill, Pursuit gear keeps up with your grind.
        </p>
        <Link to="/products" className="cta-button">Browse Collection</Link>
      </section>

    </div>
  );
};

export default Homepage;
