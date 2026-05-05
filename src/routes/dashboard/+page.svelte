<script lang="ts">
	import { onMount } from 'svelte';
	import { loggedInUser, subTitle } from '$lib/runes.svelte';
	import { dogDestinationService } from '$lib/services/dog-destination-service';
	import DogDestinationList from '$lib/ui/DogDestinationList.svelte';
	import type { DogDestination } from '$lib/types/dog-destination-types';

	// This page updates the shared heading text shown by Heading.svelte.
	subTitle.text = 'Dashboard';

	// Local dashboard state for dog destinations returned from the HAPI API.
	let dogDestinations = $state<DogDestination[]>([]);

	// Lab 19a pattern: when the page loads, request API data through the service layer.
	onMount(async () => {
		dogDestinations = await dogDestinationService.getDogDestinations(loggedInUser.token);
	});
</script>

<!-- Dashboard route displaying real dog destination data from the HAPI API -->
<p class="mb-4">Welcome to your Dog Destinations dashboard.</p>

<DogDestinationList {dogDestinations} />
