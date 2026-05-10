<script lang="ts">
  import type { DogDestination } from "$lib/types/dog-destination-types";

  // List of dog destinations passed in from the dashboard page.
  let { dogDestinations = [] } = $props();
</script>

<!-- Displays dog destinations returned from the HAPI API -->
{#if dogDestinations.length > 0}
  <table class="table is-fullwidth is-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Description</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>

    <tbody>
      {#each dogDestinations as destination}
        <tr>
          <td>{destination.name}</td>
          <td>{destination.category.name}</td>
          <td>{destination.description}</td>
          <td>{destination.latitude}</td>
          <td>{destination.longitude}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>No dog destinations found.</p>
{/if}
