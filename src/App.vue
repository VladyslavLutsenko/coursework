<template>
  <div>
    <b-container fluid class="header">
      <div>
        <b-navbar toggleable="lg" type="light" variant="light">
          <b-navbar-brand href="#">BINally</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#" disabled>Головна</b-nav-item>
              <b-nav-item href="#">Збережені картки</b-nav-item>
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

