<template>
  <form @submit.prevent="filterData">
    <label for="date">Filter by Date: </label>
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
        '',
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
      if (this.selectedDate === '') {
        return this.loadData();
      }
      await this.loadData();
      const filter = this.fireData.filter((storm) => {
        return storm.date !== this.selectedDate;
      });
      this.fireFilterData = filter;
      this.$emit('data-filtered', this.fireFilterData);
    },
  },
};
</script>

<style scoped>
form {
  background-color: rgb(223, 240, 200);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin: 3rem 20rem;
}
button {
  border: none;
  padding: 1rem;
  background-color: burlywood;
  font-size: 1rem;
}
</style>
