import React from 'react';

interface Props {
  productName: string;
  mainImageUrl: string;
}

export const ProductGallery: React.FC<Props> = ({ productName, mainImageUrl }) => {
  return (
    <div className="flex flex-col space-y-3">
      <img
        src={mainImageUrl}
        alt={`Ảnh của ${productName}`}
        className="w-full aspect-square object-cover rounded-lg shadow-md"
      />
    </div>
  );
};
