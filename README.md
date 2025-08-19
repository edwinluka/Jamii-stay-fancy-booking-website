# JAMII Stay – Fancy Booking Website

An Airbnb-style booking system built with Vue.js (frontend) and Node.js (backend). Guests can search and book listings, while hosts can manage their properties.

## Features
- Role-based authentication (guest & host)
- Property listings with images, price, location
- Date-range booking and availability checks
- Prevents double-booking
- Responsive UI for seamless UX

## Technologies Used
- **Frontend:** Vue.js, @vuepic/vue-datepicker
- **Backend:** Node.js, Express.js, MongoDB/Mongoose
- **Authentication:** JWT-based role handling

## Setup Instructions
```bash
# Clone the project
git clone https://github.com/edwinluka/Jamii-stay-fancy-booking-website.git

# Backend setup
cd Jamii-stay-fancy-booking-website/backend
npm install
npm start

# Frontend setup
cd ../frontend
npm install
npm run serve

