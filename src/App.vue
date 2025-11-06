<template>
  <div>
    <h3>Elevator Simulator</h3>
    <main>
      <Controller />

      <Apartment :elevator="elevator1"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import Controller from './components/Controller.vue';
import Apartment from './components/Apartment.vue';
import { Elevator } from './model/Elevator';
import { ref } from 'vue';

const elevator1 = ref<Elevator>(new Elevator({
  floorCount: 5,
  elevatorPosition: 1,
  currentDirection: "idle",
  isDoorOpened: false,
  isMoving: false,
  upQueue: [],
  downQueue: []
}))


</script>

<style lang="scss">
main{
  display: flex;
  gap: 5px;

  .controller{
    width: 25%;
    background-color: grey;
  }

  .apartment{
    width: 75%;
  }
}
</style>
