"use client";

import { memo, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
} from "@react-google-maps/api";
import AutoCompleteComponent from "./AutoComplete";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
const options = {
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
};
const libraries: ("drawing" | "places")[] = ["drawing", "places"];
const Map = memo(function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: libraries,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <AutoCompleteComponent map={map} />
      <GoogleMap
        options={options}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {map && (
          <DrawingManager
            options={{
              drawingControl: true,

              drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.CIRCLE],
              },
              circleOptions: {
                fillColor: "#3b82f6",
                fillOpacity: 0.5,
                strokeWeight: 1,
                clickable: false,

                editable: true,

                zIndex: 1,
              },
            }}
            onLoad={(drawingManager) => drawingManager.setMap(map)}
          />
        )}
      </GoogleMap>
    </>
  ) : (
    <p>is loading</p>
  );
});

export default Map;
