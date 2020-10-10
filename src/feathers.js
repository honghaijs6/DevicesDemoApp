import feathers from '@feathersjs/client';
import io from 'socket.io-client';

import server from './config/server';

const socket = io(server.host+':'+server.port);
const client = feathers();



client.configure(feathers.socketio(socket));

client.configure(feathers.authentication({

  storage: window.localStorage
}));

export default client;
