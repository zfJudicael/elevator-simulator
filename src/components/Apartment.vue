<template>
    <div class="apartment">
        <template v-for="floor in elevator.floorCount">
            <div class="floor">
                <p class="title">
                    <template v-if="floor !== 1">
                        <span>{{ floor - 1 }}</span>
                        <sup class="">{{ (floor - 1) === 1 ? 'er' : 'ème' }}</sup> étage
                    </template>
                    <template v-else>
                        Rez-de-chaussée
                    </template>
                </p>
                <div class="updownButton">
                    <i :class="{
                            'pi pi-arrow-up btn' : true,
                            'hide': floor == elevator.floorCount 
                        }"
                        @click="elevator.addClient(floor)">
                    </i>
                    <i :class="{
                            'pi pi-arrow-down btn': true,
                            'hide': floor == 1
                        }"
                        @click="elevator.addClient(floor, false)">
                    </i>
                </div>
            </div>
            <div class="separator" v-if="floor != elevator.floorCount"></div>
        </template>
        <Elevator />
    </div>
</template>

<script setup lang="ts">
import { useElevatorStore } from '@/stores/elevator';
import Elevator from './Elevator.vue';

const elevator = useElevatorStore();

</script>

<style lang="scss">
.apartment{
    width: 75%;
    display: flex;
    flex-direction: column-reverse;
    background-color: #F5F7FA;
    border-radius: 15px;
    position: relative;

    .floor{
        height: 100px;
        display: flex;
        align-items: center;
        padding-right: calc(15% + 20px);
        padding-left: 20px;
        justify-content: space-between;

        .title{
            font-size: 1.2rem;
        }
        .updownButton{
            display: flex;
            gap: 10px;
            justify-content: start;
            .btn {
                font-size: 1rem;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid grey;
                color: grey;
                display: flex;
                align-items: center;
            }
            .hide{
                visibility: hidden;
            }
        }
        .door{
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            gap: 1px;

            .left{
                height: 100%;
                width: 50%;
                background-color: rgb(121, 121, 245);
                transition: width 1s;

                &.active{
                    background-color: rgb(70, 70, 232);
                }

                &.open{
                    width: 1%;
                }
            }

            .right{
                height: 100%;
                width: 50%;
                background-color: rgb(121, 121, 245);
                transition: width 1s;

                &.active{
                    background-color: rgb(70, 70, 232);
                }

                &.open{
                    width: 1%;
                }
            }
        }
    }

    .separator{
        padding: 1px;
        background-color: white;
        z-index: 1;
    }
}

</style>