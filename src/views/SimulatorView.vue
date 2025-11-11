<template>
  <div class="simulator-view">
    <header>
      <h1 class="title" @click="router.push('/')">
        Simulateur d'ascenseur
      </h1>
      <p>Système moderne de gestion d'ascenseur</p>
    </header>
    <main>
      <div class="panel">
        <Controller />
        <SystemStatus />
      </div>

      <Apartment />
    </main>
  </div>
</template>

<script setup lang="ts">
import Controller from '../components/Controller.vue';
import Apartment from '../components/Apartment.vue';
import SystemStatus from '../components/SystemStatus.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="scss">
.simulator-view {
    header {
        padding-left: 20px;
        .title{
            display: inline-block;
            color: transparent;
            background: linear-gradient(to right, #3b82f6, #ef4444);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
            cursor: pointer;
        }
        p {
            margin-top: 5px;
            color: #000;
            line-height: 1;
        }
    }
    main {
        display: flex;
        gap: 20px;
        padding: 20px;

        .panel {
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
}
</style>

