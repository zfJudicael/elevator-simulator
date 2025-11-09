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
    <div class="controller">
        <div class="control-panel">
            <div class="header">
                <span>Control panel</span>
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
                    {{ floor }}
                </button>
            </div>
        </div>
        <div class="dashboard-panel">Dashboard</div>
    </div>
</template>

<style lang="scss" scoped>
.controller {
    display: flex;
    flex-direction: column;
    gap: 20px;

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
            grid-template-columns: auto auto auto auto;
            button {
                background-color: #f1f1f1;
                border: none;
                padding: 25px;
                border-radius: 10px;
                text-align: center;
                font-size: large;
                transition: 0.5s;
            }
            .not_disabled:hover {
                background-color: #85dfa6;
                cursor: pointer;
            }
            .actif {
                background-color: #22C55E;
            }
        }
    }
    .dashboard-panel {
        padding: 20px;
        border-radius: 15px;
        background-color: #F5F7FA;
    }
}
</style>