<template>
  <div class="filterCpm">
    <!-- Loading Spinner -->
    <my-spinner v-if="isLoading"></my-spinner>
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
  props: {
    fireData: {
      type: Array,
      require: true,
    },
    loadData: {
      type: Function,
      required: true,
    },
  },
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
</style>
