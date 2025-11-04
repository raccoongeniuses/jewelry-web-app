'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
  reviewerName: string;
  reviewerEmail: string;
  createdAt: string;
  status: string;
  isVerifiedPurchase: boolean;
  isGuest: boolean;
}

interface ProductReviewsProps {
  product: {
    id: string;
    name: string;
    description?: string;
    colors?: string[];
    sizes?: string[];
    slug?: string;
  };
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5
  });

  useEffect(() => {
    if (product.slug) {
      fetchReviews();
    }
  }, [product.slug]);

  const fetchReviews = async () => {
    if (!product.slug) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/product-slug/${product.slug}?limit=20`);
      const data = await response.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
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
                    reviews ({reviews.length})
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
                      {product.description || 'No description available for this product.'}
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
                    <h5>{reviews.length} review{reviews.length !== 1 ? 's' : ''} for <span>{product.name}</span></h5>

                    {/* Existing Reviews */}
                    {loading ? (
                      <p>Loading reviews...</p>
                    ) : reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.id} className="total-reviews">
                          <div className="rev-avatar">
                            <Image
                              src="/assets/img/icon/avatar.jpg"
                              alt={review.reviewerName}
                              width={60}
                              height={60}
                            />
                          </div>
                          <div className="review-box">
                            <div className="ratings">
                              {renderRating(review.rating)}
                            </div>
                            <div className="post-author">
                              <p><span>{review.reviewerName} -</span> {new Date(review.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            {review.title && <h6>{review.title}</h6>}
                            <p>{review.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet for this product.</p>
                    )}

                    {/* Review Form , hide for now*/}
                    {/* <div className="form-group row">
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
                    </div> */}

                    {/* <div className="form-group row">
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
                    </div> */}

                    {/* <div className="form-group row">
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
                    </div> */}

                    {/* <div className="form-group row">
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
                    </div> */}

                    {/* <div className="buttons">
                      <button className="btn btn-sqr" type="submit">
                        Continue
                      </button>
                    </div> */}
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