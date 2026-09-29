import { type ControlPosition, type IControl, type Map as MapboxMap } from 'mapbox-gl';
import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

class PortalControl implements IControl {
  private readonly container: HTMLDivElement;

  constructor(className?: string) {
    this.container = document.createElement('div');
    this.container.className = className ? `mapboxgl-ctrl ${className}` : 'mapboxgl-ctrl';
  }

  onAdd() {
    return this.container;
  }

  onRemove() {
    this.container.remove();
  }

  getDefaultPosition(): ControlPosition {
    return 'bottom';
  }

  getContainer() {
    return this.container;
  }
}

interface MapboxControlProps {
  map: MapboxMap | null;
  position?: ControlPosition;
  className?: string;
  children: ReactNode;
}

function MapboxControl({ map, position = 'bottom', className, children }: MapboxControlProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;

    const control = new PortalControl(className);
    map.addControl(control, position);
    setContainer(control.getContainer());

    return () => {
      setContainer(null);
      if (map.hasControl(control)) map.removeControl(control);
    };
  }, [map, position, className]);

  if (!container) return null;
  return createPortal(children, container);
}

export default MapboxControl;
