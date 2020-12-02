<template>
    <div>
        <b-container fluid>
      <b-row>
        <b-col order="2" order-lg="1" lg="4" class="col-left" v-if="status" >
            <div class="bins-holder">
                <b-button class="clearbutton" variant="outline-secondary" @click="clearBins">Видалити історію</b-button>
                <div v-for="bin in bins" :key="bin.bin">
                    <div class="cards select-card" @click="selectCard(bin)" :class="[info.bin==bin.bin ? cardActive : '']">
                        <div class="front card" v-bind:style="{background: bin.color}">
                            <img v-if="bin.logo" class="bank-logo" :src="bin.logo" >
                            <img class="brand-logo" :src="getBrand(bin.bin)">
                            <div class="fields">
                                <input v-model="bin.bin" class="field number" type="number" maxlength="6" disabled>
                                <label class="label">Дійсна до</label>
                                <input class="field expired" type="text" placeholder="MM" disabled>
                                <input class="field expired" type="text" placeholder="YY" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
          
        </b-col>
        <b-col class="col-right" order="1" order-lg="2" :lg="!status ? 12 : 8">
            
            <div v-if="!status" class="message-history" >Історія запитів порожня!</div>
            <div v-if="!info.bin && status" >
                <div id="message-nazhmite">Натисніть на картку щоб побачити детальну інформацію</div>
            </div>
            
            <div v-if="info.bin">
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
                <tr v-if="info.url">
                    <td>Сайт банку:</td>
                    <td>
                    <a :href="info.url">{{info.url}}</a>
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
                
            
        </b-col>
      </b-row>
    </b-container>

    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'History',
    data() {
        return {
            publicPath: process.env.BASE_URL,
            info: {},
            cardActive: 'card-active'
        }
    },
    mounted: function () {

    },
    computed: {
            bins: function(){
                return this.$store.getters.getBins;
                
            },
            status: function(){
                if (this.bins.length>0) {
                    return true;
                }
                else{
                    return false;
                }
            }
        },
    methods: {
        getBrand(bin){
            if (bin[0]==3) {
                return `${this.publicPath}brands/american-express-colored.svg`
            }
            else if (bin[0]==4) {
                return `${this.publicPath}brands/visa-colored.svg`
            }
            else if (bin[0]==5) {
                return `${this.publicPath}brands/master-card-colored.svg`
            }
            else {
                return ""
            }
        },
        selectCard(bin){
            this.info=bin;
        },
        clearBins(){
            this.$store.commit('clear');
            this.status=false;
            this.info={};
        }
    }
}
</script>

<style scoped>
@media (max-width: 992px) {
    .col-left{
        height: 65vh;
        overflow: auto;
    }
    .col-right{
        min-height: 25vh;
    }
    #message-nazhmite{
        margin-top: 10vh;
        font-size: 3vw;
    }
}

@media (min-width: 992px) {
    .col-left{
        height: 65vh;
        overflow: auto;
    }
    .col-right{
        min-height: 90vh;
    }
    #message-nazhmite{
        margin-top: 40vh;
    }
}

.cards{
    margin-top: 2vw;
    margin-bottom: 0;
    width: 18.5em;
    height: 11.5em;
    /* margin: 1vw; */
}
.bins-holder{
    width: 100%;
    margin-bottom: 2vw;
}
.select-card:hover{
    filter: saturate(150%);
    transform: scale(1.05);
}

.select-card:hover * {
    cursor: pointer;
}

.select-card{
    transition: .4s ease-in-out;
}

.card-active {
    transform: scale(1.05);
    filter: saturate(150%);
    
}

.card-active:hover *{
    cursor: default;
}

.col-right{
    padding-top: 1vw;
}

.message-history{
    padding-top: 40vh;
    text-align: center;
    font-size: 150%;
}

.clearbutton{
    border-radius: 0.8em;
    margin-top: 2vh;
    font-size: inherit;
    width: 18.5em;
    transition: .4s ease-in-out;
}

#message-nazhmite{
    text-align: center;
    opacity: 80%;
}
</style>