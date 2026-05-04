<script lang="ts">
  // These values are passed in from the signup form.
  // $bindable lets this component update the parent form state.
  let { firstName = $bindable(""), lastName = $bindable("") } = $props();
</script>

<!-- Reusable first name / last name fields for signup -->
<label class="label" for="firstName">Name</label>

<div class="field is-horizontal">
  <div class="field-body">
    <div class="field">
      <div class="control has-icons-left">
        <input
          id="firstName"
          bind:value={firstName}
          class="input"
          type="text"
          placeholder="First Name"
          name="firstName"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-id-card"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="control has-icons-left">
        <input
          id="lastName"
          bind:value={lastName}
          class="input"
          type="text"
          placeholder="Last Name"
          name="lastName"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-id-card"></i>
        </span>
      </div>
    </div>
  </div>
</div>
