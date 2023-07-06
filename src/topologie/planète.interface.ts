import {Point} from "../geometrie/point.ts";

export interface Planète {
    getRevealedObstacles() : Point[];
    Normaliser(position: Point) : Point;
    RévélerObstacle(position: Point): Point[];
    SelonAccessibilité<T>(point: Point, actionSiObstacle: () => T, actionSiLibre: () => T): T;
}