<script lang="ts">
  import { onMount } from "svelte";
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { dogDestinationService } from "$lib/services/dog-destination-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import type { DogDestination } from "$lib/types/dog-destination-types";

  // Updates the shared page heading shown in Heading.svelte.
  subTitle.text = "Dog Destinations Maps";

  // Reference to the LeafletMap component so exported map functions can be called.
  let map: LeafletMap;

  onMount(async () => {
    // Retrieve dog destinations from the HAPI API using the logged-in JWT token.
    const dogDestinations = await dogDestinationService.getDogDestinations(loggedInUser.token);

    // First create one Leaflet layer group for each category.
    dogDestinations.forEach((destination: DogDestination) => {
      map.addLayerGroup(destination.category.name);
    });

    // Then add each marker to its matching category layer.
    dogDestinations.forEach((destination: DogDestination) => {
      const popup = `
        <strong>${destination.name}</strong><br>
        ${destination.category.name}<br>
        ${destination.description}
      `;

      map.addMarker(
        destination.latitude,
        destination.longitude,
        popup,
        destination.category.name
      );
    });
  });
</script>

<!-- Map route displaying dog-friendly destinations geographically -->
<Card title="Dog-Friendly Locations by Category">
  <LeafletMap height={60} bind:this={map} />
</Card>