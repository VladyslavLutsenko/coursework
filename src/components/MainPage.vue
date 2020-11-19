<template>
  <div>
    <input type="text" v-model="enteredBin">
    <button @click="checkInfo">Check</button>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'MainPage',
  data() {
    return {
      enteredBin: '',
      binCheker: 'https://x-api.hackinglatino.com/public/bin/',
      proxy: 'https://cors-anywhere.herokuapp.com/',
    }
  },
  mounted: function () {
  
  },
  computed:{
    url: function () {
      return this.proxy+this.binCheker+this.enteredBin
    }
  },
  methods: {
    checkInfo(){
      console.log(this.url);
      Vue.axios.get(this.url).then( response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
