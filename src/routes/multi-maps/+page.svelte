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

	onMount(async () => {
		const dogDestinations = await dogDestinationService.getDogDestinations(loggedInUser.token);

		dogDestinations.forEach((destination: DogDestination) => {
			const popup = `
        <strong>${destination.name}</strong><br>
        ${destination.category.name}<br>
        ${destination.description}
      `;

			allDestinationsMap.addMarker(destination.latitude, destination.longitude, popup);
		});

		const latestDestination = dogDestinations[dogDestinations.length - 1];

		if (latestDestination) {
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

			latestDestinationMap.moveTo(latestDestination.latitude, latestDestination.longitude);
		}
	});
</script>

<div class="columns">
	<div class="column">
		<Card title="All Dog Destinations">
			<LeafletMap height={50} mapId="all-destinations-map" bind:this={allDestinationsMap} />
		</Card>
	</div>

	<div class="column">
		<Card title="Latest Dog Destination">
			<LeafletMap height={50} mapId="latest-destination-map" bind:this={latestDestinationMap} />
		</Card>
	</div>
</div>
