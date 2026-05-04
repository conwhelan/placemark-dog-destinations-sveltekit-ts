<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { loggedInUser } from '$lib/runes.svelte';

	// Clear the shared logged-in user state.
	loggedInUser.email = '';
	loggedInUser.name = '';
	loggedInUser.token = '';
	loggedInUser._id = '';

	// localStorage only exists in the browser, not during server-side rendering.
	if (browser) {
		localStorage.removeItem('dogDestinations');
	}

	goto('/');
</script>
