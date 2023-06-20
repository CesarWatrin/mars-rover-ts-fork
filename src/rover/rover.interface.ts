import {Rover} from "./rover.ts";

export interface RoverInterface {
    TourneADroite() : Rover;
    TourneAGauche(): Rover;
    Avancer() : Rover;
    Reculer(): Rover;
}