import { WebSocketServer } from 'ws';
import { InterpréteurRover } from '../rover/interpréteurRover';
import { CommandeSimple } from '../rover/commande/CommandeSimple';
import { PositionBuilder } from '../../test/utilities/position.builder';
import { PlaneteBuilder } from '../topologie/planete.builder';
import { RoverBuilder } from '../../test/utilities/rover.builder';
import { Entier } from '../math/Entier';
import { Console } from '../UI/console';

const wss = new WebSocketServer({ port: 8080 });
const sizePlanete = new Entier(6);
const planèteBuilder = new PlaneteBuilder().DeTaille(sizePlanete.getValue());
const rndObstaclesAmount =
  Math.floor(Math.random() * sizePlanete.getValue()) + 1;
console.log('number of obstacles', rndObstaclesAmount);
for (let i = 0; i < rndObstaclesAmount; i++) {
  const latitude = Math.floor(Math.random() * (sizePlanete.getValue() - 1));
  const longitude = Math.floor(Math.random() * (sizePlanete.getValue() - 1));
  console.log(`obstalce n°${i + 1} coordinates: ${latitude} ${longitude}`);
  planèteBuilder.AyantUnObstacleAuxCoordonnees(latitude, longitude);
}
const planète = planèteBuilder.Build();
const consoleDisplay = new Console(sizePlanete, planète.getRevealedObstacles());
console.log('SERVER STARTED');
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  const positionDépartCommune = new PositionBuilder()
    .AyantPourCoordonnées(0, 0)
    .SurPlanète(planète)
    .Build();

  const roverInterprété = new RoverBuilder()
    .AyantPourPosition(positionDépartCommune)
    .Build();
  let interpréteur = new InterpréteurRover(roverInterprété);

  ws.send(consoleDisplay.DisplayMap(false));

  ws.on('message', function message(data) {
    if (data.toString() === 'init') ws.send(consoleDisplay.DisplayMap(false));
    console.log('received: %s', data);

    try {
      interpréteur = interpréteur.Interpréter(
        new CommandeSimple(data.toString())
      );
    } catch (err) {
      console.log(err);
    }
    // ws.send(`listening on position ${interpréteur.getPosition().toString()}`);
    ws.send(consoleDisplay.DisplayMap(interpréteur));
  });

  ws.send('listening');
});
