<template>
  <v-row justify="center" class="ma-16">
    <v-col cols="10">
      <v-card class="px-10 d-flex align-center" flat color="#E2E2E2" height="85" width="100%">
        <v-btn to="/" class="elevation-0 text-none" dark rounded height="33" width="74" color="#549DF2">
          <v-icon small class="mr-1">mdi-arrow-left</v-icon>
          Back
        </v-btn>
        <div class="ml-8">
          <v-card-text class="pb-1 font-weight-bold">
            {{ items.original_title }}
          </v-card-text>
          <v-card-subtitle class="pt-0">{{ items.tagline }}</v-card-subtitle>
        </div>
      </v-card>
      <v-row class="Movies" justify="center">
        <v-col cols="4">
          <v-card flat class="PosterContainer">
            <v-btn v-show="items.adult === true" class="elevation-0 mt-9 red--text" absolute top right color="white" fab small>+18</v-btn>
            <v-img alt="Movie Poster" class="MovieImage" :src="imageKey+items.poster_path" width="100%" height="100%"></v-img>
          </v-card>
        </v-col>
        <v-col cols="8">
          <div class="MovieInfo">
            <span>Budget</span>
            <v-spacer></v-spacer>
            <span>${{ items.budget }}</span>
          </div>
          <div class="MovieInfo">
            <span>Revenue</span>
            <v-spacer></v-spacer>
            <span>${{ items.revenue }}</span>
          </div>
          <div class="MovieInfo">
            <span>Release Date</span>
            <v-spacer></v-spacer>
            <span>{{ items.release_date }}</span>
          </div>
          <div class="MovieInfo">
            <span>Runtime</span>
            <v-spacer></v-spacer>
            <span>{{ items.runtime }} minutes</span>
          </div>
          <div class="MovieInfo">
            <span>Score</span>
            <v-spacer></v-spacer>
            <span>{{ items.vote_average }} ({{ items.vote_count }} votes)</span>
          </div>
          <div class="MovieInfo">
            <span>Genres</span>
            <v-spacer></v-spacer>
            <span v-for="k in items.genres" :key="k.id"> {{ k.name }} / </span>
          </div>
          <div class="MovieInfo">
            <span>IMDB Link</span>
            <v-spacer></v-spacer>
            <a :href="imdb+items.imdb_id">Link</a>
          </div>
          <div class="MovieInfo">
            <span>Homepage Link</span>
            <v-spacer></v-spacer>
            <a :href="items.homepage">Link</a>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p>{{ items.overview }}</p>
        </v-col>
        <v-col cols="12" class="mt-8">
          <h3 class="mb-3">Credit:</h3>
          <span v-for="n in CastList.cast.slice(0 , 10)" :key="n.name">{{n.name}} ,</span>
          <span> and {{CastList.cast.length - 10}} more.</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Movie",
  async created() {
    this.GetMovie();
    this.GetCast();
  },
  data() {
    return {
      key: 'f62f750b70a8ef11dad44670cfb6aa57',
      imageKey: 'https://image.tmdb.org/t/p/w500/',
      imdb:'https://www.imdb.com/title/',
      CastList:{
        cast:''
      },
      items: {
        adult:'',
        original_title: '',
        overview: '',
        tagline: '',
        budget: '',
        revenue: '',
        release_date: '',
        runtime: '',
        vote_average: '',
        vote_count: '',
        genres: '',
        homepage: '',
        poster_path:'',
        backdrop_path:'',
        imdb_id:''
      }
    }
  },
  methods: {
    GetMovie() {
      axios.get(`3/movie/${this.$route.params.id}?api_key=${this.key}`).then(response => {
        this.items = response.data
      })
    },
    GetCast(){
      axios.get(`3/movie/${this.$route.params.id}/credits?api_key=${this.key}`).then(response => {
        this.CastList = response.data
      })
    }
  }
}
</script>

<style>
.PosterContainer {
  position: relative;
  width: 330px;
  height: 495px;
  border-radius: 12px;
}

.MovieInfo {
  display: flex;
  margin: 15px 0;
}
</style>