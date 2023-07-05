import {Orientation} from "../topologie/orientations.ts";
import {Position} from "../geometrie/position.ts";
import {RoverInterface} from "./rover.interface.ts";

export class Rover implements RoverInterface {
    public readonly Orientation: Orientation;
    public readonly Position: Position;

    public constructor(orientation: Orientation, position: Position) {
        this.Orientation = orientation;
        this.Position = position;
    }

    public TourneADroite() : Rover {
        return new Rover(
            this.Orientation.RotationHoraire(),
            this.Position);
    }

    public TourneAGauche() : Rover {
        return new Rover(
            this.Orientation.RotationAntihoraire(),
            this.Position);
    }

    public Avancer() : Rover {
        return new Rover(
            this.Orientation,
            this.Orientation.FaireAvancer(this.Position));
    }

    public Reculer() : Rover {
        return new Rover(
            this.Orientation,
            this.Orientation.FaireReculer(this.Position));
    }

    public getPosition() : Position {
        return new Rover(
            this.Orientation,
            this.Position).Position;
    }
}