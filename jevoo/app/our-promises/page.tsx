import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Team from "../components/Team";
import WhyChooseUs from "../components/WhyChooseUs";

export default function OurPromises() {
  return (
    <>
      <Header />

      <main>
        {/* breadcrumb area start */}
        <div className="breadcrumb-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">
                          <i className="fa fa-home"></i>
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Our Promises
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}

        {/* about us area start */}
        <section className="about-us section-padding">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="about-thumb">
                  <img src="/assets/img/jevoo-bespoke.jpg" alt="about thumb" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-content">
                  <h2 className="about-title">💎 Jevoo Jewellery</h2>
                  <h5 className="about-sub-title">Crafted for You. Inspired by You.</h5>
                  <p>💫 Our Promises</p>
                  <p>
                    We understand that jewellery is more than an accessory — it's a reflection of who you are. That's why Jevoo Jewellery is built on three unshakable pillars:
                  </p>
                  <p>
                    <strong>1. Authenticity You Can Trust</strong><br />
                    Every gemstone and precious metal we use is independently certified and ethically sourced. We provide full transparency on every creation, and offer a 100% money-back guarantee if any gold, diamond, or gemstone is ever found to be non-genuine or misrepresented.
                  </p>
                  <p>
                    <strong>2. Craftsmanship Without Compromise</strong><br />
                    Our master craftsmen blend traditional artistry with modern design technology to achieve flawless detail. From initial concept to final polish, every Jevoo piece is meticulously crafted to exceed expectation.
                  </p>
                  <p>
                    <strong>3. Customisation Beyond Limits</strong><br />
                    Your vision is our blueprint. Whether inspired by an existing design, a memory, or your imagination — Jevoo can customise any style or concept to perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about us area end */}

        {/* choosing area start */}
        <WhyChooseUs />
        {/* choosing area end */}

        {/* testimonial area start */}
        <Testimonials />
        {/* testimonial area end */}

        {/* team area start */}
        <Team />
        {/* team area end */}
      </main>

      <Footer />
    </>
  );
}
