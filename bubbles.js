d3.csv("Fall_2017_Stats.csv")
.row(function(d) { return {students: d.Students, repos: Number(d.Repos) };})
.get(function(error, data) {
  data.forEach((student) => {
    // console.log(student);
  });
  bubbleChart(data);
});

var bubbleChart = function(repodata) {
  var repoNumbers = {'children' : repodata };
  // console.log(repoNumbers);

  var diameter = 500;
  var color = d3.scaleOrdinal(d3.schemeCategory20c);

  var colors = d3.scaleLinear().domain([0, d3.max(repoNumbers.children, function(d) {
    return d.repos;
  })])
  .range(['#ff1111', '#ff11eb'])

  var bubble = d3.pack().size([diameter, diameter]).padding(5)
  var margin = {left: 0, right: 0, top: 0, bottom: 0}

  var svg = d3.select('#bubbles').append('svg').attr('viewBox', '0 0 ' + (diameter + margin.right) + ' ' + diameter)
              .attr('width', "100%").attr('height', "100%");

  var root = d3.hierarchy(repoNumbers).sum(function(d) {
    return d.repos;
  })
  .sort(function(a, b) {
    return b.repos - a.repos;
  });

  bubble(root)

  var node = svg.selectAll('.node').data(root.children).enter().append('g').attr('class', 'node').attr('transform', function(d) {
    return 'translate(' + d.x + ' ' + d.y + ')';
  })

  node.append("circle").attr("r", function(d) { return d.r; }).style("fill", function(d) {
    return color(d.data.students);
  });

  node.append("text").attr("dy", ".3em").style("text-anchor", "middle").text(function(d) {
    return d.data.repos;
  })
  .style("fill", "white");








};

export default bubbleChart;
