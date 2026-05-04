<script lang="ts">
	import SignupForm from './SignupForm.svelte';
</script>

<!-- Signup route page. The actual form is kept in a separate component (SignupForme.svelte). -->
<section class="hero is-fullheight">
	<div class="hero-body">
		<div class="container">
			<div class="column is-4 is-offset-4">
				<h3 class="title has-text-black has-text-centered">Sign up for Dog Destinations</h3>
				<SignupForm />
			</div>
		</div>
	</div>
</section>
