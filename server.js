/**
 * Created by federico on 13/11/14.
 */
"use strict"
var express = require('express');
var cpu_os = require('./helpers/cpu_os');

var app = express();
var cpu = cpu_os.start_process();



app.get('/', function (req, res) {
  res.send("Hello World!")
});

app.get('/cpu', function (req, res) {
  res.send(cpu.current_cpus())
});

app.get('/cpu/:id', function (req, res) {
  var id = req.param('id')
  res.send(cpu.current_cpu(id))
});

var server = app.listen(3000, function () {
  console.log('App listening at http://%s:%s',
    server.address().address,
    server.address().port)
});
