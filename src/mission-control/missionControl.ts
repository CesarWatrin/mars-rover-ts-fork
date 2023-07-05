import { Rover } from '../rover/rover.ts';
import { CommandeRover } from '../interpreteur/commande/CommandeRover.ts';
import { PlanèteToroïdaleVide } from '../topologie/planeteToroïdale.ts';
import { Entier } from '../math/Entier.ts';
import { PositionBuilder } from '../../test/utilities/position.builder.ts';
import { RoverBuilder } from '../../test/utilities/rover.builder.ts';
import { PlanèteAvecObstacles } from '../../test/utilities/planeteAvecObstacles.ts';
import { InterpréteurRover } from '../rover/interpréteurRover.ts';

export class InterpreterMissionControl {
  private readonly planetSize: Entier;
  private _rover: Rover;

  public constructor(planetSize: Entier) {
    this.planetSize = planetSize;
    this._rover = this.startMission();
  }

  public Interpréter(commande: CommandeRover): InterpréteurRover {
    return new InterpréteurRover(commande.ExécuterSur(this._rover));
  }

  public startMission(): Rover {
    const planète = new PlanèteAvecObstacles(
      new PlanèteToroïdaleVide(this.planetSize)
    );
    planète.AjouterObstacle(0, 5);

    const positionDépartCommune = new PositionBuilder()
      .AyantPourCoordonnées(0, 0)
      .SurPlanète(planète)
      .Build();

    return new RoverBuilder().AyantPourPosition(positionDépartCommune).Build();
  }
}
