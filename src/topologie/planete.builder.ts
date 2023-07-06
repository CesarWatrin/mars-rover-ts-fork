import { Planète } from './planète.interface.ts';
import { Point } from '../geometrie/point.ts';
import { Entier } from '../math/Entier.ts';

export class PlaneteBuilder {
  private _taille: number = 1;
  private _obstacles: Point[] = [];

  public DeTaille(taille: number): PlaneteBuilder {
    this._taille = taille;
    return this;
  }

  public AyantUnObstacle(emplacement: Point): PlaneteBuilder {
    this._obstacles.push(emplacement);
    return this;
  }

  public AyantUnObstacleAuxCoordonnees(
    latitude: number,
    longitude: number
  ): PlaneteBuilder {
    this._obstacles.push(
      new Point(new Entier(latitude), new Entier(longitude))
    );
    return this;
  }

  public Build(): Planète {
    let planète: Planète = new PlanèteToroïdaleVide(new Entier(this._taille));
    planète = new ObstacleDecorator(planète, this._obstacles);
    return planète;
  }
}

export class PlanèteToroïdaleVide implements Planète {
  private readonly _pointMax: Point;
  private readonly revealedObstacles: Point[];

  constructor(taille: Entier) {
    this._pointMax = new Point(taille, taille);
    this.revealedObstacles = [];
  }

  getRevealedObstacles() {
    return this.revealedObstacles;
  }

  Normaliser(point: Point): Point {
    return point.Modulo2D(this._pointMax);
  }

  SelonAccessibilité<T>(
    point: Point,
    actionSiObstacle: () => T,
    actionSiLibre: () => T
  ): T {
    return actionSiLibre();
  }

  RévélerObstacle(obstacleCoordinates: Point) {
    if (
      !this.revealedObstacles.some(
        (pt) =>
          pt.getLat().Equals(obstacleCoordinates.getLat()) &&
          pt.getLng().Equals(obstacleCoordinates.getLng())
      )
    ) {
      this.revealedObstacles.push(obstacleCoordinates);
    }
    return this.revealedObstacles;
  }
}

class ObstacleDecorator implements Planète {
  private readonly _decorated: Planète;
  private readonly _obstacles: Point[];

  public constructor(decorated: Planète, obstacles: Point[]) {
    this._decorated = decorated;
    this._obstacles = obstacles;
  }
  getRevealedObstacles(): Point[] {
    return this._decorated.getRevealedObstacles();
  }

  private EstAccessible(point: Point): boolean {
    const positionNormalisée = this.Normaliser(point);
    return !this._obstacles.some(
      (obstacle) =>
      positionNormalisée.Equals(obstacle)
    );
  }

  public Normaliser(position: Point): Point {
    return this._decorated.Normaliser(position);
  }

  public getObstacles() {
    return this._obstacles;
  }

  RévélerObstacle(obstacleCoordinates: Point) {
    return this._decorated.RévélerObstacle(obstacleCoordinates);
  }

  public SelonAccessibilité<T>(
    point: Point,
    actionSiObstacle: () => T,
    actionSiLibre: () => T
  ): T {
    if (this.EstAccessible(point)) return actionSiLibre();
    return actionSiObstacle();
  }
}
