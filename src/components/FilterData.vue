<template>
  <div class="filterCpm">
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
    <!-- Filtering form -->
    <form @submit.prevent="filterData">
      <label for="date">Filter by Date</label>
      <select name="date" id="date" v-model="selectedDate">
        <option v-for="date in availableDates" :key="date"> {{ date }}</option>
      </select>
      <button>Filter Dates</button>
    </form>
  </div>
</template>
<script>
export default {
  props: ['fireData', 'loadData'],
  data() {
    return {
      fireFilterData: this.fireData,
      availableDates: [
        'All locations',
        '2020-08-21',
        '2020-08-22',
        '2020-08-23',
        '2020-08-24',
        '2020-08-25',
        '2020-08-26',
        '2020-08-27',
        '2020-08-28',
      ],
      selectedDate: '',
      isLoading: false,
    };
  },
  methods: {
    //Method for filtering storms
    async filterData() {
      if (this.selectedDate === 'All locations') {
        return this.loadData();
      }
      //Load all fires storms in order to include the storms filtered out in the previous filtering
      this.isLoading = true;
      await this.loadData();
      this.isLoading = false;
      const filter = this.fireData.filter((storm) => {
        return storm.date === this.selectedDate;
      });
      this.fireFilterData = filter;
      console.log(this.fireFilterData);

      //Passing data through event emitter to the Map component
      this.$emit('data-filtered', this.fireFilterData);
    },
  },
};
</script>

<style scoped>
.filterCpm {
  display: flex;
  flex-direction: column;
}
form {
  text-align: center;
  align-self: center;
  width: 25%;
  border: 1px #fff solid;
  padding: 2rem;
  border-radius: 1rem;
  margin: 4rem;
}
label {
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
}
select {
  border: none;
  width: 50%;
  align-self: center;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
}
option {
  font-size: 1rem;
}
button {
  transition: 0.5s all ease;
  border: 1px solid #fff;
  border-radius: 2rem;
  background-color: transparent;
  color: #fff;
  margin: 0 3rem;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  cursor: pointer;
}
button:hover {
  border: 1px solid transparent;
  background-color: #fff;
  color: rgb(63, 63, 63);
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
  z-index: 5;
}
</style>
