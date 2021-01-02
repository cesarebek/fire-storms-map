<template>
  <div>
    <div id="map">
      <l-map :zoom="zoom" :center="center">
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
  components: { LMap, LTileLayer, LMarker, LIcon, FilterData },
  data() {
    return {
      fireData: [],
      zoom: 2,
      center: [0, 0],
      tile: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      urlIcon: 'https://www.flaticon.com/svg/static/icons/svg/426/426833.svg',
    };
  },
  // created() {
  //   this.loadData();
  // },
  methods: {
    //Fetching Data:
    async loadData() {
      const response = await axios.get(
        'https://d1sat59n3r2spx.cloudfront.net/static/s2impact-global-fire-21-28-agosto.json'
      );
      const data = await response.data;
      //Assigning a unique ID
      const dataId = data.map((fire) => ({
        ...fire,
        id: nanoid(),
      }));
      console.log(dataId);
      //Setting state with incoming data
      this.fireData = dataId;
    },
    //Setting mutatated data from child component
    updateData($event) {
      this.fireData = $event;
    },
  },
};
</script>

<style scoped>
#map {
  height: 75vh;
  width: 100vw;
  border: 1px solid red;
  border-radius: 1rem;
}
</style>
