import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/?id=${id}&depth=1`);

    if (!response.ok) {
      throw new Error('Failed to fetch blog post from API');
    }

    const data = await response.json();

    // Return the first (and only) blog post from the docs array
    const blogPost = data.docs?.[0] || null;

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}