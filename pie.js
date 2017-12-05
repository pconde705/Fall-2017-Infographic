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
    .data(circle(data))
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

      var gg = d3.select("svg").style("cursor", "pointer")
    })
};
