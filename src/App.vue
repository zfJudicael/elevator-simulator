<template>
  <div>
    <h3>Elevator Simulator</h3>
    <main>
      <Controller />

      <Apartment />
    </main>
  </div>
</template>

<script setup lang="ts">
import Controller from './components/Controller.vue';
import Apartment from './components/Apartment.vue';
</script>

<style lang="scss">
main{
  display: flex;
  gap: 20px;
  padding: 20px;

  .controller{
    width: 25%;
  }

  .apartment{
    width: 75%;
  }
}
</style>
