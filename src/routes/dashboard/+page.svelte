<script lang="ts">
  import { onMount } from "svelte";
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { dogDestinationService } from "$lib/services/dog-destination-service";
  import { buildDestinationsByCategoryChart } from "$lib/services/analytics-utils";
  import Card from "$lib/ui/Card.svelte";
  import DogDestinationList from "$lib/ui/DogDestinationList.svelte";
  import type { DogDestination } from "$lib/types/dog-destination-types";

  // @ts-ignore
  import Chart from "svelte-frappe-charts";

  // This page updates the shared heading text shown by Heading.svelte.
  subTitle.text = "Dashboard";

  // Local dashboard state for dog destinations returned from the HAPI API.
  let dogDestinations = $state<DogDestination[]>([]);

  // Chart data summarising how many destinations exist in each category.
  let destinationsByCategory = $state({
    labels: [],
    datasets: [
      {
        name: "Destinations",
        values: []
      }
    ]
  });

  // Lab 19a / 21a pattern: when the page loads, request API data through the service layer.
  onMount(async () => {
    dogDestinations = await dogDestinationService.getDogDestinations(loggedInUser.token);

    // Prepare the raw API data into the format required by the chart component.
    destinationsByCategory = buildDestinationsByCategoryChart(dogDestinations);
  });

  async function deleteDestinationImage(id: string) {
    const success = await dogDestinationService.deleteImage(id, loggedInUser.token);

    if (success) {
      // Refresh the dashboard data so the deleted image disappears from the card.
      dogDestinations = await dogDestinationService.getDogDestinations(loggedInUser.token);
      destinationsByCategory = buildDestinationsByCategoryChart(dogDestinations);
    }
  }
</script>

<!-- Dashboard route displaying real dog destination data and a single analytics chart -->
<p class="mb-4">Welcome to your Dog Destinations dashboard.</p>

<Card title="Destinations by Category">
  <Chart data={destinationsByCategory} type="bar" />
</Card>

<Card title="Dog Destinations">
  <DogDestinationList {dogDestinations} imageDeleteEvent={deleteDestinationImage} />
</Card>