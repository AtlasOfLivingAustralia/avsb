export const drawStyles = [
  // --- POLYGON FILL (INACTIVE) ---
  {
    id: 'gl-draw-polygon-fill-inactive',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'false']],
    paint: {
      'fill-color': '#228be6',
      'fill-opacity': 0.2,
      'fill-emissive-strength': 1.0,
    },
  },

  // --- POLYGON FILL (ACTIVE / BEING DRAWN) ---
  {
    id: 'gl-draw-polygon-fill-active',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'true']],
    paint: {
      'fill-color': '#228be6',
      'fill-opacity': 0.2,
      'fill-emissive-strength': 1.0,
    },
  },

  // --- POLYGON OUTLINE (INACTIVE) ---
  {
    id: 'gl-draw-polygon-stroke-inactive',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'false']],
    paint: {
      'line-color': '#228be6',
      'line-width': 2,
      'line-dasharray': [2, 2],
      'line-emissive-strength': 1.0,
    },
  },

  // --- POLYGON OUTLINE (ACTIVE) ---
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'active', 'true']],
    paint: {
      'line-color': '#228be6',
      'line-width': 2,
      'line-dasharray': [2, 2],
      'line-emissive-strength': 1.0,
    },
  },
  // --- LINE USED WHILE DRAWING (THIS IS YOUR “FIRST EDGE”) ---
  {
    id: 'gl-draw-line-active',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
    paint: {
      'line-color': '#228be6',
      'line-width': 2,
      'line-dasharray': [2, 2],
      'line-emissive-strength': 1.0,
    },
  },
  {
    id: 'gl-draw-line-inactive',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'false']],
    paint: {
      'line-color': '#228be6',
      'line-width': 2,
      'line-dasharray': [2, 2],
      'line-emissive-strength': 1.0,
    },
  },

  // --- VERTICES (POINTS) ---
  {
    id: 'gl-draw-polygon-and-line-vertex-halo-inactive',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'active', 'false']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#ffffff',
    },
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-inactive',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'active', 'false']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#228be6',
      'circle-emissive-strength': 1.0,
    },
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-halo-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'active', 'true']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#ffffff',
    },
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', 'active', 'true']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#228be6',
      'circle-emissive-strength': 1.0,
    },
  },
];
