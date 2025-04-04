
import React from 'react';

export function useMapStyles() {
  React.useEffect(() => {
    // Add Mapbox CSS
    const mapboxCss = document.createElement('link');
    mapboxCss.rel = 'stylesheet';
    mapboxCss.href = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css';
    document.head.appendChild(mapboxCss);

    // CSS for custom markers
    const style = document.createElement('style');
    style.textContent = `
      .custom-marker {
        width: 32px;
        height: 32px;
        cursor: pointer;
      }
      .custom-marker svg {
        transform: translate(-16px, -32px);
      }
      .mapboxgl-map {
        border-radius: 0.5rem;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(mapboxCss)) document.head.removeChild(mapboxCss);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);
}
