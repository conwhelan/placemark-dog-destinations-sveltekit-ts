<script lang="ts">
  // Message text is supplied by the parent form when feedback is needed.
  let { message } = $props();
</script>

<!-- Reusable message component for form feedback -->
<article class="message is-danger">
  <div class="message-body">
    {message}
  </div>
</article>
