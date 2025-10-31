'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { extractTextFromContent, truncateText, formatDate, getFeaturedImageUrl } from '@/lib/blog-utils';
import Link from 'next/link';
import JewelryLoader from './LoaderSpinner';
import './Blog.css';

export interface FeaturedImage {
  createdAt: string;
  updatedAt: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  id: string;
  url: string;
  thumbnailURL: string | null;
}

export interface BlogPost {
  createdAt: string;
  updatedAt: string;
  title: string;
  generateSlug: boolean;
  slug: string;
  content: string;
  author: string;
  featuredImage: FeaturedImage;
  status: string;
  id: string;
}

interface BlogPostItem {
  post: BlogPost;
  index?: number;
}

function BlogPostCard({ post, index }: BlogPostItem) {
  const excerpt = truncateText(extractTextFromContent(post.content));
  const formattedDate = formatDate(post.createdAt);
  const imageUrl = getFeaturedImageUrl(post);

  return (
    <Link href={`/blog/${post.featuredImage.id}`} className="blog-post-item-link">
      <div className="blog-post-item">
        <figure className="blog-thumb">
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt || post.title}
            width={post.featuredImage?.width || 600}
            height={post.featuredImage?.height || 400}
            style={{ objectFit: 'cover' }}
            className="blog-thumb-img"
            priority={typeof index === 'number' ? index < 2 : false}
          />
        </figure>
        <div className="blog-content">
          <div className="blog-meta">
            <p>{formattedDate} | <span>Jevoo Jewellery</span></p>
          </div>
          <h5 className="blog-title">
            {post.title}
          </h5>
          <div className="blog-excerpt">
            <p>{excerpt}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [isSlickReady, setIsSlickReady] = useState(false);

  useEffect(() => {
    // Fetch blog posts from API
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data.docs || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
        // Add delay to give slick time to start initializing
        setTimeout(() => {
          setShowContent(true);
        }, 300); // 300ms delay to give slick time to start initializing
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (blogPosts.length === 0 || !showContent) return;

    // Capture the ref value so the cleanup uses the same element reference the effect started with.
    const carouselEl = carouselRef.current;

    let retries = 0;
    const maxRetries = 20;
    const init = () => {
      const hasJQ = typeof window !== 'undefined' && window.$;
      const hasSlick = hasJQ && window.$.fn && typeof window.$.fn.slick === 'function';
      if (!carouselEl) return false;
      if (hasSlick) {
        try {
          const $ = window.$;
          if ($(carouselEl).hasClass('slick-initialized')) {
            $(carouselEl).slick('unslick');
          }
          $(carouselEl).slick({
            speed: 800,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          });
          // Mark slick as ready
          setIsSlickReady(true);
        } catch (e) {
          console.error('Error initializing slick carousel:', e);
        }
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (init() || retries++ >= maxRetries) clearInterval(interval);
    }, 200);

    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined' && window.$ && carouselEl) {
        const $ = window.$;
        if ($(carouselEl).hasClass('slick-initialized')) {
          $(carouselEl).slick('unslick');
        }
      }
    };
  }, [blogPosts, showContent]);

  if (loading || !showContent) {
    return (
      <section className="latest-blog-area section-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">latest blogs</h2>
                <div className="d-flex justify-content-center mt-4">
                  <JewelryLoader size="medium" message="Loading beautiful blogs..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="latest-blog-area section-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">latest blogs</h2>
                <p className="sub-title text-danger">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="latest-blog-area section-padding pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* section title start */}
            <div className="section-title text-center">
              <h2 className="title">latest blogs</h2>
              <p className="sub-title">There are latest blog posts</p>
            </div>
            {/* section title end */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              ref={carouselRef}
              className="blog-carousel-active slick-row-10 slick-arrow-style"
              data-react-component="true"
              style={{
                opacity: isSlickReady ? 1 : 0,
                visibility: isSlickReady ? 'visible' : 'hidden',
                minHeight: isSlickReady ? 'auto' : '300px',
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              {blogPosts.map((post, index) => (
                <BlogPostCard key={post.featuredImage.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
