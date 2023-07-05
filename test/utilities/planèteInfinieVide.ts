import {Planète} from "../../src/topologie/planète.interface";
import {Point} from "../../src/topologie/geometrie/point";

export class PlanèteInfinieVide implements Planète {
    Normaliser(point: Point): Point {
        return point;
    }

    SelonAccessibilité<T>(point: Point, actionSiObstacle: () => T, actionSiLibre: () => T): T {
        return actionSiLibre();
    }
}