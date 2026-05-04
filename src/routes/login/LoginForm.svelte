<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedInUser } from '$lib/runes.svelte';
	import { dogDestinationService } from '$lib/services/dog-destination-service';
	import Message from '$lib/ui/Message.svelte';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';

	// Local form state for the login inputs.
	// These values are updated through the reusable UserCredentials component.
	let email = $state('');
	let password = $state('');
	let message = $state('');

	async function login() {
		console.log(`attempting to log in email: ${email}`);

		// Lab 19a now calls the frontend service, which talks to the HAPI API.
		const session = await dogDestinationService.login(email, password);

		if (session) {
			// Store the returned session details in the shared loggedInUser rune.
			loggedInUser.email = email;
			loggedInUser.name = session.name;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;

			console.log(`Session: ${JSON.stringify(session)}`);
			goto('/dashboard');
		} else {
			email = '';
			password = '';
			message = 'Invalid Credentials';
		}
	}
</script>

<div class="box">
	{#if message}
		<Message {message} />
	{/if}

	<!-- Reusable email/password fields shared by login and signup forms -->
	<UserCredentials bind:email bind:password />

	<button onclick={() => login()} class="button is-link is-fullwidth">Log In</button>
</div>
