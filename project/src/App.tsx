import React, { useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import { UnsplashImage } from './types';
import { searchImages } from './services/api';

function App() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchImages = useCallback(async (searchQuery: string, pageNum: number) => {
    try {
      setError(null);
      setLoading(true);
      
      const data = await searchImages(searchQuery, pageNum);
      
      setImages((prev) => 
        pageNum === 1 ? data.results : [...prev, ...data.results]
      );
      setHasMore(data.total_pages > pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setHasMore(true);
  };

  useEffect(() => {
    if (query) {
      fetchImages(query, page);
    }
  }, [query, page, fetchImages]);

  useEffect(() => {
    if (inView && hasMore && !loading && query) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading, query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Image Search
          </h1>
          <p className="text-gray-600">
            Search through millions of high-quality images
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="text-red-600 text-center mb-4 p-4 bg-red-50 rounded-lg">
            <p className="font-medium">Error: {error}</p>
            <p className="text-sm mt-2">Please make sure you have set up your Unsplash API key in the .env file</p>
          </div>
        )}

        <ImageGrid images={images} isLoading={loading} />

        {hasMore && (
          <div ref={ref} className="h-20 flex items-center justify-center">
            {loading && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            )}
          </div>
        )}

        {!loading && images.length === 0 && query && !error && (
          <div className="text-center text-gray-600 p-8">
            No images found for "{query}"
          </div>
        )}

        {!query && !error && (
          <div className="text-center text-gray-600 p-8">
            Start searching to see images
          </div>
        )}
      </div>
    </div>
  );
}

export default App;