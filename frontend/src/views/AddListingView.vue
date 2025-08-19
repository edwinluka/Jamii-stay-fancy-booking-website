<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-6 text-center">Add New Property</h2>

    <form @submit.prevent="handleAddListing" class="space-y-4">
      <div>
        <label>Title</label>
        <input v-model="title" type="text" required class="w-full border p-2 rounded"/>
      </div>

      <div>
        <label>Description</label>
        <textarea v-model="description" required class="w-full border p-2 rounded"></textarea>
      </div>

      <div>
        <label>Location</label>
        <input v-model="location" type="text" required class="w-full border p-2 rounded"/>
      </div>

      <div>
        <label>Property Type</label>
        <input v-model="type" type="text" required class="w-full border p-2 rounded"/>
      </div>

      <div>
        <label>Price per Night</label>
        <input v-model.number="price" type="number" required class="w-full border p-2 rounded"/>
      </div>

      <div>
        <label>Available Dates</label>
        <input v-model="startDate" type="date" required class="border p-2 rounded"/>
        <input v-model="endDate" type="date" required class="border p-2 rounded ml-2"/>
      </div>

      <div>
        <label>Image</label>
        <input type="file" @change="handleFileChange" accept="image/*" class="w-full"/>
      </div>

      <p v-if="error" class="text-red-600">{{ error }}</p>
      <button type="submit" class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Add Property
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddListingView',
  data() {
    return {
      title: '',
      description: '',
      location: '',
      type: '',
      price: 0,
      startDate: '',
      endDate: '',
      imageFile: null,
      error: null
    };
  },
  methods: {
    handleFileChange(e) {
      this.imageFile = e.target.files[0];
    },
    async handleAddListing() {
      this.error = null;
      try {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('location', this.location);
        formData.append('type', this.type);
        formData.append('price', this.price);
        formData.append('startDate', this.startDate);
        formData.append('endDate', this.endDate);
        if (this.imageFile) formData.append('image', this.imageFile);

        await axios.post('http://localhost:5000/api/listings', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert('Property added successfully!');
        this.$router.push('/listings');
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to add property';
      }
    }
  }
};
</script>
