import {Point} from "../geometrie/point.ts";

export interface PossèdeObstacles {
    EstAccessible(point: Point): boolean;
}