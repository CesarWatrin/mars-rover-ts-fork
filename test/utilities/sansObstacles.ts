import {PossèdeObstacles} from "../../src/topologie/possedeObstacles.interface";
import {Point} from "../../src/geometrie/point";

export class SansObstacles implements PossèdeObstacles {
    EstAccessible(_: Point): boolean {
        return true;
    }

}