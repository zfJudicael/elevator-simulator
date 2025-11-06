import { useGenerateId } from "@/composables/useGenerateId"


export type TDirection = "up" | "down" | "idle"

export interface IQueue{
    id: string
    callPoint: number
    direction: TDirection
    destination?: number
    startedAt: number
}

export interface IElevator{
    floorCount: number
    elevatorPosition: number
    currentDirection: TDirection 
    isDoorOpened: boolean
    isMoving: boolean

    upQueue: IQueue[]
    downQueue: IQueue[]
}

export class Elevator implements IElevator{
    floorCount: number 
    elevatorPosition: number
    currentDirection: TDirection
    isDoorOpened: boolean
    isMoving: boolean

    upQueue: IQueue[]
    downQueue: IQueue[]

    constructor(params: IElevator){
        this.floorCount = params.floorCount
        this.elevatorPosition = params.elevatorPosition
        this.currentDirection = params.currentDirection
        this.isDoorOpened = params.isDoorOpened
        this.isMoving = params.isMoving
        this.upQueue = []
        this.downQueue = []
    }

    addQueue(callPoint: number, direction: TDirection){
        let newQueue: IQueue = {
            id: useGenerateId(25),
            callPoint: callPoint,
            direction: direction,
            startedAt: Date.now()
        }

        if(direction == "up") this.upQueue.push(newQueue)
        else this.downQueue.push(newQueue)

        if(!this.isMoving) {
            this.currentDirection = direction
            this.move()
        }
    }    

    move(){
        if(this.currentDirection == "up"){
            this.moveUp()
        }else{
            this.moveDown()
        }
    }

    setCurrentDirection(){
        if(this.currentDirection == 'up' && this.upQueue){

        }
    }

    moveUp(){
        if(this.upQueue[0]){
            if(this.elevatorPosition < this.upQueue[0]?.callPoint){
                let intervalId = setInterval(()=>{
                    if(this.elevatorPosition < this.upQueue[0]!.callPoint){
                        this.elevatorPosition++
                    }
                    if(this.elevatorPosition == this.upQueue[0]?.callPoint) {
                        this.openDoor()
                        this.upQueue.shift()
                        this.isMoving = false
                        clearInterval(intervalId)
                    }
                }, 1000)
            }
        }
    }

    moveDown(){
        if(this.downQueue[0]){
            if(this.elevatorPosition > this.downQueue[0]?.callPoint){
                let intervalId = setInterval(()=>{
                    if(this.elevatorPosition > this.downQueue[0]!.callPoint){
                        this.elevatorPosition--
                    }
                    if(this.elevatorPosition == this.downQueue[0]?.callPoint) {
                        this.openDoor()
                        this.downQueue.shift()
                        this.isMoving = false
                        clearInterval(intervalId)
                    }
                }, 1000)
            }
        }
    }

    nextMove(){
        if(this.currentDirection == 'up' && this.upQueue.length> 0 ){}
    }

    openDoor(){
        this.isDoorOpened = true
        setTimeout(()=>{
            this.isDoorOpened = false
        }, 2000)
    }
}