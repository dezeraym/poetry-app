<template>
  <div class="container bg-dark text-white py-5">
    <h1 class="text-center mb-4">Poetry for the Soul</h1>
    <div class="text-center mb-4">
      <img src="path-to-your-image.jpg" alt="Poetry" class="img-fluid">
    </div>
    <hr class="mb-5">

    <form @submit.prevent="addPoem">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input v-model="newPoem.title" type="text" class="form-control" id="title" required>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Poem</label>
        <textarea v-model="newPoem.content" class="form-control" id="content" rows="3" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary mb-5">Add Poem</button>
    </form>

    <div class="row">
      <div class="col-md-6" v-for="(poem, index) in poems" :key="index">
        <div class="card mb-4" :style="{ backgroundColor: getRandomLightColor() }">
          <div class="card-body">
            <h5 class="card-title">{{ poem.title }}</h5>
            <p class="card-text">{{ poem.content.length > 100 ? poem.content.substring(0, 100) + '...' : poem.content }}</p>
            <button v-if="poem.content.length > 100" class="btn btn-link p-0" @click="showPoem(poem)">See more</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedPoem" class="modal fade" tabindex="-1" style="display: block; background: rgba(0,0,0,0.5);" @click="selectedPoem = null">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedPoem.title }}</h5>
            <button type="button" class="btn-close" @click="selectedPoem = null"></button>
          </div>
          <div class="modal-body">
            <p>{{ selectedPoem.content }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedPoem = null">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      newPoem: {
        title: '',
        content: ''
      },
      poems: [],
      selectedPoem: null
    };
  },
  methods: {
    async addPoem() {
      const response = await axios.post('http://localhost:3000/api/poems', this.newPoem);
      this.poems.push(response.data);
      this.newPoem.title = '';
      this.newPoem.content = '';
    },
    async fetchPoems() {
      const response = await axios.get('http://localhost:3000/api/poems');
      this.poems = response.data;
    },
    getRandomLightColor() {
      const letters = 'BCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    },
    showPoem(poem) {
      this.selectedPoem = poem;
    }
  },
  async created() {
    await this.fetchPoems();
  }
};
</script>

<style>
body {
  background-color: #121212;
  color: white;
}

.card {
  color: black;
}
</style>
