import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us - Jevoo Jewellery</title>
        <meta name="description" content="Learn about Jevoo Jewellery and our commitment to excellence" />
      </Head>

      <div className="body-wrapper">
        <Header currentPage="about" />

        {/* Page Header */}
        <section className="page-header-area bg-img" style={{backgroundImage: 'url(/assets/img/bg/page-header.jpg)'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-header-content text-center">
                  <h2>About Us</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item"><a href="/">Home</a></li>
                      <li className="breadcrumb-item active" aria-current="page">About Us</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="about-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="about-content">
                  <h2>Our Story</h2>
                  <p>At Jevoo Jewellery, we believe in creating timeless pieces that capture the essence of beauty and elegance. Our journey began with a simple passion for exquisite craftsmanship and has grown into a beloved destination for jewelry enthusiasts worldwide.</p>
                  <p>Each piece in our collection is carefully selected and crafted with the finest materials, ensuring that every customer receives a product that exceeds their expectations.</p>

                  <div className="about-features">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="about-feature-item">
                          <i className="pe-7s-diamond"></i>
                          <h4>Premium Quality</h4>
                          <p>We use only the finest materials and gemstones in our jewelry.</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="about-feature-item">
                          <i className="pe-7s-portfolio"></i>
                          <h4>Expert Craftsmanship</h4>
                          <p>Our skilled artisans bring decades of experience to every piece.</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="about-feature-item">
                          <i className="pe-7s-heart"></i>
                          <h4>Passion Driven</h4>
                          <p>We are passionate about creating jewelry that tells your story.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default AboutPage