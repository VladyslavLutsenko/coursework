<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col xs="12" lg="4" class="col-left" >
          
          <div class="message-holder">
            <span class="message">{{message}}  </span>
            
            <b-icon v-if="status==2" icon="info-circle" animation="throb" font-scale="1"></b-icon>
            <b-icon v-if="status==3" icon="arrow-clockwise" animation="spin" font-scale="1"></b-icon>
            <b-icon v-if="status==4" icon="check-circle"  font-scale="1"></b-icon>
            
            
          </div>
          
          <div class="cards">
            <div class="front card" v-bind:style="{background: bankInfo.color}">
              <img v-if="bankInfo.logo" class="bank-logo" :src="bankInfo.logo" >
              <img class="brand-logo" :src="brand">
              <div class="fields">
                <input v-model="enteredBin" class="field number" type="number" maxlength="6" placeholder="0000 0000 0000 0000">
                <label class="label">Дійсна до</label>
                <input class="field expired" type="text" placeholder="MM" disabled>
                <input class="field expired" type="text" placeholder="YY" disabled>
              </div>
            </div>
            <div class="back card">
              <input class="field code" type="password" disabled>
              <label class="label">CVV</label>
            </div>
          </div>
        </b-col>
        <b-col lg="8" class=" col-right">
          <transition name="fade" mode="out-in">
            <div v-if="info.bin" key="info">
              <div class="map-holder">
                <img :src="map" alt="map" class="map">
              </div>
              <span class="inforacia">Інформація про BIN {{info.bin}}:</span>
              <table>
                <tr v-if="info.country">
                  <td>Країна:</td>
                  <td>{{info.country}}</td>
                </tr>
                <tr v-if="info.bank">
                  <td>Банк:</td>
                  <td >{{info.bank}}</td>
                </tr>
                <tr v-if="bankInfo.url">
                  <td>Сайт банку:</td>
                  <td>
                    <a :href="bankInfo.url">{{bankInfo.url}}</a>
                  </td>
                </tr>
                <tr v-if="info.scheme">
                  <td>Платіжна система:</td>
                  <td>{{info.scheme}}</td>
                </tr>
                <tr v-if="info.type">
                  <td>Тип картки:</td>
                  <td>{{info.type}}</td>
                </tr>
                <tr v-if="info.level">
                  <td>Рівень картки:</td>
                  <td>{{info.level}}</td>
                </tr>
              </table>
            </div>
            <div v-if="!info.bin" key="where" class="info-holder">
              <div class='info-img-holder'>
                
                <img src="../assets/BIN_INFO.jpg" id="info-img">
              </div>
              <span class="inforacia">Де знайти BIN номер?</span>
              <p class="info-kak">BIN (Bank Identification Number) - перші шість цифр на пластиковій картці, за якими можна визначити приналежність карти тій чи іншій країні і банку, тип карти і категорію карти. Його можна знайти на лицьовій стороні банківської карти. </p>
            </div>
          </transition>
          
        </b-col>
      </b-row>
    </b-container>


    

    
  </div>
</template>

<script>
import Vue from 'vue'
import banks from '../data/banks.js'

