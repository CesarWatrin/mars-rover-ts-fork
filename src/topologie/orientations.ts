import {Position} from "../geometrie/position.ts";

export interface Orientation {
    RotationHoraire() : Orientation;
    RotationAntihoraire() : Orientation;
    FaireAvancer(position : Position) : Position;
    FaireReculer(position : Position) : Position;
    toString(): string;
}

class OrientationNord implements Orientation {
    public static Instance = new OrientationNord();

    private constructor(){
    }

    FaireAvancer(position: Position): Position {
        return position.IncrémenterLatitudeSaufObstacle();
    }

    FaireReculer(position: Position): Position {
        return position.DécrémenterLatitudeSaufObstacle();
    }

    RotationAntihoraire(): Orientation {
        return Orientations.Ouest;
    }

    RotationHoraire(): Orientation {
        return Orientations.Est;
    }

    toString(): string {
        return "Nord";
    }
}

class OrientationSud implements Orientation {
    public static Instance = new OrientationSud();

    private constructor(){
    }

    FaireAvancer(position: Position): Position {
        return position.DécrémenterLatitudeSaufObstacle();
    }

    FaireReculer(position: Position): Position {
        return position.IncrémenterLatitudeSaufObstacle();
    }

    RotationAntihoraire(): Orientation {
        return Orientations.Est;
    }

    RotationHoraire(): Orientation {
        return Orientations.Ouest;
    }

    toString(): string {
        return "Sud";
    }
}

class OrientationEst implements Orientation {
    public static Instance = new OrientationEst();

    private constructor(){
    }

    FaireAvancer(position: Position): Position {
        return position.IncrémenterLongitudeSaufObstacle();
    }

    FaireReculer(position: Position): Position {
        return position.DécrémenterLongitudeSaufObstacle();
    }

    RotationAntihoraire(): Orientation {
        return Orientations.Nord;
    }

    RotationHoraire(): Orientation {
        return Orientations.Sud;
    }

    toString(): string {
        return "Est";
    }
}

class OrientationOuest implements Orientation {
    public static Instance = new OrientationOuest();

    private constructor(){
    }

    FaireAvancer(position: Position): Position {
        return position.DécrémenterLongitudeSaufObstacle();
    }

    FaireReculer(position: Position): Position {
        return position.IncrémenterLongitudeSaufObstacle();
    }

    RotationAntihoraire(): Orientation {
        return Orientations.Sud;
    }

    RotationHoraire(): Orientation {
        return Orientations.Nord;
    }

    toString(): string {
        return "Ouest";
    }
}

export class Orientations {
    static Nord: Orientation = OrientationNord.Instance;
    static Sud: Orientation = OrientationSud.Instance;
    static Est: Orientation = OrientationEst.Instance;
    static Ouest: Orientation = OrientationOuest.Instance;
}