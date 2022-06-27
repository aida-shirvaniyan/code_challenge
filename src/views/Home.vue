<template>
  <v-row justify="center" class="ma-16">
    <v-col lg="10" xl="10" md="11" sm="11" cols="12">
      <v-card class="px-10 d-flex align-center" flat color="#E2E2E2" height="85" width="100%">
        <v-card-text class="SearchText">
          Search by release date:
        </v-card-text>
        <v-col cols="3">
          <v-menu
              ref="Start"
              v-model="Start"
              :close-on-content-click="false"
              :return-value.sync="dateStart"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  solo
                  flat
                  v-model="items.release_date_start"
                  class="SearchInput pt-2"
                  placeholder="Start Date"
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="items.release_date_start"
                no-title
                scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="Start = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.Start.save(items.release_date_start)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3">
          <v-menu
              ref="End"
              v-model="End"
              :close-on-content-click="false"
              :return-value.sync="dateEnd"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  solo
                  flat
                  v-model="items.release_date_end"
                  class="SearchInput pt-2"
                  placeholder="End Date"
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="items.release_date_end"
                no-title
                scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="End = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.End.save(items.release_date_end)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn class="elevation-0 text-none" dark rounded height="33" width="74" color="#549DF2" @click="Filter()">
          Search
        </v-btn>
      </v-card>
      <v-row class="Movies" justify="center">
        <v-col v-for="item in items.results" :key="item.id" lg="4" xl="4" md="5" sm="10" cols="12">
          <v-card @click="MoviePage(item.id)" height="195" flat class="MovieCards" color="#F1F1F1">
            <v-row class="ma-0 pa-0">
              <v-img class="MovieImage" :src="imageKey+item.poster_path" width="128" height="100%"></v-img>
              <div class="MovieDetail">
                <h3>{{ item.title }}</h3>
                <div class="MovieDate">
                  <div class="mb-3">
                    <v-icon>mdi-calendar-blank</v-icon>
                    <span class="DetailText">{{ item.release_date }}</span>
                  </div>
                  <div>
                    <span class="DetailText" v-for="key in item.genre_ids" :key="key">
                        <span v-for="key2 in genres" :key="key2.id">
                          <span v-if="key2.id === key">{{ key2.name }} /</span>
                        </span>
                    </span>
                  </div>
                </div>
              </div>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-btn @click="FirstPage()" class="text-none First_last mx-1" color="rgba(0, 0, 0, 0.48)" text>1</v-btn>
        <v-btn :disabled="page === 1" @click="PrevPage()" class="text-none" color="rgba(0, 0, 0, 0.48)" text>Previous Page</v-btn>
        <v-divider vertical class="Divider mx-2"></v-divider>
        <v-card-subtitle class="mx-2">Page {{ page }}</v-card-subtitle>
        <v-divider vertical class="Divider mx-2"></v-divider>
        <v-btn :disabled="page === 500" @click="NextPage()" class="text-none" color="#318FE7" text>Next Page</v-btn>
        <v-btn @click="LastPage()" class="text-none First_last mx-1" color="rgba(0, 0, 0, 0.48)" text>500</v-btn>
        <div class="PaginationResult">Showing results {{ FromResult }} - {{ToResult}}</div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  created() {
    this.GetMovieList();
  },
  data() {
    return {
      dateStart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      Start: false,
      End: false,
      imageKey: 'https://image.tmdb.org/t/p/w500/',
      key: 'f62f750b70a8ef11dad44670cfb6aa57',
      page: 1,
      FromResult:1,
      ToResult:20,
      items: {
        page: '',
        results: '',
        total_pages: '',
        total_results: '',
        release_date_start:'',
        release_date_end:'',
      },
      genres: [
        {"id": 28, "name": "Action"},
        {"id": 12, "name": "Adventure"},
        {"id": 16, "name": "Animation"},
        {"id": 35, "name": "Comedy"},
        {"id": 80, "name": "Crime"},
        {"id": 99, "name": "Documentary"},
        {"id": 18, "name": "Drama"},
        {"id": 10751, "name": "Family"},
        {"id": 14, "name": "Fantasy"},
        {"id": 36, "name": "History"},
        {"id": 27, "name": "Horror"},
        {"id": 10402, "name": "Music"},
        {"id": 9648, "name": "Mystery"},
        {"id": 10749, "name": "Romance"},
        {"id": 878, "name": "Science Fiction"},
        {"id": 10770, "name": "TV Movie"},
        {"id": 53, "name": "Thriller"},
        {"id": 10752, "name": "War"},
        {"id": 37, "name": "Western"}
      ]
    }
  },
  methods: {
    Filter() {
      axios.get(`3/discover/movie/?api_key=${this.key}&primary_release_date.gte=${this.items.release_date_start}&primary_release_date.lte=${this.items.release_date_end}`).then(response => {
        this.items = response.data
      })
    },
    GetMovieList() {
      axios.get(`3/discover/movie/?api_key=${this.key}&page=${this.page}`).then(response => {
        this.items = response.data
      })
    },
    GetGenres() {
      axios.get(`3/genre/movie/list?api_key=${this.key}`).then(response => {
        this.genres = response.data
      })
    },
    MoviePage(id) {
      this.$router.push(`/Movie/${id}`)
    },
    NextPage() {
      this.page++;
      this.FromResult+=20;
      this.ToResult+=20;
      this.GetMovieList();
    },
    PrevPage() {
      this.page--;
      this.FromResult-=20;
      this.ToResult-=20;
      this.GetMovieList();
    },
    FirstPage() {
      this.page = 1;
      this.FromResult = 1;
      this.ToResult = 20;
      this.GetMovieList();
    },
    LastPage() {
      this.page = 500;
      this.FromResult = 9981;
      this.ToResult = 10000;
      this.GetMovieList();
    }
  }
}
</script>
<style>
.SearchText {
  width: auto !important;
}

.SearchInput {
  padding: 2px 4px;
  border-radius: 4px;
  background-color: white !important;
  border: none;
  display: flex;
  align-items: center;
}

.Movies {
  margin: 70px 0 !important;
}

.MovieCards {
  border: 2px solid #C4C4C4 !important;
  position: relative;
}

.MovieImage {
  position: absolute;
}

.MovieDetail {
  padding: 10px 0;
  margin-left: 150px;
}

.MovieDate {
  bottom: 10px;
  position: absolute;
}

.DetailText {
  align-items: baseline;
  font-size: 12px;
  color: #505050;
}

.Divider {
  height: 40px;
}

.PaginationResult {
  color: rgba(152, 152, 152, 1);
  position: absolute;
  text-align: center;
  margin-top: 80px;
}
.First_last{
  border: 2px solid rgba(0, 0, 0, 0.48);
  padding: 0 !important;
}
</style>
