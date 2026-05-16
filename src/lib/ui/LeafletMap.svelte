<script lang="ts">
	import { onMount } from 'svelte';
	import type { Control, Map as LeafletMap } from 'leaflet';

	// Height and mapId are passed in by the parent page so the map component can be reused.
	// A unique mapId is needed when more than one Leaflet map is rendered on the same page.
	let { height = 80, mapId = 'dog-destination-map-id' } = $props();

	// Default starting location for the map.
	// This is centred on Ireland, matching the Dog Destinations context.
	let location = { lat: 53.2734, lng: -7.7783203 };

	let zoom = 8;
	let minZoom = 7;
	let activeLayer = 'Terrain';

	let imap: LeafletMap;
	let control: Control.Layers;
	let overlays: Control.LayersObject = {};
	let layerGroups: Record<string, any> = {};
	let baseLayers: any;
	let L: any;

	onMount(async () => {
		// Leaflet is imported in onMount because Leaflet depends on the browser DOM.
		const leaflet = await import('leaflet');
		L = leaflet.default;

		// Explicitly set Leaflet marker asset paths for deployed Netlify builds.
		// The marker images are stored in static/images and served as /images/... in the browser.
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: '/images/marker-icon-2x.png',
			iconUrl: '/images/marker-icon.png',
			shadowUrl: '/images/marker-shadow.png'
		});

		// Base map layers. Terrain layer.
		baseLayers = {
			Terrain: leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 17,
				attribution:
					'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			})
		};

		const defaultLayer = baseLayers[activeLayer];

		// Create the Leaflet map object and attach it to the div with this component id.
		imap = leaflet.map(mapId, {
			center: [location.lat, location.lng],
			zoom: zoom,
			minZoom: minZoom,
			layers: [defaultLayer]
		});

		// Add the map layer control to the map.
		control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
	});

	// Creates a named overlay layer group that can be toggled in the Leaflet layer control.
	export function addLayerGroup(title: string) {
		if (!layerGroups[title]) {
			layerGroups[title] = L.layerGroup().addTo(imap);
			overlays[title] = layerGroups[title];

			// Refresh the layer control so the new category layer appears.
			control.remove();
			control = L.control.layers(baseLayers, overlays).addTo(imap);
		}
	}

	// Adds a marker to the map using destination latitude and longitude values.
	// The popup displays destination information when the marker is clicked.
	export async function addMarker(
		lat: number,
		lng: number,
		popupText: string,
		layerTitle: string = ''
	) {
		const leaflet = await import('leaflet');
		L = leaflet.default;

		const marker = L.marker([lat, lng]);

		const popup = L.popup({ autoClose: false, closeOnClick: false });

		popup.setContent(popupText);

		marker.bindPopup(popup);

		if (layerTitle && layerGroups[layerTitle]) {
			marker.addTo(layerGroups[layerTitle]);
		} else {
			marker.addTo(imap);
		}
	}

	// Moves the map view to a specific latitude and longitude.
	
	export async function moveTo(lat: number, lng: number) {
		const leaflet = await import('leaflet');
		L = leaflet.default;

		imap.flyTo([lat, lng]);
	}
</script>

<!-- Leaflet renders the interactive map inside this div -->
<div id={mapId} class="box" style="height: {height}vh"></div>
