<template>
  <div id="app">
    <div row="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-offset-2 col-xs-2">
        <div class="list-group">
          <!--使用指令router-link进行导航-->
          <router-link to="/home" class="list-group-item">Home</router-link>
          <router-link to="/about" class="list-group-item">About</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!--用于渲染匹配的组件-->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import url("./assets/css/custom.css");
</style>
