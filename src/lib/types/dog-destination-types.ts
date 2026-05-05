// Session returned by the HAPI API after a successful login.
// It stores the user name, database id and JWT token.
export interface Session {
  name: string;
  _id: string;
  token: string;
}

// Backend IdSpec allows IDs to be either a string or object.
// In the frontend, most IDs are treated as strings once received from the API.
export type Id = string | object;


// User shape used for signup and authentication requests.
// This mirrors the UserSpec in teh backend Joi schema.
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin?: boolean;
  _id?: string;
  __v?: number;
}

// Dog Destination shape returned by the HAPI API.
// This mirrors the DogDestinationSpec in the backend Joi schema.
export interface DogDestination {
  name: string;
  category: string | { name?: string; _id?: string };
  description: string;
  latitude: number;
  longitude: number;
  userid?: string;
  _id?: string;
}