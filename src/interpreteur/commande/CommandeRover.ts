import {RoverInterface} from "../../rover/rover.interface.ts";

export interface CommandeRover{
    ExécuterSur(rover: RoverInterface) : RoverInterface;
}