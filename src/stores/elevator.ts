import type { IElevator } from '@/model/Elevator'
import { defineStore } from 'pinia'

export const useElevatorStore = defineStore('elevator', {
    state: (): IElevator => ({
        floorCount: 8,
        elevatorPosition: 1,
        nextPosition: null,
        currentDirection: "idle",
        isDoorOpened: false,
        isMoving: false,
        upClient: [],
        downClient: [],
        destinations: [],
        clientsTransported: 0,
        totalTravel: 0,
    }),
    actions: {
        addClient(floor: number, upDirection = true) {
            if(floor === this.elevatorPosition && this.currentDirection === "idle") {
                this.isDoorOpened = true;
                this.currentDirection = upDirection ? "up" : "down";
            }
            else {
                const targetList = upDirection ? this.upClient : this.downClient;
                if (!targetList.includes(floor)) {
                    targetList.push(floor);
                    this.sortFloors(targetList, upDirection);
                }
                if(!this.isDoorOpened && (this.elevatorPosition != this.nextPosition)) this.setNextPosition();
            }
        },

        addDestination(floor: number) {
            this.destinations.push(floor);
            this.sortFloors(this.destinations, floor > this.elevatorPosition);
            if(this.isDoorOpened) this.setNextPosition();
        },

        sortFloors(list: number[], ascending: boolean) {
            list.sort((a, b) => (ascending ? a - b : b - a));
        },

        setNextPosition() {
            if(this.isDoorOpened){
                this.isDoorOpened = false;
                setTimeout(() => {
                    this.calculNextPosition();
                }, 1000);
            } else {
                this.calculNextPosition();
            }
        },

        calculNextPosition() {
            if (this.isIdle()) {
                this.currentDirection = "idle";
                this.nextPosition = null;
                return;
            }

            const candidates = this.getCandidates();
            if (candidates.length > 0) {
                this.nextPosition = this.findClosestFloor(candidates);
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
                let candidate = [...this.destinations, ...this.upClient].filter(
                    (floor) => floor > this.elevatorPosition
                );

                if(candidate.length > 0) return candidate;
                else this.currentDirection = "idle"
            } 
            
            if (this.currentDirection === "down") {
                let candidate = [...this.destinations, ...this.downClient].filter(
                    (floor) => floor < this.elevatorPosition
                );

                if(candidate.length > 0) return candidate;
                else this.currentDirection = "idle"
            } 

            if(this.upClient.length > 0) {
                    this.currentDirection = "up";
                    return this.upClient;
            }else if(this.downClient.length > 0){
                    this.currentDirection = "down";
                    return this.downClient;
            }else return [];
        },

        findClosestFloor(candidates: number[]): number {
            return this.currentDirection === "up"
                ? Math.min(...candidates)
                : Math.max(...candidates);
        },

        switchDirection() {
            this.currentDirection =
                this.currentDirection === "up" || this.currentDirection === "idle" ? "down" : "up";
        },

        onMoving(position: number) { 
            this.isMoving = true;
            if(position != this.elevatorPosition){
                this.totalTravel++;
                this.elevatorPosition = position;
                if(position === this.nextPosition){
                    this.onArriveDestination();
                }
            } else if(position === this.nextPosition){
                this.isMoving = false;
            }
        },

        onArriveDestination() {
            this.isMoving = false;

            setTimeout(() => {
                this.isDoorOpened = true
                let closeAuto = true;
    
                this.clientsTransported += this.destinations.filter(
                    (floor) => floor === this.elevatorPosition
                ).length; 
                this.destinations = this.destinations.filter(
                    (floor) => floor !== this.elevatorPosition
                );
    
                if (this.currentDirection === "up") {
                    if(this.upClient.includes(this.elevatorPosition)){
                        closeAuto = false;
                    }
                    this.upClient = this.upClient.filter(
                        (floor) => floor !== this.elevatorPosition
                    );
                } else {
                    if(this.downClient.includes(this.elevatorPosition)){
                        closeAuto = false;
                    }
                    this.downClient = this.downClient.filter(
                        (floor) => floor !== this.elevatorPosition
                    );
                }
    
                if(closeAuto) {
                    setTimeout(() => this.setNextPosition(), 3000);
                }
            }, 1000);
        },
    },
});