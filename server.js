/**
 * Created by federico on 13/11/14.
 */
"use strict";
var express = require('express');
var cpuhealth = require('./helpers/cpuhealth');

var app = express();
var cpuHealth = cpuhealth();


app.get('/', function (req, res) {
  res.send("Hello World!")
});

app.get('/cpu', function (req, res) {
  res.send(cpuHealth.cpus())
});

app.get('/cpu/:id', function (req, res) {
  res.send(cpuHealth.cpu(req.param('id')))
});

var server = app.listen(3000, function () {
  console.log('App listening at http://%s:%s',
    server.address().address,
    server.address().port)
});
