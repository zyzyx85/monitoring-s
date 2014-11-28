/**
 * Created by federico on 18/11/14.
 */
var os = require('os')
var DELAY = 1000;

function ramHealth(){

  ramHealth.totalmem = function(){
    return os.totalmem()
  }

  ramHealth.freemem = function(){
    return os.freemem()
  }

  return ramHealth

}

module.exports = ramHealth