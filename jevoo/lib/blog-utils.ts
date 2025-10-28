import { BlogPost } from '@/components/Blog';

export function extractTextFromContent(content: string): string {
  return content || '';
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function getFeaturedImageUrl(post: BlogPost): string {
  // If featuredImage exists and has a URL, combine it with API base URL
  if (post.featuredImage?.url) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    // Remove trailing slash from API URL if it exists
    const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

    // Remove /api prefix from image path if it exists to avoid double /api
    let imagePath = post.featuredImage.url;
    if (imagePath.startsWith('/api/')) {
      imagePath = imagePath.substring(4); 
    } else if (imagePath.startsWith('api/')) {
      imagePath = imagePath.substring(3);
    }

    // Ensure the image path starts with /
    if (!imagePath.startsWith('/')) {
      imagePath = `/${imagePath}`;
    }

    return `${baseUrl}${imagePath}`;
  }

  // Fallback to default images based on index
  return '/assets/img/blog/blog-img-1.jpg';
}