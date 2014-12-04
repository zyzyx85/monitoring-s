/**
 * Created by federico on 14/11/14.
 */
"use strict";

var os = require('os');
var DELAY = 1000;


function cpuHealth(){
  var countConnection = 0;
  var connections = {};
  var result = {};
  var lastcpus = null;

  function send() {
    Object.keys(connections).forEach(function (id) {
      connections[id](result)
    })
  }

  var cpus = function () {
    var cpus = os.cpus();
    evaluate(cpus, lastcpus);
    lastcpus = cpus;

    function evaluate(cpus, lastcpus) {
      if(lastcpus == null) return;
      var obj = [];
      cpus.forEach(function (cpu, i) {
        obj[i] = {};
        obj[i].model = cpu.model;
        obj[i].id = i;
        var lastcpu = lastcpus[i];
        var total = 0;
        Object.keys(cpu.times).forEach(function (type) {
          total += lastcpu.times[type] - cpu.times[type];
        });

        Object.keys(cpu.times).forEach(function (type) {
          obj[i][type] =  Math.round(100 * (lastcpu.times[type] - cpu.times[type]) / total)
        });

      });
      result = obj;
      send();
    }

  }.bind(this);



  cpuHealth.cpus = function(){
    return result;
  };

  cpuHealth.addConnection = function(ws){
    var id = countConnection++;
    connections[id] = ws;
    return id;
  };

  cpuHealth.removeConnection = function(id){
    delete connections[id];
  };



  (function(){
    setInterval(cpus, DELAY);
  }());

  return cpuHealth;
}




module.exports = cpuHealth;