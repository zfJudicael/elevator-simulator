import type { TDirection } from '@/model/Elevator'
import { defineStore } from 'pinia'

interface Elevator {
    floorCount: number;
    elevatorPosition: number;
    nextPosition: number | null;
    lastPosition: number;
    currentDirection: TDirection;
    isDoorOpened: boolean;
    isMoving: boolean;
    upClient: number[];
    downClient: number[];
    destinations: number[];
}

export const useElevatorStore = defineStore('elevator', {
    state: (): Elevator => ({
        floorCount: 8,
        elevatorPosition: 1,
        lastPosition: 1,
        nextPosition: null,
        currentDirection: "idle",
        isDoorOpened: false,
        isMoving: false,
        upClient: [],
        downClient: [],
        destinations: [],
    }),
    actions: {
        addClient(floor: number, upDirection = true) {
            const targetList = upDirection ? this.upClient : this.downClient;
            if (!targetList.includes(floor)) {
                targetList.push(floor);
                this.sortFloors(targetList, upDirection);
            }
            if(!this.isDoorOpened) this.setNextPosition();
        },

        addDestination(floor: number) {
            if (!this.destinations.includes(floor)) {
                this.destinations.push(floor);
                this.sortFloors(this.destinations, floor > this.elevatorPosition);
            }
            if(!this.isDoorOpened) this.setNextPosition();
        },

        sortFloors(list: number[], ascending: boolean) {
            list.sort((a, b) => (ascending ? a - b : b - a));
        },

        setNextPosition() {
            if (this.isIdle()) {
                this.currentDirection = "idle";
                this.nextPosition = null;
                return;
            }

            const candidates = this.getCandidates();
            if (candidates.length > 0) {
                this.nextPosition = this.findClosestFloor(candidates);
            } else {
                this.switchDirection();
                this.setNextPosition();
            }
        },

        isIdle() {
            return (
                this.upClient.length === 0 &&
                this.downClient.length === 0 &&
                this.destinations.length === 0
            );
        },

        getCandidates(): number[] {
            if (this.currentDirection === "up") {
                return [...this.destinations, ...this.upClient].filter(
                    (floor) => floor > this.elevatorPosition
                );
            } else if (this.currentDirection === "down") {
                return [...this.destinations, ...this.downClient].filter(
                    (floor) => floor < this.elevatorPosition
                );
            }
            return [];
        },

        findClosestFloor(candidates: number[]): number {
            return this.currentDirection === "up"
                ? Math.min(...candidates)
                : Math.max(...candidates);
        },

        switchDirection() {
            this.currentDirection =
                this.currentDirection === "up" ? "down" : "up";
        },

        onMoving(position: number) { 
            if(position != this.elevatorPosition){
                this.elevatorPosition = position;
                this.isMoving = true;
                if(position === this.nextPosition){
                    this.onArriveDestination();
                }
            }
        },

        onArriveDestination() {
            this.destinations = this.destinations.filter(
                (floor) => floor !== this.elevatorPosition
            );
            if (this.currentDirection === "up") {
                this.upClient = this.upClient.filter(
                    (floor) => floor !== this.elevatorPosition
                );
            } else {
                this.downClient = this.downClient.filter(
                    (floor) => floor !== this.elevatorPosition
                );
            }
            this.lastPosition = this.elevatorPosition;
            this.isMoving = false;
            this.openDoor();
        },
        
        openDoor(){
            setTimeout(() => {
                this.isDoorOpened = true
            }, 1000);
            setTimeout(()=>{
                this.isDoorOpened = false
                setTimeout(() => {
                    this.setNextPosition();
                }, 1000);
            }, 4000)
        },
    },
});