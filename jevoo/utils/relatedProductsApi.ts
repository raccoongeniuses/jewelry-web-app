// Related Products API utility
export interface RelatedProductImage {
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
  thumbnailURL: null;
}

export interface RelatedProductGallery {
  image: RelatedProductImage;
  id: string;
}

export interface RelatedProductCategory {
  name: string;
  slug: string;
  id: string;
}

export interface RelatedProductBrand {
  name: string;
  slug: string;
  id: string;
}

export interface RelatedProduct {
  name: string;
  slug: string;
  price: number;
  isOnSale: boolean;
  salePrice?: number;
  categories: RelatedProductCategory;
  brand: RelatedProductBrand;
  productImage: RelatedProductImage;
  galleries: RelatedProductGallery[];
  id: string;
  finalPrice: number;
  isNew: boolean;
}

export interface RelatedProductItem {
  relatedProduct: RelatedProduct;
  id: string;
}

export interface RelatedProductsResponse {
  docs: RelatedProductItem[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export async function fetchRelatedProducts(slug: string): Promise<RelatedProductsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  try {
    const response = await fetch(
      `${apiUrl}/related-products/slug/${slug}?pagination=true&page=1&limit=10&trash=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Disable caching for real-time data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch related products: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
}