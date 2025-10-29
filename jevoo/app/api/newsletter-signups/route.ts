import { NextResponse } from 'next/server';

// Simple email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = body;

    // Make the API call to the external newsletter service
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter-signups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to subscribe to newsletter');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter'
      },
      { status: 500 }
    );
  }
}