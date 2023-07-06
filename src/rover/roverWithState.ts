import {Orientation} from "../topologie/orientations.ts";
import {Position} from "../geometrie/position.ts";
import {RoverInterface} from "./rover.interface.ts";

export class RoverWithState implements RoverInterface {
    public readonly Orientation: Orientation;
    public readonly Position: Position;

    public constructor(orientation: Orientation, position: Position) {
        this.Orientation = orientation;
        this.Position = position;
    }

    public TourneADroite() : RoverWithState {
        return new RoverWithState(
            this.Orientation.RotationHoraire(),
            this.Position);
    }

    public TourneAGauche() : RoverWithState {
        return new RoverWithState(
            this.Orientation.RotationAntihoraire(),
            this.Position);
    }

    public Avancer() : RoverWithState {
        return new RoverWithState(
            this.Orientation,
            this.Orientation.FaireAvancer(this.Position));
    }

    public Reculer() : RoverWithState {
        return new RoverWithState(
            this.Orientation,
            this.Orientation.FaireReculer(this.Position));
    }

    public getPosition() : Position {
        return new RoverWithState(
            this.Orientation,
            this.Position).Position;
    }

    public getOrientation() : Orientation {
        return new RoverWithState(
            this.Orientation,
            this.Position).Orientation;
    }
}