import {CommandeRover} from "./CommandeRover.ts";
import {RoverInterface} from "../../rover/rover.interface.ts";

export class CommandeSimple implements CommandeRover {
    private readonly _letter : string;

    constructor(commandeElement: string) {
        if(commandeElement.length != 1) throw new Error("Not a simple command");

        this._letter = commandeElement;
    }

    ExécuterSur(rover: RoverInterface): RoverInterface {
        if(this._letter == "A") return rover.Avancer();
        if(this._letter == "R") return rover.Reculer();
        if(this._letter == "D") return rover.TourneADroite();
        if(this._letter == "G") return rover.TourneAGauche();
        throw new Error("Not a valid command");
    }

}