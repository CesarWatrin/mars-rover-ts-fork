import { Position } from "../geometrie/position.ts";
import { Orientation } from "../topologie/orientations.ts";
import {RoverWithState} from "./roverWithState.ts";

export interface RoverInterface {
    TourneADroite() : RoverWithState;
    TourneAGauche(): RoverWithState;
    Avancer() : RoverWithState;
    Reculer(): RoverWithState;
    getPosition(): Position;
    getOrientation(): Orientation;
}