<template>
  <div class="loading">
      <div class="load">Loading...</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
    .loading{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
        .load{
            width: 400px;
            height: 180px;
            background-color: rgba($color: #000, $alpha: 0.2);
            font-size: 30px;
            font-weight: bold;
            color: #d43c33;
            line-height: 180px;
            text-align: center;
            border-radius: 10px;
        }
    }
</style>