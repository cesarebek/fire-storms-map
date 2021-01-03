<template>
  <form @submit.prevent="filterData">
    <label for="date">Filter by Date</label>
    <select name="date" id="date" v-model="selectedDate">
      <option v-for="date in availableDates" :key="date"> {{ date }}</option>
    </select>
    <button>Filter Dates</button>
  </form>
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
    };
  },
  methods: {
    async filterData() {
      if (this.selectedDate === 'All locations') {
        return this.loadData();
      }
      await this.loadData();
      const filter = this.fireData.filter((storm) => {
        return storm.date === this.selectedDate;
      });
      this.fireFilterData = filter;
      console.log(this.fireFilterData);
      this.$emit('data-filtered', this.fireFilterData);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 20%;
  border: 1px #fff solid;
  padding: 2rem;
  border-radius: 1rem;
  margin: 3rem;
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
