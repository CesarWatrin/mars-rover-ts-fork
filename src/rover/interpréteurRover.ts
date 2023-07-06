import {RoverWithState} from "./roverWithState.ts";
import {RoverInterface} from "./rover.interface.ts";
import {CommandeRover} from "./commande/CommandeRover.ts";

export class InterpréteurRover implements RoverInterface {
    private readonly _rover: RoverInterface;

    public constructor(roverCommandé: RoverInterface) {
        this._rover = roverCommandé;
    }

    public Interpréter(commande: CommandeRover) : InterpréteurRover {
        return new InterpréteurRover(commande.ExécuterSur(this._rover));
    }

    public Avancer(): RoverWithState {
        return this._rover.Avancer();
    }

    Reculer(): RoverWithState {
        return this._rover.Reculer();
    }

    TourneADroite(): RoverWithState {
        return this._rover.TourneADroite();
    }

    TourneAGauche(): RoverWithState {
        return this._rover.TourneAGauche();
    }

    getPosition() {
        return this._rover.getPosition()
    }
    getOrientation() {
        return this._rover.getOrientation()
    }
}