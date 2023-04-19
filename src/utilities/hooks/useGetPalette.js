import { useState } from 'react';
import KMeans from 'kmeans-js';

const useGetPalette = () => {
  const [palette, setPalette] = useState([]);

  const getColorPalette = async (src, slots = 6) => {
    if (src === null || src.trim() === '' || src === undefined) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
  
    // load image
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      // get palette
      const colors = extractPalette(ctx, slots);
      setPalette(colors);
    };
    img.src = src;
  
    // check if image has loaded
    if (img.complete) {
      img.onload();
    }
  };
  

const extractPalette = (ctx, nColors) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const pixels = imageData.data;

  // create an array of pixels in the format [r, g, b, a]
  const pixelArray = [];
  for (let i = 0; i < pixels.length; i += 4) {
    pixelArray.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
  }

  // use k-means to cluster the colors
  const kmeans = new KMeans();
  const clusters = kmeans.cluster(pixelArray, nColors);

  // get the average color of each cluster
  const colors = clusters.map((cluster) => {
    const r = cluster.reduce((acc, val) => acc + val[0], 0) / cluster.length;
    const g = cluster.reduce((acc, val) => acc + val[1], 0) / cluster.length;
    const b = cluster.reduce((acc, val) => acc + val[2], 0) / cluster.length;
    return [r, g, b];
  });

  return colors;
};


  return [palette, getColorPalette];
};

export default useGetPalette;
