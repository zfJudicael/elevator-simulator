<script setup lang="ts">
import { useElevatorStore } from '@/stores/elevator';
const useElevator = useElevatorStore();

function newDestination(floor: number){
    useElevator.addDestination(floor);
}

const disabledButton = (floor: number)=>{
    return (
        useElevator.isMoving ||
        useElevator.elevatorPosition === floor ||
        !useElevator.isDoorOpened ||
        (useElevator.currentDirection === 'up' && floor < useElevator.elevatorPosition) ||
        (useElevator.currentDirection === 'down' && floor > useElevator.elevatorPosition));
}

</script>

<template>
    <div class="control-panel">
        <div class="header">
            <span>Panneau de Contrôle</span>
            <span class="signal"></span>
        </div>
        <div class="floor-group">
            <button 
                v-for="floor in useElevator.floorCount"
                @key="floor"
                :class="{ not_disabled: !disabledButton(floor) }" 
                :disabled="disabledButton(floor)"
                @click="newDestination(floor)"
            >
                {{ floor == 1 ? 'RDC' : floor - 1 }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.control-panel {
    padding: 20px;
    border-radius: 15px;
    background-color: #F5F7FA;
    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .signal {
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background-color: #22C55E;
            opacity: 1;
            animation: pulse 3s ease-in-out infinite;

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.2; }
            }
        }
    }

    .floor-group {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(4, 1fr);
        button {
            border: none;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            font-size: large;
            transition: 0.5s;
            background-color: #f1f1f1;
        }
        .not_disabled {
            background-color: #fff;
            &:hover {
                background-color: #85dfa6;
                cursor: pointer;
            }
        }
        .actif {
            background-color: #22C55E;
        }
    }
}
</style>