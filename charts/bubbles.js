d3.csv("./data/Fall_2017_Stats.csv")
.row(function(d) { return {students: d.Students, repos: Number(d.Repos), commits: Number(d.Commits) };})
.get(function(error, data) {
  data.forEach((student) => {
  });
  bubbleChart(data);
});

var bubbleChart = function(repodata) {
  var repoNumbers = {'children' : repodata };

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

  var tooltip = d3.select('body').append('div').attr("class", "bubbleToolTip");

  bubble(root)

  var node = svg.selectAll('.node').data(root.children).enter().append('g').attr('class', 'node').attr('transform', function(d) {
    return 'translate(' + d.x + ' ' + d.y + ')';
  })

  node.append("circle").attr("r", function(d) { return d.r; }).style("fill", function(d) {
    return color(d.data.students);
  })
  .on("mousemove", function(d){
    if (d.data.commits < 100) {
      d3.select(this)
        .style("opacity", 0.7)
        .style("stroke", "yellow")
        .style("stroke-width", 10)
        .style("stroke-dasharray", ("1,11"));
        tooltip.html(d.data.commits + " commits " + "<i class='fa fa-frown-o' aria-hidden='true'></i>")
        .style("left", d3.event.pageX - 180 + "px")
        .style("top", d3.event.pageY - 160 + "px").style("display", "inline-block");

    } else if (d.data.commits > 100 && d.data.commits < 200) {
      d3.select(this)
        .style("opacity", 0.7)
        .style("stroke", "yellow")
        .style("stroke-width", 10)
        .style("stroke-dasharray", ("5,10"));
        tooltip.html(d.data.commits + " commits " + "<i class='fa fa-meh-o' aria-hidden='true'></i>")
        .style("left", d3.event.pageX - 180 + "px")
        .style("top", d3.event.pageY - 160 + "px").style("display", "inline-block");

    }









    // d3.select(this)
    //   .style("opacity", 0.7)
    //   .style("stroke", "yellow")
    //   .style("stroke-width", 10)
    //   .style("stroke-dasharray", ("10,3"));
    //
    // tooltip.html("This person committed " + d.data.commits + " times").style("left", d3.event.pageX - 320 + "px")
    // .style("top", d3.event.pageY - 120 + "px").style("display", "inline-block");
  })
  .on("mouseout", function(d){
    tooltip.style("display","none");
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1);
  });
  // Do if statements that tell the persib they need to commit more, and include happy faces or frowny faces

  node.append("text").attr("dy", ".3em").style("text-anchor", "middle").text(function(d) {
    return d.data.repos;
  })
  .style("fill", "white");


};

export default bubbleChart;