export default {
  name: 'MainPage',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      binCheker: 'https://x-api.hackinglatino.com/public/bin/',
      proxy: 'https://cors-anywhere.herokuapp.com/',
      enteredBin: '',
      message: 'Введіть перші 6 цифр BIN:',
      status: 1,
      brand: '',
      info: {},
      banks: [],
      bankInfo: {}
    }
  },
  mounted: function () {
    this.banks=banks;
  },
  computed:{
    url: function () {
      return this.proxy+this.binCheker+this.enteredBin
    },
    map: function(){
      return `https://open.mapquestapi.com/staticmap/v5/map?key=qhAUIuIfLJYZ2MXSBcqcD2sEDxDJIo9v&locations=${this.info.country}&center=UA&size=900,400&type=map`
    }
  },
  watch: {
    enteredBin: function (val) {
      if (val.length==6) {
        if (!this.info.bin) {
          this.message='Обробка даних...'
          this.status=3;
          this.checkBIN();
        }
      }
      else if(val.length==0){
        this.message='Введіть перші 6 цифр BIN:';
        this.status=1;
        this.info={};
        this.bankInfo={};
      }
      else if (val.length>6){
        this.enteredBin=val.substr(0,6);
      }
      else{
        this.message='Чекаю доки ви введете 6 перших цифр BIN';
        this.status=2;
        this.info={};
        this.bankInfo={};
      }
      if (val[0]==3) {
        this.brand=`${this.publicPath}brands/american-express-colored.svg`
      }
      else if (val[0]==4) {
        this.brand=`${this.publicPath}brands/visa-colored.svg`
      }
      else if (val[0]==5) {
        this.brand=`${this.publicPath}brands/master-card-colored.svg`
      }
      else {
        this.brand=""
      }

    }
  },
  methods: {
    checkBIN(){
      Vue.axios.get(this.url).then( response => {
        this.message='Успіх';
        this.status=4;
        console.log(response.data);
        this.info=response.data.response;
        this.getBankInfo();
        
        this.addToHistory(this.info, this.bankInfo);
      }).catch(error => {
        console.error(error);
        this.message="Помилка!";
        this.status=1;
      });
    },
    getBankInfo(){
      this.banks.forEach(country => {
        if (country.country.toUpperCase()==this.info.country.toUpperCase()) {
          country.banks.forEach(bank => {
            if (bank.bankNames.find(name=>name.toUpperCase()==this.info.bank.toUpperCase())) {
              this.bankInfo=bank.bankData;
            }
          });
        }
      });
    },
    addToHistory(info, bankInfo){
      this.$store.commit('addBin', {...info, ...bankInfo});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (min-width: 992px) {
  body {
    font-size: 1vw;
  }
  .message{
    font-size: 1.2vw;
  }
  .message-holder{
    margin-top: 2vw;
    margin-bottom: 2vw;
  }
  .col-right, .col-left{
    min-height: 100vh;
  }
}

@media (max-width: 992px) {
  body {
    font-size: 3vw;
  }
  .message{
    font-size: 3.5vw;
  }
  .message-holder{
    margin-top: 6vw;
    margin-bottom: 6vw;
  }
}

.info-holder{
  opacity: 80%;
}

.info-kak{
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 1vw;
}

#info-img{
  width: 80%;
}

.info-img-holder{
  text-align: center;
}

.inforacia{
  font-weight: 500;
  margin-left: 3vw;
  font-size: 120%;
}

.col-right, .col-left{
  padding: 0;
}

.map-holder{
  text-align: center;
  margin-bottom: 1vw;
  overflow: hidden;
  height: 100%;
}

.map{
  width: 100%;
  margin: 0 0 -40px 0;
  /* position: absolute;
  top: 0%;
  z-index: 0; */
}

.col-right{
  background-color: rgb(235, 235, 235);
}

.col-left{
  text-align: center;
  background-color: white;
}

.message-holder{
  padding-top: 2vw;
  padding-bottom: 2vw;
}

table{
  width: 100%;
  margin-bottom: 1vw;
  margin-top: 1vw;
  
  /* position: absolute;
  z-index: 1; */
}

table, tr, td{
  padding: 1vw;
  padding-right: 3vw;
  padding-left: 3vw;
}

td{
  font-weight: 500;
  width: 30%;
}

td +td{
  font-weight: 400;
  width: 70%;
}

tr+tr{
  border-top: 1px black solid;
}

input[type='number'] {
  -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.cards {
  width: 25em;
  height: 13em;
  position: relative;
  margin: auto;
  text-align: left;
  margin-bottom: 6vh;
}
.cards .card {
  position: absolute;
  width: 18.5em;
  height: 11.5em;
  border-radius: 0.8em;
}
.cards .card.front {
  border: 1px solid #bbb;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 100;
  transition: background .4s ease-in-out;
}
.cards .card.front .bank-logo {
  position: absolute;
  top: -0.3em;
  left: 0;
  padding: 1.3em;
  width: 100%;
  height: 4.5em;
  object-fit: contain;
  object-position: 0 0;
  /* display: none; */
}
.cards .card.front .brand-logo {
  position: absolute;
  bottom: 1.3em;
  right: 1.3em;
  text-align: right;
  height: 1.8em;
  /* display: none; */
}
.cards .card.front .fields {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.3em;
}
.cards .card.front .fields .number {
  width: 100%;
  margin-bottom: 0.3em;
}
.cards .card.front .fields .expired {
  display: inline-block;
  width: 3em;
  margin-right: 0.5em;
  margin-top: 0.3em;
}
.cards .card.back {
  bottom: 0;
  right: 0;
  background: #bbb;
  padding-top: 5.8em;
  padding-right: 1.3em;
  padding-left: 13.2em;
}
.cards .card.back .code {
  width: 100%;
}
.cards .card.back:before {
  content: '';
  position: absolute;
  top: 1.3em;
  background: #444;
  width: 100%;
  height: 3em;
  left: 0;
}

.field {
  padding: 0.3em 0.5em;
  font-family: Courier, monospace;
  font-size: 1em;
  text-indent: 0.1em;
  border: 1px solid #666;
}

.label {
  font-size: 0.8em;
  display: block;
  margin-top: 0.5em;
}
</style>

<style scoped>
@media (max-width: 992px) {
  .col-right{
    min-height: 50vh;
  }
}
</style>