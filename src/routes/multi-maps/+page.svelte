<script lang="ts">
	import { onMount } from 'svelte';
	import { loggedInUser, subTitle } from '$lib/runes.svelte';
	import { dogDestinationService } from '$lib/services/dog-destination-service';
	import Card from '$lib/ui/Card.svelte';
	import LeafletMap from '$lib/ui/LeafletMap.svelte';
	import type { DogDestination } from '$lib/types/dog-destination-types';

	subTitle.text = 'Multiple Dog Destination Maps';

	let allDestinationsMap: LeafletMap;
	let latestDestinationMap: LeafletMap;
	let latestDestinationName = $state('Latest Dog Destination');

	onMount(async () => {
		const dogDestinations = await dogDestinationService.getDogDestinations(loggedInUser.token);

		// Create the Category layer on the main map for each Dog Destination category.
		// Preveserves map Layers based on Categories.
		dogDestinations.forEach((destination: DogDestination) => {
			allDestinationsMap.addLayerGroup(destination.category.name);
		});

		// Then, add all destination markers to their matching Category Layer.
		dogDestinations.forEach((destination: DogDestination) => {
			const popup = `
        <strong>${destination.name}</strong><br>
        ${destination.category.name}<br>
        ${destination.description}
      `;

			allDestinationsMap.addMarker(
				destination.latitude,
				destination.longitude,
				popup,
				destination.category.name
			);
		});

		// 2nd map highlights the latest destination only.
		// Added for Level 3: Multiple Maps on a single page.
		const latestDestination = dogDestinations[dogDestinations.length - 1];

		if (latestDestination) {
			latestDestinationName = `Latest Dog Destination: ${latestDestination.name}`;
			const popup = `
        <strong>${latestDestination.name}</strong><br>
        ${latestDestination.category.name}<br>
        ${latestDestination.description}
      `;

			latestDestinationMap.addMarker(
				latestDestination.latitude,
				latestDestination.longitude,
				popup
			);
			//focus the map on the latest destination coords
			latestDestinationMap.moveTo(latestDestination.latitude, latestDestination.longitude);
		}
	});
</script>

<Card title="All Dog Destinations by Category">
	<LeafletMap height={45} mapId="all-destinations-map" bind:this={allDestinationsMap} />
</Card>

<Card title={latestDestinationName}>
	<LeafletMap height={45} mapId="latest-destination-map" bind:this={latestDestinationMap} />
</Card>
