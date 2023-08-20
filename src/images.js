const getImageUrl = (size, signature) => `https://source.unsplash.com/random/${size}?sig=${signature}`;

const generateImages = (count, size) => {
  const images = [];
  for (let i = 1; i <= count; i++) {
    const imageUrl = getImageUrl(size, i);
    images.push(imageUrl);
  }
  return images;
};

const images = generateImages(9, '500x500');

export default images;
