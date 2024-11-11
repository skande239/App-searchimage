import React from 'react';
import { UnsplashImage } from '../types';
import ImageCard from './ImageCard';

interface ImageGridProps {
  images: UnsplashImage[];
  isLoading: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading }) => {
  if (isLoading && images.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-lg aspect-[4/3] w-full"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGrid;