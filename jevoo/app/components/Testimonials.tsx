'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Testimonial = {
  id: string;
  name: string;
  content: string;
  image: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Lindsy Niloms',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-1.jpg',
    rating: 5
  },
  {
    id: 'testimonial-2',
    name: 'Daisy Millan',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-2.jpg',
    rating: 5
  },
  {
    id: 'testimonial-3',
    name: 'Anamika Lusy',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-3.jpg',
    rating: 5
  },
  {
    id: 'testimonial-4',
    name: 'Maria Mora',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-3.jpg',
    rating: 5
  }
];

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index}>
        <i className="fa fa-star-o"></i>
      </span>
    ));
  };

  return (
    <section 
      className="testimonial-area section-padding bg-img" 
      style={{
        backgroundImage: 'url(/assets/img/testimonial/testimonials-bg.jpg)'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Section title */}
            <div className="section-title text-center">
              <h2 className="title">testimonials</h2>
              <p className="sub-title">What they say</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="testimonial-thumb-wrapper">
              <div className="testimonial-thumb-carousel">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={`testimonial-thumb ${activeTestimonial === index ? 'slick-current' : ''}`}
                    onClick={() => setActiveTestimonial(index)}
                  >
                    <Image
                      src={testimonial.image}
                      alt="testimonial-thumb"
                      width={100}
                      height={100}
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        width: '100px',
                        height: '100px'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="testimonial-content-wrapper">
              <div className="testimonial-content-carousel">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={`testimonial-content ${activeTestimonial === index ? 'active' : ''}`}
                    style={{ 
                      display: activeTestimonial === index ? 'block' : 'none'
                    }}
                  >
                    <p>{testimonial.content}</p>
                    <div className="ratings">
                      {renderStars(testimonial.rating)}
                    </div>
                    <h5 className="testimonial-author">{testimonial.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;