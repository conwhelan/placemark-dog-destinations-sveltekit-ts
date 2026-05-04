<!-- Common layout shared by all pages/routes -->
<div class="container">
  <!-- Basic navigation links for the starter routes -->
  <div class="tabs notification is-primary">
    <ul>
      <li><a href="/">Start</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Signup</a></li>
    </ul>
  </div>

  <!-- The current route/page is rendered here -->
  <slot />
</div>