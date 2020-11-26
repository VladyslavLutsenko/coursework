<template>
  <div>
    <b-container fluid class="header">
      <div>
        <b-navbar toggleable="lg" type="light" variant="light">
          <b-navbar-brand to="/" @click="changePage('main')">BINally</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/" @click="changePage('main')" :disabled="activePage=='main'">Головна</b-nav-item>
              <b-nav-item to="/history" @click="changePage('history')" :disabled="activePage=='history'">Історія</b-nav-item>
            </b-navbar-nav>

            
            
          </b-collapse>
        </b-navbar>
      </div>
    </b-container>
    <div class="content">
      <router-view></router-view>
    </div>
    
    <b-container fluid class="footer">
      © Vladyslav Lutsenko 2020
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data(){
    return{
      activePage: ''
    }
  },
  mounted: function () {
    if (this.$route.path=="/history") {
      this.activePage="history";
    }
    else if (this.$route.path=="/"){
      this.activePage="main";
    }
  },
  methods:{
    changePage(page){
      this.activePage=page;
    }
  }
}
</script>

<style scoped>
  .header{
    padding: 0;

  }
  .footer{
    background-color:#f8f9fa;
    font-size: 15px;
    text-align: center;
  }
  
</style>

<style >
@media (max-width: 992px) {
  .content{
    min-height: 90vh;
    background-color: rgb(235, 235, 235);
  }
}
</style>

