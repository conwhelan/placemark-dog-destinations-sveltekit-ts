<script lang="ts">
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";

  // Local form state for the signup inputs.
  // UserDetails updates firstName/lastName and UserCredentials updates email/password.
  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function signup() {
    // Real API signup will be added later when the service layer is introduced.
    const success = false;

    if (success) {
      message = "";
    } else {
      message = "Error trying to sign up";
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
