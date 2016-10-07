require('dotenv').config();


// Require db so it sets up connection
require('./db');
const express = require('express');
const middleware = require('./config/middleware');

// routing modules
const noteRouter = require('./config/routes');

const app = express();
middleware(app, express);

// Socket.io setup
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('A user connected via socket.io!');
  const testMessage = {
    type: 'message',
    channel: 'C2KE7FVV3',
    user: 'U2KEC1PV5',
    text: 'capture this message for data structure',
    ts: '1475865416.000003',
    team: 'T2KE19RLG'
  };
  socket.emit('incoming slack message', testMessage);
});

// routing
app.use('/api', noteRouter);

// initialize server
http.listen(3000, () => {
  console.log('Plato is listening on port 3000 ...');
});

// Slack API integration:
require('./rtm-client');

module.exports = app;

