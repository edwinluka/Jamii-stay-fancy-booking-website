<template>
  <div class="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6">
    <!-- Top Section: Welcome Message -->
    <div class="mt-20 text-center">
      <h1 class="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
        WELCOME TO JAMII STAY BOOKING WEBSITE
      </h1>
      <p class="text-white text-xl md:text-2xl mb-8 leading-relaxed drop-shadow">
        Discover your perfect home away from home. Whether you're traveling for business, leisure, or a quick getaway, we make finding and booking your ideal stay effortless.
        <br /><br />
        Explore our curated listings, enjoy seamless booking, and experience comfort wherever you go.
      </p>
    </div>

    <!-- Bottom Section: Buttons -->
    <div class="flex justify-center mb-16 space-x-8">
      <router-link
        to="/login"
        class="px-10 py-4 bg-red-600 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
      >
        Login
      </router-link>
      <router-link
        to="/register"
        class="px-10 py-4 bg-red-500 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
      >
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
