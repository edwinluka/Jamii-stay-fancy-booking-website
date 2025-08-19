<template>
  <div class="max-w-4xl mx-auto mt-10 p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Search & Book Properties</h1>

    <!-- Search Form -->
    <div class="max-w-md mx-auto mb-8 p-6 bg-white rounded-xl shadow-lg flex flex-col space-y-4">
      <select v-model="search.location" class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500">
        <option value="">Select City</option>
        <option value="Nairobi">Nairobi</option>
        <option value="Mombasa">Mombasa</option>
        <option value="Kisumu">Kisumu</option>
        <option value="Nakuru">Nakuru</option>
      </select>

      <select v-model="search.type" class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500">
        <option value="">Select Property Type</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="villa">Villa</option>
        <option value="room">Room</option>
      </select>

      <input v-model="search.checkIn" type="date" placeholder="Check-in Date"
        class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <input v-model="search.checkOut" type="date" placeholder="Check-out Date"
        class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button @click="handleSearch"
        class="bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all duration-300">
        Search
      </button>
    </div>

    <!-- Listings Column -->
    <div class="flex flex-col space-y-6">
      <div v-for="listing in filteredListings" :key="listing._id" class="p-4 bg-white rounded-lg shadow-md">
        <img
          :src="listing.image ? `http://localhost:5000/uploads/${listing.image}` : 'https://via.placeholder.com/400x250?text=No+Image'"
          alt="listing"
          class="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 class="text-2xl font-bold mb-2">{{ listing.title }}</h2>
        <p class="text-gray-600 mb-1"><strong>City:</strong> {{ listing.location }}</p>
        <p class="text-gray-600 mb-1"><strong>Type:</strong> {{ listing.type }}</p>
        <p class="text-gray-700 mb-1"><strong>Description:</strong> {{ listing.description }}</p>
        <p class="text-gray-600 mb-1" v-if="listing.availabilityDates.length">
          <strong>Available:</strong>
          {{ formatDate(listing.availabilityDates[0]) }} - {{ formatDate(listing.availabilityDates[listing.availabilityDates.length - 1]) }}
        </p>
        <p class="text-gray-800 font-semibold mb-2"><strong>Price:</strong> ${{ listing.price }} / night</p>
        <router-link
          :to="`/booking/${listing._id}`"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Book Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListingsPage",
  data() {
    return {
      listings: [],
      search: {
        location: "",
        type: "",
        checkIn: "",
        checkOut: ""
      }
    };
  },
  computed: {
    filteredListings() {
      const { location, type } = this.search;
      return this.listings.filter(listing => {
        return (!location || listing.location === location) &&
               (!type || listing.type === type);
      });
    }
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:5000/api/listings");
      this.listings = res.data;
    } catch (err) {
      console.error("Failed to load listings", err);
    }
  },
  methods: {
    handleSearch() {
      // Computed automatically filters
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleDateString();
    }
  }
};
</script>
