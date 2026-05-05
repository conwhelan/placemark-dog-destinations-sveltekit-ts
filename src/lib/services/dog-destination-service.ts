import axios from "axios";
import { loggedInUser } from "$lib/runes.svelte";
import type { DogDestination, Session, User } from "$lib/types/dog-destination-types";

export const dogDestinationService = {
  // Base URL of the existing Dog Destinations HAPI API.
  baseUrl: "http://localhost:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.status === 201 || response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });

      if (response.data.success) {
        // Store the JWT as a Bearer token for later protected API requests.
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;

        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };

        this.saveSession(session, email);

        return session;
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  saveSession(session: Session, email: string) {
    // Store the logged-in user details in the shared rune.
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;

    // Store the session in browser localStorage so it survives page refresh.
    localStorage.dogDestinations = JSON.stringify(loggedInUser);
  },

  async getDogDestinations(token: string): Promise<DogDestination[]> {
    try {
      // Follow the Lab 19a pattern by setting the Bearer token before API data calls.
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const response = await axios.get(`${this.baseUrl}/api/dogdestinations`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};