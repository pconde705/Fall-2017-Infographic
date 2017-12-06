d3.csv("Fall_2017_Stats.csv")
.row(function(d) { return {students: d.Students, repos: Number(d.Repos) };})
.get(function(error, data) {
  data.forEach((student) => {
    // console.log(student);
  });
  bubbleChart(data);
});

var bubbleChart = function(data) {
  var repoNumbers = {'children' : data };
  // console.log(repoNumbers);

  var diameter = 600;
  var color = d3.scaleOrdinal(d3.schemeCategory10c);

  var colors = d3.scaleLinear().domain([0, d3.max(repoNumbers.children, function(d) {
    return d.repos;
  })])
  .range(['#ff1111', '#ff11eb'])

  var bubble = d3.pack().size([diameter, diameter]).padding(5)
  var margin = {left: 0, right: 0, top: 0, bottom: 0}

  var svg = d3.select('#bubbles').append('svg').attr('viewbox', '0 0 ' + (diameter + margin.right) + ' ' + diameter)
              .attr('width', diameter).attr('height', diameter).attr('class', 'chart-svg');

  var root = dr.hierarchy(repoNumbers).sum(function(d) {return d.repos})
};

export default bubbleChart;
