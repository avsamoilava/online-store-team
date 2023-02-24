export default function duplicateFilter(images: string[]) {
  const duplicateImages = [
    'https://i.dummyjson.com/data/products/1/2.jpg',
    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    'https://i.dummyjson.com/data/products/10/2.jpg',
    'https://i.dummyjson.com/data/products/16/thumbnail.jpg',
    'https://i.dummyjson.com/data/products/20/thumbnail.jpg',
    'https://i.dummyjson.com/data/products/23/thumbnail.jpg',
    'https://i.dummyjson.com/data/products/24/4.jpg',
    'https://i.dummyjson.com/data/products/26/5.jpg',
    'https://i.dummyjson.com/data/products/29/thumbnail.webp',
    'https://i.dummyjson.com/data/products/56/3.jpg',
    'https://i.dummyjson.com/data/products/56/5.jpg',
    'https://i.dummyjson.com/data/products/70/thumbnail.jpg',
    'https://i.dummyjson.com/data/products/77/3.jpg',
    'https://i.dummyjson.com/data/products/89/3.jpg',
  ];
  return images.filter((image) => !duplicateImages.includes(image));
}
