import { Entier } from "../math/Entier";
import { Point } from "../geometrie/point";

export class Console {
    private planete_taille;
    private obstables;
    private map = "";

    public constructor(planeteTaille: Entier, obstables: Point[]) {
        this.obstables = obstables;
        this.planete_taille = planeteTaille;

        console.log(this.obstables);
    }
    public DisplayMap(rover : any) {
        this.map = "";

        let rover_lat = 0;
        let rover_lng = 0;
        let rover_orientation = "Nord";

        if (rover !== false) {
            const rover_pos = rover.getPosition().getValue();
            rover_lat = rover_pos.getLat().getValue();
            rover_lng = rover_pos.getLng().getValue();
            rover_orientation = rover.getOrientation().toString();
        }

        for (let i = this.planete_taille.getValue() - 1; i >= 0; i--) {
            this.map += "\n";
            for (let y = 0; y < this.planete_taille.getValue(); y++) {
                if (y === rover_lng && i === rover_lat) {
                    switch (rover_orientation) {
                        case "Nord":
                            this.map += "▲";
                            break;
                        case "Sud":
                            this.map += "▼";
                            break;
                        case "Est":
                            this.map += "►";
                            break;
                        case "Ouest":
                            this.map += "◄";
                            break;
                    }
                } else this.map += "-";
            }
        }
        return this.map;
    }
}
