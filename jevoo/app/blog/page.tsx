"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/components/Blog";
import Header from "@/components/Header";
import {
  extractTextFromContent,
  truncateText,
  formatDate,
  getFeaturedImageUrl,
} from "@/lib/blog-utils";
import Footer from "@/components/Footer";

function BlogPostCard({ post }: { post: BlogPost }) {
  const excerpt = truncateText(extractTextFromContent(post.content));
  const formattedDate = formatDate(post.createdAt);
  const imageUrl = getFeaturedImageUrl(post);

  return (
    <div className="col-lg-6 mb-4">
      <div className="blog-item">
        <div className="blog-thumb">
          <Image
            src={imageUrl || "/assets/img/default.jpg"}
            alt={post.featuredImage?.alt || post.title}
            quality={75}
            width={1200}
            height={675}
            className="img-fluid w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-date">{formattedDate}</span>
            <span className="blog-author ml-3">By Jevoo Jewellery</span>
          </div>
          <h4 className="blog-title">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h4>
          <p className="blog-excerpt">{excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="read-more">
            Read More <i className="fa fa-angle-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogListingPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogPosts(data.docs || []);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section className="blog-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">Blog</h2>
                <p className="sub-title">Loading blog posts...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title text-center">
                <h2 className="title">Blog</h2>
                <p className="sub-title text-danger">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Header />
      <section className="blog-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* section title start */}
              <div className="section-title text-center">
                <h2 className="title">Our Blog</h2>
                <p className="sub-title">
                  Read our latest articles and insights
                </p>
              </div>
              {/* section title end */}
            </div>
          </div>

          {blogPosts.length === 0 ? (
            <div className="row">
              <div className="col-12">
                <div className="text-center py-5">
                  <h3>No blog posts available</h3>
                  <p className="text-muted">
                    Check back later for new content.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.createdAt} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
