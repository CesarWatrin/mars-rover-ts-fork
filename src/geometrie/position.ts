import {SystèmeCoordonnées} from "../topologie/systèmeCoordonnées.interface.ts";
import {Point} from "./point.ts";
import {PossèdeObstacles} from "../topologie/possedeObstacles.interface.ts";

export class Position {
    private readonly _point: Point;
    private readonly _systèmeCoordonnées: SystèmeCoordonnées;
    private readonly _connaissanceObstacles: PossèdeObstacles;

    constructor(point: Point, systèmeCoordonnées: SystèmeCoordonnées, connaissanceObstacles: PossèdeObstacles) {
        this._connaissanceObstacles = connaissanceObstacles;
        this._point = systèmeCoordonnées.Normaliser(point);
        this._systèmeCoordonnées = systèmeCoordonnées;
    }

    IncrémenterLatitudeSaufObstacle() : Position {
        return this.AllerADestinationSaufObstacle(this._point.IncrémenterLatitude());
    }

    DécrémenterLatitudeSaufObstacle() : Position {
        return this.AllerADestinationSaufObstacle(this._point.DécrémenterLatitude());
    }

    IncrémenterLongitudeSaufObstacle() : Position {
        return this.AllerADestinationSaufObstacle(this._point.IncrémenterLongitude());
    }

    DécrémenterLongitudeSaufObstacle() : Position {
        return this.AllerADestinationSaufObstacle(this._point.DécrémenterLongitude());
    }

    private AllerADestinationSaufObstacle(pointDestination: Point) : Position{
        if(this._connaissanceObstacles.EstAccessible(pointDestination))
            return new Position(pointDestination, this._systèmeCoordonnées, this._connaissanceObstacles);
        return new Position(this._point, this._systèmeCoordonnées, this._connaissanceObstacles);
    }
}