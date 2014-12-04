/**
 * Created by federico on 13/11/14.
 */
"use strict";
var express = require('express');
var WebSocketServer = require('ws').Server
var cpuhealth = require('./helpers/cpuhealth');
var ramhealth = require('./helpers/ramhealth');
var app = express();
var cpuHealth = cpuhealth();
var ramHealth = ramhealth();

app.use(cors({
  allowedOrigins: [
    '192.168.33.171'
  ]
}));


app.get('/', function (req, res) {
  res.send("Hello World!")
});

app.get('/cpu', function (req, res) {
  res.send(cpuHealth.cpus())
});

app.get('/cpu/:id', function (req, res) {
  res.send(cpuHealth.cpu(req.param('id')))
});

app.get('/ram', function (req, res) {
  res.send(ramHealth.totalmem() + " "+ ramHealth.freemem())
});


var server = app.listen(3000, function () {
  console.log('App listening at http://%s:%s',
    server.address().address,
    server.address().port)
});

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {

  var id = cpuHealth.addConnection(function(cpu){
    ws.send(JSON.stringify(cpu), function() { /* ignore errors */ });
  });

  console.log('started client interval: '+id);

  ws.on('close', function() {
    console.log('stopping client interval: '+id);
    cpuHealth.removeConnection(id);
  });
});