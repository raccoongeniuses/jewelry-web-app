'use client';

import { useEffect, useRef } from 'react';

type BlogPost = {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  url: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Celebrity Daughter Opens Up About Having Her Eye Color Changed',
    date: '25/03/2019',
    author: 'Jevoo Jewellery',
    image: '/assets/img/blog/blog-img-1.jpg',
    url: '/blog-details',
  },
  {
    id: 'blog-2',
    title: 'Children Left Home Alone For 4 Days In TV series Experiment',
    date: '25/03/2019',
    author: 'Jevoo Jewellery',
    image: '/assets/img/blog/blog-img-2.jpg',
    url: '/blog-details',
  },
  {
    id: 'blog-3',
    title: 'Lotto Winner Offering Up Money To Any Man That Will Date Her',
    date: '25/03/2019',
    author: 'Jevoo Jewellery',
    image: '/assets/img/blog/blog-img-3.jpg',
    url: '/blog-details',
  },
  {
    id: 'blog-4',
    title: 'People are Willing Lie When Comes Money, According to Research',
    date: '25/03/2019',
    author: 'Jevoo Jewellery',
    image: '/assets/img/blog/blog-img-4.jpg',
    url: '/blog-details',
  },
  {
    id: 'blog-5',
    title: 'Romantic Love Stories Of Hollywood\'s Biggest Celebrities',
    date: '25/03/2019',
    author: 'Jevoo Jewellery',
    image: '/assets/img/blog/blog-img-5.jpg',
    url: '/blog-details',
  },
];

export default function Blog() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let retries = 0;
    const maxRetries = 20;
    const init = () => {
      const hasJQ = typeof window !== 'undefined' && window.$;
      const hasSlick = hasJQ && window.$.fn && typeof window.$.fn.slick === 'function';
      if (!carouselRef.current) return false;
      if (hasSlick) {
        try {
          const $ = window.$;
          if ($(carouselRef.current).hasClass('slick-initialized')) {
            $(carouselRef.current).slick('unslick');
          }
          $(carouselRef.current).slick({
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
        } catch (e) {
          console.error(e);
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
      if (typeof window !== 'undefined' && window.$ && carouselRef.current) {
        const $ = window.$;
        if ($(carouselRef.current).hasClass('slick-initialized')) {
          $(carouselRef.current).slick('unslick');
        }
      }
    };
  }, []);

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
            <div ref={carouselRef} className="blog-carousel-active slick-row-10 slick-arrow-style" data-react-component="true">
              {blogPosts.map((post) => (
                <div className="blog-post-item" key={post.id}>
                  <figure className="blog-thumb">
                    <img src={post.image} alt="blog image" />
                  </figure>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <p>{post.date} | <a href="#">{post.author}</a></p>
                    </div>
                    <h5 className="blog-title">
                      {post.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
