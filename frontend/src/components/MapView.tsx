import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface MarkerItem {
  id: number;
  lat: number;
  lng: number;
  label: string;
  onClick?: () => void;
}

interface Props {
  center: [number, number];
  zoom?: number;
  markers: MarkerItem[];
}

export default function MapView({ center, zoom = 13, markers }: Props) {
  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-secondary-300 bg-white">
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: () => marker.onClick?.(),
            }}
          >
            <Popup>
              <div className="space-y-2">
                <p className="font-semibold">{marker.label}</p>
                {marker.onClick ? (
                  <button
                    type="button"
                    onClick={marker.onClick}
                    className="rounded bg-primary-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    View Details
                  </button>
                ) : null}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
