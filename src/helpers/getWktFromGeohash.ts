function tile2long(x: number, z: number) {
  return (x / 2 ** z) * 360 - 180;
}
function tile2lat(y: number, z: number) {
  const n = Math.PI - (2 * Math.PI * y) / 2 ** z;
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}
function getBboxFromFeature(str: string) {
  const [zStr, xStr, yStr] = str.split('/');
  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);
  const z = parseInt(zStr, 10);

  return {
    N: tile2lat(y, z).toString(),
    S: tile2lat(y + 1, z).toString(),
    E: tile2long(x + 1, z).toString(),
    W: tile2long(x, z).toString(),
  };
}

const wktBBoxTemplate = '((W S,E S,E N,W N,W S))';

export default function getWktFromGeohash(geohash: string) {
  const { N, S, E, W } = getBboxFromFeature(geohash);

  // Populate the wktBBoxTemplate string
  return `POLYGON${wktBBoxTemplate
    .replace(/N/g, N)
    .replace(/S/g, S)
    .replace(/W/g, W)
    .replace(/E/g, E)}`;
}
