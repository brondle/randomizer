// initial cpu info code stolen from https://gist.github.com/bag-man/5570809
var os = require("os");
//Create function to get CPU information

function cpuAverage() {
  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  //Loop through CPU cores
  for(var i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

let startMeasure = cpuAverage();

module.exports = {
//Set delay for second Measure
myRandom: function() {
  //  console.log('average: ', cpuAverage());

  //Grab second Measure
  var endMeasure = cpuAverage();
  console.log('avg: ', cpuAverage().idle);
  let n5 = cpuAverage().idle.toString().slice(7, 9);
  let n5Int = parseInt(n5);
  //  console.log('n5 = ', n5);
  //j  console.log('middlesquare= ', n5Int*n5Int);

  //Calculate the difference in idle and total time between the measures
  var idleDifference = endMeasure.idle - startMeasure.idle;
  var totalDifference = endMeasure.total - startMeasure.total;
  console.log("idle difference: ", idleDifference);
  console.log('total difference: ', totalDifference);
  let idleString = Math.trunc(idleDifference).toString();
  let totalString = Math.trunc(totalDifference).toString();
  let n1 = idleString.substr(idleString.length -2 );
  let n2 = totalString.substr(totalString.length-2);
  console.log('n1: ', n1);
  console.log('n2: ', n2);
  //reverse for more randomness
  let comb = n1.concat(n2);
  console.log('comb: ', comb)

  //Calculate the average percentage CPU usage
  var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

  //Output result to console
   console.log(percentageCPU + "% CPU Usage.");
  // return n5Int*n5Int;
  return comb;

}

}
