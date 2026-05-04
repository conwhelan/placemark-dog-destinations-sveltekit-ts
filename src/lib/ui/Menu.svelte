<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<!-- Navigation menu shown to the logged in user -->
<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/dashboard">
        <span class="icon mr-2">
          <i class="fas fa-map-marker-alt"></i>
        </span>
        <span><strong>Dog Destinations</strong></span>
      </a>
    </div>

    <!-- Logged-in navigation, matching my original HAPI app structure to get started -->
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/dashboard">Dashboard</a>
        <a class="navbar-item" href="/logout">Logout [{loggedInUser.email}]</a>
      </div>
    </div>
  </div>
</nav>
