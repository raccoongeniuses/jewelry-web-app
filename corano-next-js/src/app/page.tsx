import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1>Discover Timeless Elegance</h1>
                <p>
                  Explore our exquisite collection of fine jewelry crafted with precision and passion.
                  Each piece tells a story of beauty and sophistication.
                </p>
                <div className="hero-buttons">
                  <a href="/shop" className="btn btn-primary btn-lg">Shop Now</a>
                  <a href="/collections" className="btn btn-outline btn-lg">View Collections</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img src="/images/banner-gold.png" alt="Luxury Jewelry" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section py-5">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>Shop by Category</h2>
            <p>Find the perfect piece for any occasion</p>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="category-card text-center">
                <div className="category-icon">
                  <i className="fa fa-ring"></i>
                </div>
                <h3>Rings</h3>
                <a href="/shop/rings" className="btn btn-sm">Shop Rings</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-card text-center">
                <div className="category-icon">
                  <i className="fa fa-gem"></i>
                </div>
                <h3>Necklaces</h3>
                <a href="/shop/necklaces" className="btn btn-sm">Shop Necklaces</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-card text-center">
                <div className="category-icon">
                  <i className="fa fa-circle"></i>
                </div>
                <h3>Earrings</h3>
                <a href="/shop/earrings" className="btn btn-sm">Shop Earrings</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-card text-center">
                <div className="category-icon">
                  <i className="fa fa-link"></i>
                </div>
                <h3>Bracelets</h3>
                <a href="/shop/bracelets" className="btn btn-sm">Shop Bracelets</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-5 bg-light">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2>Featured Products</h2>
            <p>Handpicked selections from our collection</p>
          </div>
          <div className="row">
            {/* Product cards will be mapped here */}
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product-card">
                <div className="product-image">
                  <img src="/images/product-1.jpg" alt="Product" />
                  <div className="product-actions">
                    <button className="btn btn-sm btn-primary">Add to Cart</button>
                    <button className="btn btn-sm btn-outline">
                      <i className="fa fa-heart"></i>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h4>Diamond Solitaire Ring</h4>
                  <div className="price">$2,499</div>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* More product cards... */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-box text-center">
                <div className="feature-icon">
                  <i className="fa fa-shipping-fast"></i>
                </div>
                <h3>Free Shipping</h3>
                <p>On orders over $100</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box text-center">
                <div className="feature-icon">
                  <i className="fa fa-shield-alt"></i>
                </div>
                <h3>Secure Payment</h3>
                <p>100% secure transactions</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box text-center">
                <div className="feature-icon">
                  <i className="fa fa-undo"></i>
                </div>
                <h3>Easy Returns</h3>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
