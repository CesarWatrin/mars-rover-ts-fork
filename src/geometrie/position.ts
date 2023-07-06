import {Planète} from "../topologie/planète.interface.ts";
import {Point} from "./point.ts";

export class Position {
    private readonly _point: Point;
    private readonly _planète: Planète;

    constructor(point: Point, planète: Planète) {
        this._planète = planète;
        this._point = planète.Normaliser(point);
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

    toString() : string {
        return this._point.toString();
    }

    getValue() : Point {
        return this._point;
    }

    private AllerADestinationSaufObstacle(pointDestination: Point) : Position{
        const pointFinal = this._planète.SelonAccessibilité(pointDestination,
            () => {
                console.log(`obtacle détécté on lat : ${pointDestination.getLat().toString()}, lng: ${pointDestination.getLng().toString()}`)
                this._planète.RévélerObstacle(pointDestination)
                return this._point
            },
            () => pointDestination
        );

        return new Position(pointFinal, this._planète);
    }
}