<script lang="ts">
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  // Local form state for the login inputs.
  // These values are updated through the UserCredentials component.
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    // Real API login will vbe added later when the service layer is introduced.
    const success = false;

    if (success) {
      message = "";
    } else {
      message = "Error trying to log in";
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
