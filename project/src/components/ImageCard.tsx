import React from 'react';
import { ExternalLink, Heart, Download } from 'lucide-react';
import { UnsplashImage } from '../types';

interface ImageCardProps {
  image: UnsplashImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={image.urls.regular}
          alt={image.alt_description || 'Unsplash image'}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <img
                src={image.user.profile_image.small}
                alt={image.user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{image.user.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={image.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <div className="flex items-center space-x-1">
                <Heart className="w-5 h-5" />
                <span>{image.likes}</span>
              </div>
              <a
                href={`${image.links.download}&force=true`}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {image.description && (
        <div className="p-4">
          <p className="text-gray-700">{image.description}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCard;