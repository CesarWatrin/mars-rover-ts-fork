import {Orientations, Orientation} from "../src/topologie/orientations";
import {RoverBuilder} from "./utilities/rover.builder";
import {CartesianData} from "./utilities/cartesianData";
import {PositionBuilder} from "./utilities/position.builder";
import {TestPrimitives} from "./utilities/testPrimitives";
const each = require("jest-each").default;

const latitudesDépart = [0, 1];
const longitudesDépart = [0, 1];
const nombreMouvements = [1, 2];

describe('FEATURE Avancement', () => {
    each(
        new CartesianData(latitudesDépart, longitudesDépart, TestPrimitives.Orientations).toTestCases()
    ).it('ETANT DONNE un rover démarrant en %s, %s, orienté %s ' +
        'QUAND il avance puis recule ' +
        'ALORS sa nouvelle position est sa position de départ',
        (latitudeDépart: number, longitudeDépart: number, orientation: Orientation) => {

            const positionOriginale = new PositionBuilder()
                .AyantPourCoordonnées(latitudeDépart, longitudeDépart)
                .Build();

            let rover = new RoverBuilder()
                .AyantPourPosition(positionOriginale)
                .AyantPourOrientation(orientation)
                .Build();

            rover = rover.Avancer().Reculer();

            expect(rover.Position).toStrictEqual(positionOriginale);
    });


    each(new CartesianData(nombreMouvements).toTestCases())
        .it('ETANT DONNE un rover orienté Nord ' +
        'QUAND il avance %s fois ' +
        'ALORS la composante latitudinale de sa position augmente d\'autant',
        (nombreMouvements: number) => {
            const positionOriginale = PositionBuilder.Origine();
            let rover = new RoverBuilder()
                .AyantPourOrientation(Orientations.Nord)
                .AyantPourPosition(positionOriginale)
                .Build();

            let positionAttendue = positionOriginale;

            for(let mouvements =0; mouvements < nombreMouvements; mouvements ++){
                positionAttendue = positionAttendue.IncrémenterLatitudeSaufObstacle();
                rover = rover.Avancer();
            }

            expect(rover.Position).toStrictEqual(positionAttendue);
        });

    each(new CartesianData(nombreMouvements).toTestCases())
        .it('ETANT DONNE un rover orienté Sud ' +
        'QUAND il avance %s fois ' +
        'ALORS la composante latitudinale de sa position diminue d\'autant',
        (nombreMouvements: number) => {
            const positionOriginale = PositionBuilder.Origine();
            let rover = new RoverBuilder()
                .AyantPourOrientation(Orientations.Sud)
                .AyantPourPosition(positionOriginale)
                .Build();

            let positionAttendue = positionOriginale;

            for(let mouvements =0; mouvements < nombreMouvements; mouvements ++){
                positionAttendue = positionAttendue.DécrémenterLatitudeSaufObstacle();
                rover = rover.Avancer();
            }

        expect(rover.Position).toStrictEqual(positionAttendue);
    });

    each(new CartesianData(nombreMouvements).toTestCases())
        .it('ETANT DONNE un rover orienté Est ' +
        'QUAND il avance %s fois ' +
        'ALORS la composante longitudinale de sa position augmente d\'autant',
        (nombreMouvements: number) => {
            const positionOriginale = PositionBuilder.Origine();
            let rover = new RoverBuilder()
                .AyantPourOrientation(Orientations.Est)
                .AyantPourPosition(positionOriginale)
                .Build();

            let positionAttendue = positionOriginale;
            for(let mouvements =0; mouvements < nombreMouvements; mouvements ++){
                positionAttendue = positionAttendue.IncrémenterLongitudeSaufObstacle();
                rover = rover.Avancer();
            }

            expect(rover.Position).toStrictEqual(positionAttendue);
        });

    each(new CartesianData(nombreMouvements).toTestCases())
        .it('ETANT DONNE un rover orienté Ouest ' +
        'QUAND il avance %s fois ' +
        'ALORS la composante longitudinale de sa position diminue d\'autant',
        (nombreMouvements: number) => {
            const positionOriginale = PositionBuilder.Origine();
            let rover = new RoverBuilder()
                .AyantPourOrientation(Orientations.Ouest)
                .AyantPourPosition(positionOriginale)
                .Build();

            let positionAttendue = positionOriginale;

            for(let mouvements =0; mouvements < nombreMouvements; mouvements ++){
                positionAttendue = positionAttendue.DécrémenterLongitudeSaufObstacle();
                rover = rover.Avancer();
            }

            expect(rover.Position).toStrictEqual(positionAttendue);
        });
});