// Session returned by the HAPI API after a successful login.
// It stores the user name, database id and JWT token.
export interface Session {
  name: string;
  _id: string;
  token: string;
}

// User shape used for signup and authentication requests.
// This mirrors the user fields used by the HAPI backend.
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}
