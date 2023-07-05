import { Position } from "../topologie/geometrie/position.ts";
import { Orientation } from "../topologie/orientations.ts";
import {Rover} from "./rover.ts";

export interface RoverInterface {
    TourneADroite() : Rover;
    TourneAGauche(): Rover;
    Avancer() : Rover;
    Reculer(): Rover;
    getPosition(): Position;
    getOrientation(): Orientation;
}