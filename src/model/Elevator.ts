export type TDirection = "up" | "down" 

export interface IElevator{
    floorCount: number
    elevatorPosition: number
    currentDirection: TDirection 
    isDoorOpened: boolean
}

export class Elevator implements IElevator{
    floorCount: number 
    elevatorPosition: number
    currentDirection: TDirection
    isDoorOpened: boolean

    constructor(params: IElevator){
        this.floorCount = params.floorCount
        this.elevatorPosition = params.elevatorPosition
        this.currentDirection = params.currentDirection
        this.isDoorOpened = params.isDoorOpened
    }

    
}