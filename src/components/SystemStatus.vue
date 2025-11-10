<template>
    <div class="dashboard-panel">
        <div class="header">
            <div class="border-left"></div>
            <span>État du Système</span>
        </div>
        <div class="card-group">
            <template v-for="(card, index) in cardData" :key="index">
                <div class="card" :style="{ backgroundColor: backgroundCard(card.color) }">
                    <div class="icon-container" :style="{ backgroundColor: card.color }">
                        <i :class="`pi ${card.icon}`"></i>
                    </div>
                    <p class="label">{{ card.label }}</p>
                    <p class="value">{{ card.value }}</p>
                </div>
            </template>
        </div>
        <div class="list-stat">
            <template v-for="(stat, index) in statData" :key="index">
                <div class="item">
                    <p>{{ stat.label }}</p>
                    <span :style="{ backgroundColor: stat.color}">{{ stat.value }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useElevatorStore } from '@/stores/elevator';
import { computed } from 'vue';

const  useElevator = useElevatorStore();

const cardData = computed(() => [
    {
        label: 'Statut',
        value: useElevator.isMoving ? 'En mouvement' : 'Inactif',
        icon: 'pi-wave-pulse',
        color: useElevator.isMoving ? '#3b82f6' : '#9AA6C4'
    },
    {
        label: "Direction Actuelle",
        value: useElevator.currentDirection === 'idle' ? 'Au repos' : (useElevator.currentDirection === 'up' ? 'Montée' : 'Descente'),
        icon: useElevator.currentDirection === 'idle' ? 'pi-pause' : (useElevator.currentDirection === 'up' ? 'pi-arrow-up' : 'pi-arrow-down'),
        color: useElevator.currentDirection === 'idle' ? '#F59E0B' : (useElevator.currentDirection === 'up' ? '#3b82f6' : '#ef4444')    
    },
    {
        label: "Portes",
        value: useElevator.isDoorOpened ? 'Ouvertes' : 'Fermées',
        icon: useElevator.isDoorOpened ? 'pi-lock-open' : 'pi-lock',
        color: useElevator.isDoorOpened ? '#10b981' : '#ef4444'
    },
    {
        label: "Clients à Bord",
        value: useElevator.destinations.length,
        icon: 'pi-users',
        color: '#6366F1'
    },
]);

const statData = computed(() => {
    return [
        {
            label: 'Étage Actuel',
            value: useElevator.elevatorPosition > 1 ? useElevator.elevatorPosition - 1 : 'RDC',
            color: '#3b82f6'
        },
        {
            label: 'Clients en Attente',
            value: useElevator.upClient.length + useElevator.downClient.length,
            color: '#F59E0B'
        },
        {
            label: 'Clients Transportés',
            value: useElevator.clientsTransported,
            color: '#10b981'
        },
        {
            label: 'Distance Totale Parcourue',
            value: useElevator.totalTravel + ' étages',
            color: '#6366F1'
        }
    ];
});

function backgroundCard(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
}
</script>

<style lang="scss" scoped>
.dashboard-panel {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border-radius: 15px;
    background-color: #F5F7FA;

    .header {
        display: flex;
        align-items: center;
        .border-left {
            width: 4px;
            height: 20px;
            margin-right: 10px;
            background: linear-gradient(to bottom, #3b82f6, rgb(248, 22, 154));
        }
    }
    .card-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, auto);
        gap: 15px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 30px;
        .card {
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            .icon-container {
                font-size: 24px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                color: #fff;
            }
            .label {
                margin: 5px 0;
                font-size: 14px;
                color: #666666;
            }
            .value {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
            }
        }    
    }
    .list-stat {
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
            font-size: 14px;

            p {
                margin: 0;
                color: #000;
            }
            span {
                padding: 4px 10px;
                border-radius: 20px;
                font-weight: bold;
                color: #fff;
            }
        }
    }
}
</style>