<template>
  <div class="mapPage">
    <!-- Loading Spinner -->
    <div class="lds-roller spinner" v-if="isLoading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
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
        const data = await response.data;
        this.isLoading = false;
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
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: ' ';
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
}
</style>
