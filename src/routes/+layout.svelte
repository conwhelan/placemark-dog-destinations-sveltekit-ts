<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
</script>

<!-- Shared layout for the SvelteKit app -->
<div class="container">
  {#if loggedInUser.email}
    <!-- Logged-in users see the app menu and page heading -->
    <Menu />
    <Heading />
  {/if}

  <!-- The current page is rendered here -->
  <slot />
</div>