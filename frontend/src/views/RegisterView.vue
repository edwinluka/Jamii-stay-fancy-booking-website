<template>
  <div class="max-w-md mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg">
    <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">Register</h2>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block font-medium mb-1">Name</label>
        <input v-model="name" type="text" required class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <div>
        <label class="block font-medium mb-1">Email</label>
        <input v-model="email" type="email" required class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <div>
        <label class="block font-medium mb-1">Password</label>
        <input v-model="password" type="password" required class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <div>
        <label class="block font-medium mb-1">Role</label>
        <select v-model="role" required class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="" disabled>Select Role</option>
          <option value="guest">Guest</option>
          <option value="host">Host</option>
        </select>
      </div>

      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

      <button type="submit" class="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 text-lg font-semibold">
        Register
      </button>
    </form>

    <p class="mt-4 text-center text-sm">
      Already have an account?
      <router-link to="/login" class="text-blue-600 font-medium">Login</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "",
      error: null,
    };
  },
  methods: {
    ...mapActions(["register"]),
    async handleRegister() {
      this.error = null;
      try {
        const res = await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        });

        // Redirect based on role
        if (res.user.role === "host") {
          this.$router.push("/add-listing");
        } else {
          this.$router.push("/listings");
        }
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
