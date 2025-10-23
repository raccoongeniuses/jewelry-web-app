import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonials from "../../components/Testimonials";
import Team from "../../components/Team";
import WhyChooseUs from "../../components/WhyChooseUs";

export default function OurServices() {
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
                        <Link href="/">
                          <i className="fa fa-home"></i>
                        </Link>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Our Services
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
                  <Image src="/assets/img/jevoo-bespoke.jpg" alt="about thumb" width={500} height={400} />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-content">
                  <h2 className="about-title">💎 Jevoo Jewellery</h2>
                  <h5 className="about-sub-title">Crafted for You. Inspired by You.</h5>
                  <p>💫 Our Services</p>
                  <p>
                    ✨ <strong>Bespoke Design Consultation</strong><br />
                    Discuss your dream piece directly with our designers.
                  </p>
                  <p>
                    ✨ <strong>3D Digital Preview</strong><br />
                    View your design in realistic renderings before production begins.
                  </p>
                  <p>
                    ✨ <strong>Material & Gem Selection</strong><br />
                    Choose from certified diamonds, natural gemstones, or premium lab-grown stones.
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
