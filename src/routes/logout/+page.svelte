<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedInUser } from '$lib/runes.svelte';

	// lears the temporary logged-in user state.
	// TODO later updates to also clear localStorage.
	loggedInUser.email = '';

	goto('/');
</script>
