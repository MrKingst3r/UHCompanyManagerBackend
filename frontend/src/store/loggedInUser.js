import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { loginUser, logoutUser } from '../api/api'; // import API calls
import jwt_decode from 'jwt-decode'; // import JSON Web Token decoder to decode the token into the user's information

//Notifications
const toast = useToast();

// Defining a store
export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: () => {
    return {
      name: '',
      role: '',
      isLoggedIn: false
    };
  },
  actions: {
    async login(username, password) {
      try {
        const token = await loginUser(username, password);

        // Get the user's name and role from the JWT token
        const decodedToken = jwt_decode(token);

        // Set user information directly
        this.$patch({
          isLoggedIn: true,
          role: decodedToken.role,
          name: decodedToken.name
        });
        this.$router.push('/');
        toast.success('Login Successful!');
      } catch (error) {
        toast.error(error.message);
      }
    },
    logout() {
      // Reset values after user log out
      this.$patch({
        name: '',
        role: '',
        isLoggedIn: false
      });
      this.$router.push('/');
      toast.info('You have been logged out!');
    }
  }
});
