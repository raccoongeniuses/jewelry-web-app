export default function Testimonials() {
  return (
    <section
      className="testimonial-area section-padding bg-img"
      data-bg="/assets/img/testimonial/testimonials-bg.jpg"
      style={{
        backgroundImage: 'url(/assets/img/testimonial/testimonials-bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* section title start */}
            <div className="section-title text-center">
              <h2 className="title">testimonials</h2>
              <p className="sub-title">What they say</p>
            </div>
            {/* section title end */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="testimonial-thumb-wrapper">
              <div className="testimonial-thumb-carousel">
                <div className="testimonial-thumb">
                  <img src="/assets/img/testimonial/testimonials-1.jpg" alt="testimonial-thumb" />
                </div>
                <div className="testimonial-thumb">
                  <img src="/assets/img/testimonial/testimonials-2.jpg" alt="testimonial-thumb" />
                </div>
                <div className="testimonial-thumb">
                  <img src="/assets/img/testimonial/testimonials-3.jpg" alt="testimonial-thumb" />
                </div>
                <div className="testimonial-thumb">
                  <img src="/assets/img/testimonial/testimonials-3.jpg" alt="testimonial-thumb" />
                </div>
              </div>
            </div>
            <div className="testimonial-content-wrapper">
              <div className="testimonial-content-carousel">
                <div className="testimonial-content">
                  <p>
                    Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc
                    scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci
                    augue nec sapien. Cum sociis natoque
                  </p>
                  <div className="ratings">
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <h5 className="testimonial-author">lindsy niloms</h5>
                </div>
                <div className="testimonial-content">
                  <p>
                    Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc
                    scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci
                    augue nec sapien. Cum sociis natoque
                  </p>
                  <div className="ratings">
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <h5 className="testimonial-author">Daisy Millan</h5>
                </div>
                <div className="testimonial-content">
                  <p>
                    Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc
                    scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci
                    augue nec sapien. Cum sociis natoque
                  </p>
                  <div className="ratings">
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <h5 className="testimonial-author">Anamika lusy</h5>
                </div>
                <div className="testimonial-content">
                  <p>
                    Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc
                    scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci
                    augue nec sapien. Cum sociis natoque
                  </p>
                  <div className="ratings">
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                    <span><i className="fa fa-star-o"></i></span>
                  </div>
                  <h5 className="testimonial-author">Maria Mora</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


