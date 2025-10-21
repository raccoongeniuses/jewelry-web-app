import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Team from "../components/Team";
import WhyChooseUs from "../components/WhyChooseUs";

export default function AboutUs() {
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
                        About us
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
                  <p>🕊️ About Us</p>
                  <p>
                    At Jevoo Jewellery, we believe that true luxury lies in individual expression. Founded on the idea of Jewel + For + You, Jevoo is a bespoke jewellery house dedicated to transforming your imagination into timeless elegance.
                  </p>
                  <p>
                    Every piece we create is handcrafted to order — designed from your ideas, refined by our artisans, and perfected through the finest materials and techniques. Whether you come to us with a concept, a sketch, or a story, our design team will bring it to life with precision, passion, and artistry.
                  </p>
                  <p>
                    From classic engagement rings to modern heirlooms, Jevoo stands for personalised luxury that's truly yours — not mass produced, but made with care, character, and purpose.
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
