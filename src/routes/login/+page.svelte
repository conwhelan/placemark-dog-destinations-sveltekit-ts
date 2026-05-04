<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
</script>

<!-- Login route page. The actual form is kept in a separate component. -->
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-black has-text-centered">Login to Dog Destinations</h3>
        <LoginForm />
      </div>
    </div>
  </div>
</section>