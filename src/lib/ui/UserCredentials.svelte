<script lang="ts">
  // These values are passed in from the parent form.
  // $bindable allows the child inputs to update the parent variables.
  let { email = $bindable(""), password = $bindable("") } = $props();
</script>

<!-- Reusable email/password input fields for login and signup forms -->
<div class="field">
  <label class="label" for="email">Email</label>
  <div class="control has-icons-left">
    <input
      id="email"
      bind:value={email}
      class="input"
      type="text"
      placeholder="Email"
      name="email"
    />
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label" for="password">Password</label>
  <div class="control has-icons-left">
    <input
      id="password"
      bind:value={password}
      class="input"
      type="password"
      placeholder="Password"
      name="password"
    />
    <span class="icon is-small is-left">
      <i class="fa fa-key"></i>
    </span>
  </div>
</div>
