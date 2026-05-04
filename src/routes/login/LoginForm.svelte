<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  // Local form state for the login inputs.
  // These values are updated through the reusable UserCredentials component.
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    // Temporarily forces login success (per lab 18b)
    // This proves that the shared loggedInUser rune can control the app layout.
    const success = true;

    if (success) {
      loggedInUser.email = email;
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
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
