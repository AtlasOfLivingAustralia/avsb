import type { LayerSpecification, SourceSpecification } from 'mapbox-gl';

const mapColors = ['#fed976', '#fd8d3c', '#F7642E', '#f03b20', '#bd0026'];

interface MapLayerConfig {
  source: SourceSpecification;
  layer: LayerSpecification;
}

export default function getLayerConfig(tile: string): MapLayerConfig {
  return {
    source: {
      type: 'vector',
      tiles: [tile],
    },
    layer: {
      id: 'events',
      type: 'circle',
      source: 'events',
      'source-layer': 'aggs',
      paint: {
        // make circles larger as the user zooms from z12 to z22
        'circle-radius': ['step', ['get', '_count'], 4, 5, 5, 10, 7, 100, 10, 1000, 14],
        // color circles by ethnicity, using data-driven styles
        'circle-color': [
          'step',
          ['get', '_count'],
          mapColors[0],
          10,
          mapColors[1],
          100,
          mapColors[2],
          1000,
          mapColors[3],
          10000,
          mapColors[4],
        ],
        'circle-opacity': ['step', ['get', '_count'], 1, 10, 0.8, 100, 0.7, 1000, 0.6, 10000, 0.6],
        'circle-stroke-color': mapColors[1],
        'circle-stroke-width': ['step', ['get', '_count'], 1, 10, 0],
      },
    },
  };
}
