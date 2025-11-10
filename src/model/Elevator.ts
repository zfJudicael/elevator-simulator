export type TDirection = "up" | "down" | "idle"

export interface IElevator{
    floorCount: number;
    elevatorPosition: number;
    nextPosition: number | null;
    currentDirection: TDirection;
    isDoorOpened: boolean;
    isMoving: boolean;
    upClient: number[];
    downClient: number[];
    destinations: number[];
    clientsTransported: number;
    totalTravel: number;
}