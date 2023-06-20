import {PossèdeObstacles} from "../../src/topologie/possedeObstacles.interface";
import {SystèmeCoordonnées} from "../../src/topologie/systèmeCoordonnées.interface";
import {Point} from "../../src/geometrie/point";

export class PlanèteAvecObstacles implements PossèdeObstacles, SystèmeCoordonnées {
    private _decorated: SystèmeCoordonnées;
    private _obstacles: Point[];

    public constructor(decorated: SystèmeCoordonnées) {
        this._decorated = decorated;
        this._obstacles = [];
    }

    public AjouterObstacle(point: Point){
        this._obstacles.push(this.Normaliser(point));
    }

    public EstAccessible(point: Point): boolean {
        const positionNormalisée = this.Normaliser(point);
        return this._obstacles.includes(positionNormalisée);
    }

    public Normaliser(position: Point): Point {
        return this._decorated.Normaliser(position);
    }
}