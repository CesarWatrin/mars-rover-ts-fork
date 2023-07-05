import {Planète} from "./planète.interface.ts";
import {Point} from "./geometrie/point.ts";
import {Entier} from "../math/Entier.ts";

export class PlanèteToroïdaleVide implements Planète {
    private readonly _pointMax : Point;

    constructor(taille: Entier) {
        this._pointMax = new Point(taille, taille);
    }

    Normaliser(point: Point): Point {
        return point.Modulo2D(this._pointMax);
    }

    SelonAccessibilité<T>(point: Point, actionSiObstacle: () => T, actionSiLibre: () => T): T {
        return actionSiLibre();
    }
}