/**
 * Created by federico on 14/11/14.
 */
"use strict";

var os = require('os');
var DELAY = 1000;

var cpu_os = new function () {

  var result = {};


  function extracted(cpus, lastcpus) {
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
  }

  var start_proc = function(){
    var lastcpus = null;
    setInterval(function () {
      var cpus = os.cpus();
      lastcpus == null ?
        lastcpus = cpus
        :
        extracted(cpus, lastcpus);

      lastcpus = cpus;
    }.bind(this), DELAY);
  };


  //public method
  this.start_process = function(){
    start_proc();
    return cpu_os;
  }

  this.current_cpus = function(){
    return result;
  }

  this.current_cpu = function(id){
    return result[id];
  }


};

module.exports = cpu_os;