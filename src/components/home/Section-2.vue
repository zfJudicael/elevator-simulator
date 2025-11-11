<template>
    <div class="section-2">
        <div class="header">
            <h2>Fonctionnalités Principales</h2>
            <p>Un système complet de simulation avec toutes les fonctionnalités d'un ascenseur moderne professionnel</p>
        </div>
        <div class="card-group">
            <template v-for="(feature, index) in features" :key="index">
                <div class="card-item">
                    <div class="icon-container" :style="feature.style">
                        <i :class="feature.icon"></i>
                    </div>
                    <p class="label">{{ feature.label }}</p>
                    <p class="description">{{ feature.description }}</p>
                </div>
            </template>
        </div>
        <div class="container">
            <p>Prêt à Explorer ?</p>
            <h2>Lancez la simulation maintenant et découvrez comment fonctionne un système d'ascenseur intelligent</h2>
            <div class="btn" @click="$router.push({ name: 'simulator' })">
                Commencer maintenant <i class="pi pi-arrow-right"></i>
            </div>
        </div>
        <p class="footer-text">Simulateur d'Ascenseur - Système de gestion intelligent</p>
    </div>
</template>

<script setup lang="ts">
import { useElevatorStore } from '@/stores/elevator';

const useElevator = useElevatorStore();

const features = [
    {
        icon: 'pi pi-building',
        style: 'background: linear-gradient(135deg, #2087fe, #00b0e0);',
        label: `Immeuble de ${useElevator.floorCount - 1} Étages`,
        description: "Simulation réaliste d'un bâtiment moderne avec gestion multi-étages"
    },
    {
        icon: 'pi pi-users',
        style: 'background: linear-gradient(135deg, #b548f8, #ec3ba7);',
        label: 'Gestion des Passagers',
        description: "Prise en compte des appels d'étages et des destinations des passagers"
    },
    {
        icon: 'pi pi-bolt',
        style: 'background: linear-gradient(135deg, #ff6000, #fa3a2e);',
        label: 'Temps Réel',
        description: "Animations fluides et déplacements en temps réel entre les étages"
    },
    {
        icon: 'pi pi-chart-line',
        style: 'background-color: #00bc8a;',
        label: 'Statistiques Détaillées',
        description: "Suivi complet des performances de l'ascenseur et de l'efficacité du système"
    },
    {
        icon: 'pi pi-gauge',
        style: 'background: linear-gradient(135deg, #6d5cfe, #a34aff);',
        label: 'Algorithme Optimisé',
        description: "Optimisation des trajets pour minimiser les temps d'attente et maximiser l'efficacité"
    },
    {
        icon: 'pi pi-shield',
        style: 'background-color: #fd276a;',
        label: 'Contrôle Sécurisé',
        description: "Simulation des protocoles de sécurité modernes pour assurer un fonctionnement fiable"
    }
];
</script>

<style lang="scss" scoped>
.section-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 10% 20px;
    .header {
        max-width: 700px;
        text-align: center;
        margin-bottom: 40px;

        h2 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
            color: #111827;
        }

        p {
            font-size: 16px;
            color: #3f3e3e;
        }
    }
    .card-group {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
        width: 100%;
        margin-bottom: 160px;
        
        .card-item {
            display: flex;
            flex-direction: column;
            align-items: start;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 30px;
            cursor: pointer;
            transition: transform 0.3s ease;

            .icon-container {
                width: 60px;
                height: 60px;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                i {
                    color: #fff;
                    font-size: 1.6rem;
                }
            }
            .label {
                font-size: 18px;
                color: #111827;
            }
            .description {
                font-size: 15px;
                color: #4b5563;
            }

            &:hover {
                transform: translateY(-10px);
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
            }
        }
    }

    .container {
        width: 100%;
        padding: 80px 20px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 20px;
        border-radius: 15px;
        margin-bottom: 120px;
        background: linear-gradient(135deg, #3b82f6, #ef4444);
        h2 {
            font-size: 28px;
            font-weight: 500;
            max-width: 1000px;
        }
        p {
            font-size: 16px;
            margin: 0;
        }
        .btn {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            font-weight: bold;
            padding: 15px 30px;
            color: #8a67a8;
            border-radius: 30px;
            background-color: #fff;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.4s ease;

            &:hover {
                transform: translateY(-5px);
            }
        }
    }

    .footer-text {
        font-size: 14px;
        color: #4b5563;
        margin-top: 20px;
    }
}
</style>