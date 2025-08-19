<template>
  <div class="booking-page max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4 text-center">{{ listing.title }}</h2>

    <img
      :src="listing.image ? `http://localhost:5000/uploads/${listing.image}` : ''"
      alt="listing"
      class="w-full h-64 object-cover rounded-lg mb-4"
    />

    <p class="mb-2 font-semibold">City: {{ listing.location || 'N/A' }}</p>
    <p class="mb-4">{{ listing.description }}</p>

    <!-- ✅ Date picker fixed -->
    <vue-datepicker 
      v-model="dates" 
      range
      placeholder="Select check-in & check-out"
      :min-date="new Date()" 
      :max-date="maxDate" 
    />

    <div class="mt-4">
      <p>Nights: {{ nights }}</p>
      <p>Price per Night: ${{ listing.price }}</p>
      <p>Total Price: ${{ totalPrice }}</p>
    </div>

    <button
      @click="confirmBooking"
      class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Confirm Booking
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import VueDatepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { VueDatepicker },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const listing = ref({});
    const dates = ref([null, null]); // [checkIn, checkOut]

    // ✅ Nights calculation
    const nights = computed(() => {
      if (!dates.value[0] || !dates.value[1]) return 0;
      const diff =
        (new Date(dates.value[1]) - new Date(dates.value[0])) /
        (1000 * 60 * 60 * 24);
      return diff > 0 ? diff : 0;
    });

    // ✅ Total price
    const totalPrice = computed(
      () => nights.value * (listing.value.price || 0)
    );

    // ✅ Set max booking window (1 year ahead)
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    // ✅ Fetch listing details
    const fetchListing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/listings/${route.params.id}`
        );
        listing.value = res.data;
      } catch (err) {
        console.error("Get listing error:", err);
        alert("Failed to load listing");
      }
    };

    // ✅ Confirm booking
    const confirmBooking = async () => {
      if (!dates.value[0] || !dates.value[1]) {
        alert("Please select check-in and check-out dates");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to book");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/bookings",
          {
            listingId: route.params.id,
            checkIn: dates.value[0],
            checkOut: dates.value[1],
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Booking confirmed!");
        router.push("/my-bookings"); // redirect to MyBookings page
      } catch (err) {
        console.error("Booking error:", err);
        alert(err.response?.data?.message || "Booking failed");
      }
    };

    onMounted(fetchListing);

    return { listing, dates, nights, totalPrice, confirmBooking, maxDate };
  },
};
</script>
