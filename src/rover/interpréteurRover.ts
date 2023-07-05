import {Rover} from "./rover.ts";
import {RoverInterface} from "./rover.interface.ts";
import {CommandeRover} from "../interpreteur/commande/CommandeRover.ts";

export class InterpréteurRover implements RoverInterface {
    private readonly _rover: RoverInterface;

    public constructor(roverCommandé: RoverInterface) {
        this._rover = roverCommandé;
    }

    public Interpréter(commande: CommandeRover) : InterpréteurRover {
        return new InterpréteurRover(commande.ExécuterSur(this._rover));
    }

    public Avancer(): Rover {
        return this._rover.Avancer();
    }

    Reculer(): Rover {
        return this._rover.Reculer();
    }

    TourneADroite(): Rover {
        return this._rover.TourneADroite();
    }

    TourneAGauche(): Rover {
        return this._rover.TourneAGauche();
    }
    getPosition() {
        return this._rover.getPosition()
    }
    getOrientation() {
        return this._rover.getOrientation()
    }
}