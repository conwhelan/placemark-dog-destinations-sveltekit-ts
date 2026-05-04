<script lang="ts">
	import { browser } from '$app/environment';
	import { loggedInUser } from '$lib/runes.svelte';
	import Heading from '$lib/ui/Heading.svelte';
	import Menu from '$lib/ui/Menu.svelte';

	// Lab 19b restores the saved browser session when the app reloads.
	// The browser check prevents localStorage being accessed during server-side rendering.
	if (browser) {
		const savedLoggedInUser = localStorage.dogDestinations;

		if (savedLoggedInUser) {
			const session = JSON.parse(savedLoggedInUser);

			loggedInUser.email = session.email;
			loggedInUser.name = session.name;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;
		}
	}
</script>

<!-- Shared layout for the SvelteKit app -->
<div class="container">
	{#if loggedInUser.email}
		<!-- Logged-in users see the app menu and page heading -->
		<Menu />
		<Heading />
	{/if}

	<!-- The current route/page is rendered here -->
	<slot />
</div>
