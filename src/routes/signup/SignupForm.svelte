<script lang="ts">
	import { goto } from '$app/navigation';
	import { dogDestinationService } from '$lib/services/dog-destination-service';
	import Message from '$lib/ui/Message.svelte';
	import UserCredentials from '$lib/ui/UserCredentials.svelte';
	import UserDetails from '$lib/ui/UserDetails.svelte';
	import type { User } from '$lib/types/dog-destination-types';

	// Local form state for the signup inputs.
	// UserDetails updates firstName/lastName and UserCredentials updates email/password.
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let message = $state('');

	async function signup() {
		// Build a user object matching the HAPI API's expected signup payload.
		const user: User = {
			firstName,
			lastName,
			email,
			password
		};

		// Lab 19a uses the frontend service to call the HAPI users API.
		const success = await dogDestinationService.signup(user);

		if (success) {
			goto('/login');
		} else {
			message = 'Error trying to sign up';
		}
	}
</script>

<div class="box">
	{#if message}
		<Message {message} />
	{/if}

	<!-- Reusable name fields for signup -->
	<UserDetails bind:firstName bind:lastName />

	<!-- Reusable email/password fields shared by signup and login -->
	<UserCredentials bind:email bind:password />

	<button onclick={() => signup()} class="button is-success is-fullwidth">Sign Up</button>
</div>
