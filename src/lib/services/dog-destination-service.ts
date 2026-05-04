import axios from "axios";
import type { Session, User } from "$lib/types/dog-destination-types";

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

        return session;
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
