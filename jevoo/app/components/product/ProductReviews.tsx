'use client';

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

interface ProductReviewsProps {
  product: {
    id: string;
    name: string;
    colors?: string[];
    sizes?: string[];
  };
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log('Review submitted:', reviewForm);
    // Reset form
    setReviewForm({
      name: '',
      email: '',
      review: '',
      rating: 5
    });
  };

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'good' : ''}>
        <i className={`fa fa-star${index >= rating ? '-o' : ''}`}></i>
      </span>
    ));
  };

  return (
    <div className="product-details-reviews section-padding pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="product-review-info">
              <ul className="nav review-tab">
                <li>
                  <a
                    className={activeTab === 'description' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('description');
                    }}
                    href="#description"
                  >
                    description
                  </a>
                </li>
                <li>
                  <a
                    className={activeTab === 'information' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('information');
                    }}
                    href="#information"
                  >
                    information
                  </a>
                </li>
                <li>
                  <a
                    className={activeTab === 'reviews' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('reviews');
                    }}
                    href="#reviews"
                  >
                    reviews (1)
                  </a>
                </li>
              </ul>

              <div className="tab-content reviews-tab">
                {/* Description Tab */}
                <div
                  className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`}
                  id="description"
                >
                  <div className="tab-one">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque.Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam erat mi, rutrum at sollicitudin rhoncus
                    </p>
                  </div>
                </div>

                {/* Information Tab */}
                <div
                  className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`}
                  id="information"
                >
                  <table className="table table-bordered">
                    <tbody>
                      {product.colors && product.colors.length > 0 && (
                        <tr>
                          <td>color</td>
                          <td>{product.colors.join(', ')}</td>
                        </tr>
                      )}
                      {product.sizes && product.sizes.length > 0 && (
                        <tr>
                          <td>size</td>
                          <td>{product.sizes.join(', ')}</td>
                        </tr>
                      )}
                      <tr>
                        <td>Product ID</td>
                        <td>{product.id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Reviews Tab */}
                <div
                  className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`}
                  id="reviews"
                >
                  <form action="#" className="review-form" onSubmit={handleReviewSubmit}>
                    <h5>1 review for <span>{product.name}</span></h5>

                    {/* Existing Review */}
                    <div className="total-reviews">
                      <div className="rev-avatar">
                        <Image
                          src="/assets/img/product/gold-necklace.jpeg"
                          alt="Reviewer"
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="review-box">
                        <div className="ratings">
                          {renderRating(4)}
                        </div>
                        <div className="post-author">
                          <p><span>admin -</span> 30 Mar, 2019</p>
                        </div>
                        <p>
                          Aliquam fringilla euismod risus ac bibendum. Sed sit amet sem varius ante feugiat lacinia. Nunc ipsum nulla, vulputate ut venenatis vitae, malesuada ut mi. Quisque iaculis, dui congue placerat pretium, augue erat accumsan lacus
                        </p>
                      </div>
                    </div>

                    {/* Review Form */}
                    <div className="form-group row">
                      <div className="col">
                        <label className="col-form-label">
                          <span className="text-danger">*</span> Your Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={reviewForm.name}
                          onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label className="col-form-label">
                          <span className="text-danger">*</span> Your Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={reviewForm.email}
                          onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label className="col-form-label">
                          <span className="text-danger">*</span> Your Review
                        </label>
                        <textarea
                          className="form-control"
                          value={reviewForm.review}
                          onChange={(e) => setReviewForm({...reviewForm, review: e.target.value})}
                          required
                          rows={4}
                        ></textarea>
                        <div className="help-block pt-10">
                          <span className="text-danger">Note:</span> HTML is not translated!
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                        <label className="col-form-label">
                          <span className="text-danger">*</span> Rating
                        </label>
                        &nbsp;&nbsp;&nbsp; Bad&nbsp;
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <React.Fragment key={rating}>
                            <input
                              type="radio"
                              value={rating}
                              name="rating"
                              checked={reviewForm.rating === rating}
                              onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                            />
                            &nbsp;
                          </React.Fragment>
                        ))}
                        &nbsp;Good
                      </div>
                    </div>

                    <div className="buttons">
                      <button className="btn btn-sqr" type="submit">
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}