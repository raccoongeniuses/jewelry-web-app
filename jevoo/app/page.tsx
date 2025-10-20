import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        {/* hero slider area start */}
        <section className="slider-area">
          <div className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style">
            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div className="hero-slider-item bg-img" data-bg="/assets/img/banner-gold.png">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-1">
                        <h2 className="slide-title">Family Jewelry <span>Collection</span></h2>
                        <h4 className="slide-desc">Designer Jewelry Necklaces-Bracelets-Earings</h4>
                        <a href="/shop" className="btn btn-hero">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* single slider item end */}

            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div className="hero-slider-item bg-img" data-bg="/assets/img/banner-gold.png">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-2 float-md-end float-none">
                        <h2 className="slide-title">Diamonds Jewelry<span>Collection</span></h2>
                        <h4 className="slide-desc">Shukra Yogam & Silver Power Silver Saving Schemes.</h4>
                        <a href="/shop" className="btn btn-hero">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* single slider item end */}

            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div className="hero-slider-item bg-img" data-bg="/assets/img/banner-gold.png">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-3">
                        <h2 className="slide-title">Grace Designer<span>Jewelry</span></h2>
                        <h4 className="slide-desc">Rings, Occasion Pieces, Pandora & More.</h4>
                        <a href="/shop" className="btn btn-hero">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* single slider item end */}
          </div>
        </section>
        {/* hero slider area end */}

        {/* service policy area start */}
        <div className="service-policy section-padding">
          <div className="container">
            <div className="row mtn-30">
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-plane"></i>
                  </div>
                  <div className="policy-content">
                    <h6>Free Shipping</h6>
                    <p>Free shipping all order</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-help2"></i>
                  </div>
                  <div className="policy-content">
                    <h6>Support 24/7</h6>
                    <p>Support 24 hours a day</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-back"></i>
                  </div>
                  <div className="policy-content">
                    <h6>Money Return</h6>
                    <p>30 days for free return</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-credit"></i>
                  </div>
                  <div className="policy-content">
                    <h6>100% Payment Secure</h6>
                    <p>We ensure secure payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* service policy area end */}

        {/* product area start */}
        <section className="product-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* section title start */}
                <div className="section-title text-center">
                  <h2 className="title">Our products</h2>
                  <p className="sub-title">Add our products to weekly lineup</p>
                </div>
                {/* section title end */}
              </div>
            </div>
          </div>
        </section>
        {/* product area end */}

        {/* draggable marquee area start */}
        <section className="draggable-product-marquee">
          <div className="marquee-wrapper">
            <div className="grid">
              {/* First set of columns */}
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-2.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-1.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-4.png" alt="Ring Collection" /></div>
              </div>
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/earring-1.png" alt="Earring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-4.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-5.png" alt="Ring Collection" /></div>
              </div>
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-2.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-1.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-7.png" alt="Ring Collection" /></div>
              </div>
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-7.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-5.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/earring-1.png" alt="Earring Collection" /></div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-5.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-1.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-3.png" alt="Ring Collection" /></div>
              </div>
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-3.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-3.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-2.png" alt="Ring Collection" /></div>
              </div>
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-4.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-1.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-7.png" alt="Ring Collection" /></div>
              </div>
              <div className="column">
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-2.png" alt="Ring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/earring-1.png" alt="Earring Collection" /></div>
                <div className="marquee-item"><img src="/assets/draggable-grid-public/ring-3.png" alt="Ring Collection" /></div>
              </div>
            </div>
          </div>
        </section>
        {/* draggable marquee area end */}

        {/* Vase Details Panel */}
        <div className="vase-details-overlay" id="vaseDetailsOverlay"></div>
        <div className="vase-details-panel" id="vaseDetailsPanel">
          <button className="vase-details-close" id="vaseDetailsClose">×</button>
          <div className="vase-details-content">
            <h3 className="vase-details-title">Golden Ring</h3>
            <div className="vase-details-thumb" id="vaseDetailsThumb"></div>
            <div className="vase-details-info">
              <div className="vase-details-price">$300.00</div>
              <div className="vase-details-description">
                Generous in size and striking in presence, the large golden ring makes a bold decorative statement. Its smooth curves and sunny shade are perfect for standing on the floor or dressing up a wide console. Both functional and eye-catching, it brings vitality and a contemporary edge to your interior design.
              </div>
              <button className="vase-details-add-cart">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* featured product area start */}
        <section className="feature-product section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* section title start */}
                <div className="section-title text-center">
                  <h2 className="title">featured products</h2>
                  <p className="sub-title">Add featured products to weekly lineup</p>
                </div>
                {/* section title end */}
              </div>
            </div>
          </div>
        </section>
        {/* featured product area end */}
      </main>

      <Footer />
    </>
  );
}
