import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default createStore({
  state() {
    let storedUser = null;
    try {
      storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    } catch (err) {
      storedUser = null;
    }

    return {
      user: storedUser,
      token: localStorage.getItem('token') || null
    };
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userRole: state => state.user?.role || null,
    currentUser: state => state.user
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const res = await axios.post(`${API_URL}/users/login`, credentials);
        commit('SET_USER', res.data.user);
        commit('SET_TOKEN', res.data.token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return res.data;
      } catch (err) {
        throw err.response?.data?.message || 'Login failed';
      }
    },
    async register({ commit }, userData) {
      try {
        const res = await axios.post(`${API_URL}/users/register`, userData);

        // If backend does NOT return token, skip commit SET_TOKEN
        if (res.data.token) {
          commit('SET_TOKEN', res.data.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        }

        if (res.data.user) commit('SET_USER', res.data.user);

        return res.data;
      } catch (err) {
        throw err.response?.data?.message || 'Registration failed';
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});
