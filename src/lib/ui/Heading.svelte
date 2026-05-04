<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
</script>

<!-- Shared heading for pages when logged-in -->
<section class="hero is-link is-small mt-6 mb-6">
  <div class="hero-body">
    <div class="container">
      <h1 class="title has-text-centered">
        {subTitle.text}
      </h1>
    </div>
  </div>
</section>
