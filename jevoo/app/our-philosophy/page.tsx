import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Testimonials from "../../components/Testimonials";
import WhyChooseUs from "../../components/WhyChooseUs";

export default function OurPhilosophy() {
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
                        Our Philosophy
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
                  <p>💫 Our Philosophy</p>
                  <p>
                    Jevoo Jewellery is not just about adornment — it&apos;s about storytelling through design.
                  </p>
                  <p>
                    Each piece we craft embodies love, legacy, and individuality. We exist for those who value authenticity, appreciate artistry, and understand that real beauty is made, not mass-produced.
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

        </main>

      <Footer />
    </>
  );
}
