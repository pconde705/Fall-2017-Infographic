d3.csv("Fall_2017_Stats.csv")
.row(function(d) { return { gender: d.Gender, age: Number(d.Age) };})
.get(function(error, data) {
  data.forEach((student) => {
    // console.log(student);
  });
  circlePie(data);
});

var circlePie = function(data) {
  // console.log(data);
  var femaleData = [];
  var twenty3 = 0
  var twenty4 = 0
  var twenty5 = 0
  var twenty6 = 0
  var twenty7 = 0
  var twenty8 = 0
  var twenty9 = 0
  var thirty5 = 0
  var data23 = {};
  var data24 = {};
  var data25 = {};
  var data26 = {};
  var data27 = {};
  var data28 = {};
  var data35 = {};

  data.forEach((person) => {
    if (person.gender === "F" && person.age === 23) {
      twenty3 += 1;
      data23 = {age: "23", value: twenty3};
    } else if (person.gender === "F" && person.age === 24) {
      twenty4 += 1;
      data24 = {age: "24", value: twenty4};
    } else if (person.gender === "F" && person.age === 25) {
      twenty5 += 1;
      data25 = {age: "25", value: twenty5};
    } else if (person.gender === "F" && person.age === 26) {
      twenty6 += 1;
      data26 = {age: "26", value: twenty6};
    } else if (person.gender === "F" && person.age === 27) {
      twenty7 += 1;
      data27 = {age: "27", value: twenty7};
    } else if (person.gender === "F" && person.age === 28) {
      twenty8 += 1;
      data28 = {age: "28", value: twenty8};
    } else if (person.gender === "F" && person.age === 35) {
      thirty5 += 1;
      data35 = {age: "35", value: thirty5};
    }
  });
  femaleData.push(data23);
  femaleData.push(data24);
  femaleData.push(data25);
  femaleData.push(data26);
  femaleData.push(data27);
  femaleData.push(data28);
  femaleData.push(data35);
// console.log(femaleData);

  var width = 500;
  var height = 400;
  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  var opacity = 0.7;

  var svg = d3.select("#pie").append("svg").attr("width", width).attr("height", height);

  var g = svg.append("g").attr("transform", 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  var arc = d3.arc().outerRadius(radius).innerRadius(0);

  var circle = d3.pie().value(function(d) {
    return d.value;
  }).sort(null);

  var path = g.selectAll('path')
    .data(circle(femaleData))
    .enter()
    .append("g")
    .append('path')
    .attr('d', arc)
    .attr('fill', (d,i) => color(i))
    .style('opacity', opacity)
    .style('stroke', 'white')
    .on("mouseover", (d) => {
      d3.selectAll('path').style("opacity", 0.7);
      d3.select(this).style("opacity", 1);

      var gg = d3.select("svg").style("cursor", "pointer").append("g")
                 .attr("class", "tooltip").style("opacity", 0);

      gg.append("text").text(`${d.data.gender}: ${d.data.age}`).attr('text-anchor', 'middle');
    })
};
