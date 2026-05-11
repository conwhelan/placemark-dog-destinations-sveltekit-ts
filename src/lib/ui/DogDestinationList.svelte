<script lang="ts">
  // List of dog destinations passed in from the dashboard page.
  // per Lab 19a pattern where a parent page passes API data into a display component.
  let { dogDestinations = [] } = $props();
</script>

<!-- Displays dog destinations returned from the HAPI API -->
{#if dogDestinations.length > 0}
  <div class="columns is-multiline">
    {#each dogDestinations as destination}
      <div class="column is-one-third">
        <div class="card">
          {#if destination.img}
            <!-- Cloudinary image URL stored in the Dog Destination record -->
            <div class="card-image">
              <figure class="image is-4by3">
                <img src={destination.img} alt={`Image for ${destination.name}`} />
              </figure>
            </div>
          {/if}

          <div class="card-content">
            <p class="title is-5">{destination.name}</p>

            <span class="tag is-link is-light">
              {destination.category.name}
            </span>

            <p class="mt-3">{destination.description}</p>

            <p class="is-size-7 has-text-grey mt-3">
              📍 {destination.latitude}, {destination.longitude}
            </p>
          </div>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p>No dog destinations found.</p>
{/if}