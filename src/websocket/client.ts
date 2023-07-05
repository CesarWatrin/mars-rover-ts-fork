import WebSocket from 'ws';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ws = new WebSocket('ws://localhost:8080');

ws.on('error', console.error);

ws.on('open', function open() {
  console.log('Connexion trouvée');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
  rl.question(
    'Entrez une commande [A => Avancer, R => Reculer, D => Droite, G => Gauche]',
    (answer) => {
      ws.send(answer.toUpperCase());
    }
  );
});
