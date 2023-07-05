import {Position} from "../../src/topologie/geometrie/position";
import {PlanèteInfinieVide} from "./planèteInfinieVide";
import {Point} from "../../src/topologie/geometrie/point";
import {Planète} from "../../src/topologie/planète.interface";
import {Entier} from "../../src/math/Entier";

export class PositionBuilder {
    static Origine(): Position {
        return new PositionBuilder().Build();
    }

    private _latitude : Entier = Entier.Zéro;
    private _longitude : Entier = Entier.Zéro;
    private _planète : Planète = new PlanèteInfinieVide();

    public AyantPourCoordonnées(latitude: number, longitude: number): PositionBuilder {
        this._latitude = new Entier(latitude);
        this._longitude = new Entier(longitude);
        return this;
    }

    Build() : Position {
        return new Position(new Point(this._latitude, this._longitude), this._planète);
    }

    Origine() {
        return this.AyantPourCoordonnées(0,0);
    }

    SurPlanète(planète: Planète) {
        this._planète = planète;
        return this;
    }
}