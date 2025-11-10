<template>
    <div class="container">
        <motion.div 
            class="elevator" 
            :style="{'height': `calc((100% / ${useElevator.floorCount}) - 3px)`}"
            :animate="{ bottom: `calc((100% / ${useElevator.floorCount}) * (${useElevator.nextPosition ?? useElevator.elevatorPosition} - 1) + 2px)` }"
            :initial="{ bottom: `calc((100% / ${useElevator.floorCount}) * (${useElevator.elevatorPosition} - 1) + 2px)` }"
            :transition="{ duration: durationMove, ease: 'linear' }"
            @update="handleUpdate"
        >
            <motion.div 
                class="door" 
                :animate="useElevator.isDoorOpened ?  { width: '95%' } : { width: '1px' }"
                :initial="{ width: '1px' }"
                :transition="{ duration: 0.6 }"
            />
        </motion.div>
    </div>
</template>

<script setup lang="ts">
import { useElevatorStore } from '@/stores/elevator';
import { motion } from "motion-v"
import { computed } from 'vue';

const useElevator = useElevatorStore();

const durationMove = computed(() => {
    const floorDiff = Math.abs((useElevator.nextPosition ?? useElevator.elevatorPosition) - useElevator.elevatorPosition);
    return floorDiff * 0.6;
});

function onMoving(bottomData: string){
    const positionString = bottomData.split('*')[1]?.charAt(2);
    if(positionString)
        useElevator.onMoving(parseInt(positionString));
}

function handleUpdate(latest: any | undefined){
    const bottom = latest?.bottom;
    if (typeof bottom !== 'string') return;
    onMoving(bottom);
}
</script>

<style lang="scss" scoped>
.container{
    width: 15%;
    height: 100%;
    background-color: rgb(183, 183, 241);
    position: absolute;
    right: 0;
    .elevator{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;
        background-color: rgb(99, 99, 199);
        position: absolute;
        right: 5%;
        bottom: 0;
        z-index: 10;
        .door{
            height: 100%;
            background-color: rgb(150, 150, 250);
        }
    }
}
</style>