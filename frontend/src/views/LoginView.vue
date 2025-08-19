<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block font-medium">Email</label>
        <input v-model="email" type="email" required class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block font-medium">Password</label>
        <input v-model="password" type="password" required class="w-full border p-2 rounded" />
      </div>

      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>

    <p class="mt-4 text-sm text-center">
      Don’t have an account?
      <router-link to="/register" class="text-blue-600">Register</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      this.error = null;
      try {
        const res = await this.login({ email: this.email, password: this.password });

        // role-based redirect
        if (res.user.role === "host") {
          this.$router.push("/add-listing");
        } else if (res.user.role === "guest") {
          this.$router.push("/listings");
        } else {
          this.$router.push("/"); // fallback
        }
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
