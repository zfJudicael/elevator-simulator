<template>
    <div class="section-1">
        <div class="simulator-system">
            <span class="signal"></span>
            <span>Système de simulation avancé</span>
        </div>

        <p class="subtitle-colored">Simulateur d'Ascenseur</p>

        <h2 class="title">Découvrez le fonctionnement d'un système d'ascenseur moderne avec gestion intelligente des passagers et optimisation des trajets</h2>

        <p class="subtitle">Une simulation interactive et réaliste pour comprendre les algorithmes de gestion d'ascenseur et l'efficacité des systèmes de transport vertical</p>

        <button @click="navigateToSimulator">Démarrer la Simulation <i class="pi pi-arrow-right"></i></button>

        <div class="card-group">
            <template v-for="(card, index) in cardInfo" :key="index">
                <div class="card">
                    <p v-if="card.value !== null" class="value" :style="{color: card.color}">{{ card.value }}</p>
                    <span v-else> &infin;</span>
                    <p class="label">{{ card.label }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useElevatorStore } from '@/stores/elevator';

const router = useRouter();
const useElevator = useElevatorStore();

const navigateToSimulator = () => {
  router.push({ name: 'simulator' });
};

const cardInfo = computed(() => [
    { value: useElevator.floorCount - 1, label: 'Étages', color: '#3b82f6' },
    { value: '1s', label: 'Par Étage', color: '#ef4444' },
    { value: null, label: 'Simulations' },
]);
</script>

<style lang="scss" scoped>
.section-1 {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, #3b83f686 0%,  #eaf1ff 15%, #eaf1ff 85%, #ef444452 100%);

    .simulator-system {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 10px 15px;
        border-radius: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-weight: 400;
        font-size: 14px;
        .signal {
            width: 10px;
            height: 10px;
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

    .subtitle-colored {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 40px;
        display: inline-block;
        color: transparent;
        background: linear-gradient(to right, #3b82f6, #ef4444);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .title {
        font-size: 30px;
        font-weight: 500;
        text-align: center;
        margin-bottom: 20px;
        max-width: 1200px;
    }
    
    .subtitle {
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        margin-bottom: 50px;
        max-width: 800px;
        color: #3f3e3e;
    }

    button {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: bold;
        padding: 15px 30px;
        border: none;
        border-radius: 30px;
        color: #fff;
        background: linear-gradient(to right, #3b82f6, #ef4444);
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.4s ease;

        &:hover {
            transform: translateY(-5px);
        }
    }

    .card-group {
        display: flex;
        gap: 30px;
        margin-top: 100px;

        .card {
            background-color: #fff;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .value {
                font-size: 32px;
                margin-bottom: 10px;
                font-weight: bold;
            }

            span {
                font-size: 70px;
                color: #00bc8b;
            }

            .label {
                font-size: 16px;
                color: #3f3e3e;
            }
        }
    }
}
</style>
