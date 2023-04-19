export const getDominantColors = (imageData) => {
  const colors = { red: 0, green: 0, blue: 0, count: 0 };

  for (let i = 0; i < imageData.data.length; i += 4) {
    colors.red += imageData.data[i];
    colors.green += imageData.data[i + 1];
    colors.blue += imageData.data[i + 2];
    colors.count++;
  }

  colors.red = Math.floor(colors.red / colors.count);
  colors.green = Math.floor(colors.green / colors.count);
  colors.blue = Math.floor(colors.blue / colors.count);

  return [colors.red, colors.green, colors.blue];
};