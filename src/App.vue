<template>
  <div id="app">
    <div class="container mt-5">
      <div>
        <img class="logo d-block m-auto" src="./assets/logo.png" alt="">
      </div>
      <h1 class="text-center mb-4">Vue Image Search</h1>
      <form @submit.prevent="onSubmit()">
        <div class="form-group">
          <div class="row">
            <div class="col-lg-6">
              <label for="searchTerm">Search</label>
              <input class="form-control form-control-large"
                  v-model="searchTerm"
                  placeholder="Search"
                  type="text"
                  name="searchTerm"
                  id="search"
              >
            </div>
            <div class="col-lg-3">
              <label for="searchPageSize">Results per Page (max 50)</label>
              <input class="form-control"
                v-model.number="searchPageSize"
                @blur="updateValue()"
                type="text"
                name="searchPageSize"
                id="searchPageSize"
              >
            </div>
            <div class="col-lg-3">
              <label for="searchPages">Number of Pages</label>
              <input class="form-control"
                v-model.number="searchPages"
                type="text"
                name="searchPages"
                id="searchPages"
              >
            </div>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-block">Search</button>
        </div>
      </form>
    </div>
    <div v-if="loading" class="text-center mt-3">
      <img src="https://i.imgur.com/4FO9toe.gif" alt="loading">
    </div>
    <section class="images-section mt-3">
      <img class="img" v-for="image in displayedImages" :key="image.url" :src="image.url" alt="">
    </section>
    <nav class="container">
      <ul class="pagination">
        <li class="page-item"
            v-for="pageNumber in parseInt(searchPages)"
            :class="pageNumber == currentPage ? 'active' : ''"
            :key="pageNumber"
        >
          <button class="page-link"
            @click="currentPage = pageNumber">{{ pageNumber }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import API from './API';

export default {
  name: 'App',
  data() {
    return {
      title: 'Image Search App',
      searchTerm: 'baby',
      searchPageSize: 10,
      searchPages: 1,
      currentPage: 1,
      images: [],
      loading: false,
    };
  },
  computed: {
    displayedImages() {
      const from = this.currentPage * this.searchPageSize - this.searchPageSize;
      const to = this.currentPage * this.searchPageSize;

      return this.images.slice(from, to);
    },
  },
  methods: {
    updateValue() {
      if (this.searchPageSize > 50) {
        this.searchPageSize = 50;
        // this.$forceUpdate();
      }
    },
    onSubmit() {
      let page = 1;
      this.loading = true;
      this.images = [];

      API.search(this.searchTerm, page, this.searchPageSize)
        .then((images) => {
          this.images = images;
          this.loading = false;
        });

      for (let i = 0; i < this.searchPages - 1; i += 1) {
        page += 1;
        API.search(this.searchTerm, page, this.searchPageSize)
          .then((images) => {
            this.images.push(...images);
          });
      }
    },
  },
};
</script>

<style>
  .logo {
    width: 100px;
  }

  .images-section {
    column-count: 3;
  }

  .img {
    width: 100%;
    margin-bottom: 20px;
  }
</style>
