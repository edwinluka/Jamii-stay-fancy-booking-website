<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div>
      <router-link to="/listings" class="font-bold text-lg">🏡 JAMII Stay</router-link>
    </div>

    <div class="space-x-4">
      <!-- Guest-only option -->
      <router-link
        v-if="isGuest"
        to="/listings"
        class="hover:underline"
      >
        Browse Listings
      </router-link>

      <!-- Host-only option -->
      <router-link
        v-if="isHost"
        to="/add-listing"
        class="hover:underline"
      >
        Add Listing
      </router-link>

      <!-- Auth links -->
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="hover:underline"
      >
        Login
      </router-link>
      <router-link
        v-if="!isAuthenticated"
        to="/register"
        class="hover:underline"
      >
        Register
      </router-link>

      <!-- Logout button -->
      <button
        v-if="isAuthenticated"
        @click="handleLogout"
        class="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isAuthenticated", "isGuest", "isHost"]),
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>
