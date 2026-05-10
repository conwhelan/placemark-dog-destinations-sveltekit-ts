<script lang="ts">
  // Reusable Bulma card component.
  // The title is passed in by the parent page and the content is rendered inside the card.
  let { title = "", children } = $props();
</script>

<!-- Reusable card wrapper based on the Bulma card pattern used in the course labs -->
<div class="card mb-5">
  <header class="card-header">
    <p class="card-header-title">
      <span>{title}</span>
    </p>
  </header>

  <div class="card-content">
    <div class="content">
      {@render children()}
    </div>
  </div>
</div>