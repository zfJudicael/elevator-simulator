<template>
    <div class="home-view">
        <Section1 />
        <Section2 />
    </div>
</template>

<script setup lang="ts">
import Section1 from '@/components/home/Section-1.vue';
import Section2 from '@/components/home/Section-2.vue';
</script>

<style lang="scss" scoped>
.home-view {
    background-color: #eaf1ff;
}
</style>
