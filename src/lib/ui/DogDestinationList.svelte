<script lang="ts">
	// List of dog destinations passed in from the dashboard page.
	// per Lab 19a pattern where a parent page passes API data into a display component.
	// imageDeleteEvent is an optional callback passed from the dashboard.
	let { dogDestinations = [], imageDeleteEvent = null } = $props();
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
						<div class="card-content pt-3">
							<button
								class="button is-danger is-light is-small"
								onclick={() => imageDeleteEvent && imageDeleteEvent(destination._id)}
							>
								Delete Image
							</button>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<p>No dog destinations found.</p>
{/if}
