<template>
  <div class="listing-card">
    <h3>{{ title || "Sample Listing" }}</h3>
    <p>{{ description || "Description goes here" }}</p>
    <p>Price: ${{ price || 0 }}</p>
  </div>
</template>

<script>
export default {
  name: "Listing",
  props: {
    title: String,
    description: String,
    price: Number
  }
};
</script>

<style scoped>
.listing-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>
