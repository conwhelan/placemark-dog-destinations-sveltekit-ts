// Shared subtitle used by pages to update the common heading.
export const subTitle = $state({ text: '' });

// Shared login state.
// Lab 19a extends this so the app can store the logged-in user's name, token and id.
export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});
