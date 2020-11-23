<template>
  <div>
    <h1>{{message}}</h1>
    <input v-model="enteredBin" type="number" maxlength="6">
    <br>
    <div v-if="info.bin">
      <table>
        <tr>
          <td>Банк:</td>
          <td>{{info.bank}}</td>
        </tr>
        <tr>
          <td>Країна:</td>
          <td>{{info.country}}</td>
        </tr>
        <tr>
          <td>Платіжна система:</td>
          <td>{{info.scheme}}</td>
        </tr>
        <tr>
          <td>Тип картки:</td>
          <td>{{info.type}}</td>
        </tr>
        <tr>
          <td>Рівень картки:</td>
          <td>{{info.level}}</td>
        </tr>
      </table>
      <div>
        <img :src="map" alt="map" width="1000px">
      </div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'MainPage',
  data() {
    return {
      binCheker: 'https://x-api.hackinglatino.com/public/bin/',
      proxy: 'https://cors-anywhere.herokuapp.com/',
      enteredBin: '',
      message: 'Введіть перші 6 цифр BIN',
      info: {}
    }
  },
  mounted: function () {

  },
  computed:{
    url: function () {
      return this.proxy+this.binCheker+this.enteredBin
    },
    map: function(){
      return `https://open.mapquestapi.com/staticmap/v5/map?key=qhAUIuIfLJYZ2MXSBcqcD2sEDxDJIo9v&locations=${this.info.country}&center=UA&size=1000,700`
    }
  },
  watch: {
    enteredBin: function (val) {
      this.message='Чекаю доки ви введете 6 перших цифр BIN...';
      this.info={};
      if (val.length==6) {
        this.checkBIN();
      }
      else if(val.length==0){
        this.message='Введіть перші 6 цифр BIN'
      }
      else if (val.length>6){
        this.enteredBin=val.substr(0,6);
      }
    }
  },
  methods: {
    checkBIN(){
      console.log(this.url);
      this.message='Обробка даних...'
      Vue.axios.get(this.url).then( response => {
        this.message='Інформація про карту:'
        console.log(response.data);
        this.info=response.data.response;
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type='number'] {
  -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
