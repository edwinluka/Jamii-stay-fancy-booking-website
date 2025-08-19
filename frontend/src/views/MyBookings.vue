<template>
  <div class="my-bookings max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4 text-center">My Bookings</h2>

    <div v-if="bookings.length === 0" class="text-center text-gray-500">
      You have no bookings yet.
    </div>

    <div v-else>
      <div
        v-for="booking in bookings"
        :key="booking._id"
        class="border p-4 mb-4 rounded hover:shadow"
      >
        <h3 class="font-semibold">{{ booking.listing.title }}</h3>
        <p>City: {{ booking.listing.location }}</p>
        <p>
          Dates: {{ formatDate(booking.checkIn) }} - {{ formatDate(booking.checkOut) }}
        </p>
        <p>Nights: {{ booking.nights }}</p>
        <p>Total Price: ${{ booking.totalPrice }}</p>
        <p>Status: {{ booking.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const bookings = ref([]);

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/bookings/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        bookings.value = res.data;
      } catch (err) {
        console.error('Fetch bookings error:', err);
        alert('Failed to load bookings');
      }
    };

    const formatDate = (date) => new Date(date).toLocaleDateString();

    onMounted(fetchBookings);

    return { bookings, formatDate };
  },
};
</script>
