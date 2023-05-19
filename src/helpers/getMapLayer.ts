import { AnyLayer } from 'mapbox-gl';

const mapColors = ['#fed976', '#fd8d3c', '#F7642E', '#f03b20', '#bd0026'];

export default function getLayerConfig(tile: string): AnyLayer {
  return {
    id: 'events',
    type: 'circle',
    source: {
      type: 'vector',
      tiles: [tile],
    },
    'source-layer': 'aggs',
    paint: {
      // make circles larger as the user zooms from z12 to z22
      'circle-radius': {
        property: '_count',
        type: 'interval',
        // stops: [
        //   [0, 2],
        //   [5, 3],
        //   [10, 5],
        //   [100, 8],
        //   [1000, 12],
        // ],
        stops: [
          [0, 4],
          [5, 5],
          [10, 7],
          [100, 10],
          [1000, 14],
        ],
      },
      // color circles by ethnicity, using data-driven styles
      'circle-color': {
        property: '_count',
        type: 'interval',
        stops: [0, 10, 100, 1000, 10000].map((x, i) => [x, mapColors[i]]),
      },
      'circle-opacity': {
        property: '_count',
        type: 'interval',
        stops: [
          [0, 1],
          [10, 0.8],
          [100, 0.7],
          [1000, 0.6],
          [10000, 0.6],
        ],
      },
      'circle-stroke-color': mapColors[1],
      'circle-stroke-width': {
        property: '_count',
        type: 'interval',
        stops: [
          [0, 1],
          [10, 0],
        ],
      },
    },
  };
}
