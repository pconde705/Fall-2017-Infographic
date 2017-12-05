
var width = 400;
var height = 400;
var radius = 200;
colors = d3.scaleOrdinal(d3.schemeCategory10);


d3.csv("Fall_2017_Stats.csv")
  .row(function(d) { return {students: d.Students, gender: d.Gender, age: Number(d.Age), linkedIn: d.LinkedIn, repos: Number(d.Repos), fail1: d.Failed_1, fail2: d.Failed_2 };})
  .get(function(error, data) {
    data.forEach((student) => {
      console.log(student);


    var pie = d3.pie().value(function(d) {

});
