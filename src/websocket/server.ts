import { WebSocketServer } from 'ws';
import { InterpréteurRover } from '../rover/interpréteurRover';
import { CommandeSimple } from '../rover/commande/CommandeSimple';
import { PositionBuilder } from '../../test/utilities/position.builder';
import { RoverBuilder } from '../../test/utilities/rover.builder';

const wss = new WebSocketServer({ port: 8080 });
console.log('SERVER STARTED');
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  const positionDépartCommune = new PositionBuilder()
    .AyantPourCoordonnées(0, 0)
    .Build();

  const roverInterprété = new RoverBuilder()
    .AyantPourPosition(positionDépartCommune)
    .Build();
  let interpréteur = new InterpréteurRover(roverInterprété);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    if (data.toString().length === 1) {
      if (
        data.toString() === 'A' ||
        data.toString() == 'R' ||
        data.toString() == 'D' ||
        data.toString() == 'G'
      ) {
        interpréteur = interpréteur.Interpréter(
          new CommandeSimple(data.toString())
        );
        console.log(interpréteur.getPosition().toString());
      } else {
        console.log('commande inconnue');
      }
    } else {
      console.log('suite de commandes non supportée');
    }

    ws.send(`listening on position ${interpréteur.getPosition().toString()}`);
  });

  ws.send('listening');
});
