<template>
  <div class="mapPage">
    <!-- Loading Spinner -->
    <my-spinner v-if="isLoading"></my-spinner>
    <!-- Map -->
    <div class="map">
      <l-map :zoom="zoom" :center="center" class="map">
        <l-tile-layer :url="tile"></l-tile-layer>
        <l-marker
          v-for="fire in fireData"
          :key="fire.id"
          :lat-lng="[fire.latitude, fire.longitude]"
        >
          <l-icon :icon-url="urlIcon"></l-icon>
        </l-marker>
      </l-map>
    </div>
    <!-- Filtering data component -->
    <FilterData
      :fireData="fireData"
      :loadData="loadData"
      @data-filtered="updateData"
    />
  </div>
</template>
<script>
//Package import:
import axios from 'axios';
import { nanoid } from 'nanoid';
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
//Import Components:
import FilterData from './FilterData.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    FilterData,
  },
  data() {
    return {
      fireData: [],
      zoom: 2,
      center: [20, 0],
      tile: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      urlIcon: 'https://www.flaticon.com/svg/static/icons/svg/426/426833.svg',
      isLoading: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //Fetching Data:
    async loadData() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          'https://d1sat59n3r2spx.cloudfront.net/static/s2impact-global-fire-21-28-agosto.json'
        );
        this.isLoading = false;
        const data = await response.data;
        //Assigning a unique ID
        const dataId = data.map((fire) => ({
          ...fire,
          id: nanoid(),
        }));
        console.log(dataId);
        //Setting state with incoming data
        this.fireData = dataId;
      } catch (e) {
        console.log(e);
      }
    },
    //Setting mutatated data from child component
    updateData($event) {
      this.fireData = $event;
    },
  },
};
</script>

<style scoped>
.mapPage {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  max-width: 100vw;
}
.map {
  margin-top: 2rem;
  height: 70vh;
  width: auto;
  padding: 0 10rem;
}
</style>
