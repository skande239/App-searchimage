import { config } from '../config/env';
import { SearchResponse } from '../types';

export async function searchImages(query: string, page: number = 1): Promise<SearchResponse> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: '20'
  });

  const response = await fetch(
    `${config.unsplashApiUrl}/search/photos?${params}`,
    {
      headers: {
        Authorization: `Client-ID ${config.unsplashApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.errors?.[0] || 'Failed to fetch images');
  }

  return response.json();
}