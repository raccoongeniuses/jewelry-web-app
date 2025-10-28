'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/components/Blog';
import { extractTextFromContent, formatDate, getFeaturedImageUrl } from '@/lib/blog-utils';
import JewelryLoader from '@/components/LoaderSpinner';

export default function BlogDetailPage() {
  const params = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // Fetch individual blog post by ID
        const response = await fetch(`/api/blogs/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const post = await response.json();

        if (!post) {
          throw new Error('Blog post not found');
        }

        setBlogPost(post);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlogPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <section className="blog-details-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <JewelryLoader size="large" message="Loading blog post..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !blogPost) {
    return (
      <section className="blog-details-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <h2 className="text-danger">{error || 'Blog post not found'}</h2>
                <a href="/" className="btn btn-primary mt-3">Back to Home</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const content = extractTextFromContent(blogPost.content);
  const formattedDate = formatDate(blogPost.createdAt);
  const imageUrl = getFeaturedImageUrl(blogPost);

  return (
    <section className="blog-details-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="blog-details-wrapper">
              {/* Blog Image */}
              <div className="blog-details-thumb mb-4">
                <img
                  src={imageUrl}
                  alt={blogPost.featuredImage?.alt || blogPost.title}
                  className="img-fluid w-100"
                />
              </div>

              {/* Blog Content */}
              <div className="blog-details-content">
                <div className="blog-meta mb-3">
                  <span className="blog-date">{formattedDate}</span>
                  <span className="blog-author ml-3">By Jevoo Jewellery</span>
                </div>

                <h1 className="blog-details-title mb-4">{blogPost.title}</h1>

                <div className="blog-details-body">
                  <div className="blog-content-text">
                    {content.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="mb-3">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                </div>

                {/* Blog Footer */}
                <div className="blog-details-footer mt-5">
                  <div className="blog-tags">
                    <span className="tags-label">Tags:</span>
                    <a href="#" className="tag-link">jewellery</a>
                    <a href="#" className="tag-link">fashion</a>
                    <a href="#" className="tag-link">lifestyle</a>
                  </div>

                  <div className="blog-social-share mt-4">
                    <span className="share-label">Share:</span>
                    <a href="#" className="social-link"><i className="fa fa-facebook"></i></a>
                    <a href="#" className="social-link"><i className="fa fa-twitter"></i></a>
                    <a href="#" className="social-link"><i className="fa fa-instagram"></i></a>
                    <a href="#" className="social-link"><i className="fa fa-pinterest"></i></a>
                  </div>
                </div>
              </div>

              {/* Back to Blogs Button */}
              <div className="text-center mt-5">
                <a href="/" className="btn btn-primary">
                  <i className="fa fa-arrow-left mr-2"></i>
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}