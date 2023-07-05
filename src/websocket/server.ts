import { WebSocketServer } from 'ws';
import { InterpréteurRover } from '../rover/interpréteurRover';
import { CommandeSimple } from '../interpreteur/commande/CommandeSimple';
import { PositionBuilder } from '../../test/utilities/position.builder';
import { RoverBuilder } from '../../test/utilities/rover.builder';
import { PlanèteAvecObstacles } from '../../test/utilities/planeteAvecObstacles';
import { PlanèteToroïdaleVide } from '../topologie/planeteToroïdale';
import { Entier } from '../math/Entier';

const wss = new WebSocketServer({ port: 8080 });
console.log('SERVER STARTED');
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  const planète = new PlanèteAvecObstacles(
    new PlanèteToroïdaleVide(new Entier(10))
  );
  planète.AjouterObstacle(1, 1);

  const positionDépartCommune = new PositionBuilder()
    .AyantPourCoordonnées(0, 0)
    .SurPlanète(planète)
    .Build();

  const roverInterprété = new RoverBuilder()
    .AyantPourPosition(positionDépartCommune)
    .Build();
  let interpréteur = new InterpréteurRover(roverInterprété);

  ws.on('message', function message(data) {
    console.log('received: %s', data);

    try {
      interpréteur = interpréteur.Interpréter(
        new CommandeSimple(data.toString())
      );
    } catch (err) {
      console.log(err);
    }

    ws.send(`listening on position ${interpréteur.getPosition().toString()}`);
  });

  ws.send('listening');
});
