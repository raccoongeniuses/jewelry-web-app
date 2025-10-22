import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OurProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb Area */}
        <div className="breadcrumb-area common-bg">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h1>Our Products</h1>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Our Products
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {children}
      </main>
      <Footer />
    </>
  );
}