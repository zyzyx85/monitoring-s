/**
 * Created by federico on 13/11/14.
 */
"use strict"

var express = require('express');
var os = require('os');


app.get('/', function (req, res) {
  res.send("Hello World!")
});

app.get('/cpu', function (req, res) {
});

var server = app.listen(3000, function () {
  console.log('App listening at http://%s:%s',
    server.address().address,
    server.address().port)
});