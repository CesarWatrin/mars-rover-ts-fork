import {Rover} from "./rover.ts";
import {RoverInterface} from "./rover.interface.ts";

export class InterpréteurRover implements RoverInterface {
    private _rover: RoverInterface;
    public constructor(roverCommandé: RoverInterface) {
        this._rover = roverCommandé;
    }

    public Interpréter(commande: string) : InterpréteurRover {
        if(commande.length > 1) {
            return this.Interpréter(commande[0]).Interpréter(commande.slice(1));
        }

        if(commande == "A") return new InterpréteurRover(this._rover.Avancer());
        if(commande == "R") return new InterpréteurRover(this._rover.Reculer());
        if(commande == "D") return new InterpréteurRover(this._rover.TourneADroite());
        if(commande == "G") return new InterpréteurRover(this._rover.TourneAGauche());

        throw new Error();
    }

    Avancer(): Rover {
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
}