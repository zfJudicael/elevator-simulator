<template>
    <div class="apartment">
        <template v-for="floor in elevator.floorCount">
            <div class="floor">
                <div class="queue">
                    <div class="updownButton">
                        <p class="up">Up</p>
                        <p class="down">Down</p>
                    </div>
                </div>
                <div class="door">
                    <div class="left" 
                    :class="{
                        active : isElevatorOnFloor(floor), 
                        open: elevator.isDoorOpened && isElevatorOnFloor(floor) 
                    }"
                    ></div>
                    <div class="right" 
                    :class="{
                        active : isElevatorOnFloor(floor), 
                        open: elevator.isDoorOpened && isElevatorOnFloor(floor)
                    }"
                    ></div>
                </div>
            </div>
            <div class="separator" v-if="floor != elevator.floorCount"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Elevator } from '@/model/Elevator';

const props = defineProps({
    elevator: {
        type : Elevator,
        required: true
    }
})

const isElevatorOnFloor = (floor: number)=>{
    return props.elevator.elevatorPosition == floor
}
</script>

<style lang="scss">
.apartment{
    border: 2px solid grey;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column-reverse;
    
    .floor{
        height: 130px;
        display: flex;


        .queue{
            width: 80%;

            .updownButton{
                display: flex;
                gap: 1px;

                .up, .down{
                    padding: 5px 10px;
                    border-radius: 5px;
                    color: white;

                    &:hover{
                        cursor: pointer;
                    }
                }

                .up{
                    background-color: green;
                }

                .down{
                    background-color: blue;
                }
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
        background-color: grey;
    }
}

</style>