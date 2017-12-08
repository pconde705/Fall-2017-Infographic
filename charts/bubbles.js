d3.csv("./data/Fall_2017_Stats.csv")
.row(function(d) { return {students: d.Students, repos: Number(d.Repos), commits: Number(d.Commits) };})
.get(function(error, data) {
  data.forEach((student) => {
  });
  bubbleChart(data);
});

var bubbleChart = function(repodata) {
  var repoNumbers = {'children' : repodata };

  var diameter = 800;
  var color = d3.scaleOrdinal(d3.schemeCategory20b);

  var colors = d3.scaleLinear().domain([0, d3.max(repoNumbers.children, function(d) {
    return d.repos;
  })])
  .range(['#ff1111', '#ff11eb'])

  var bubble = d3.pack().size([diameter, diameter]).padding(10)

  var svg = d3.select('#bubbles').append('svg').attr('viewBox', '0 0 ' + diameter + ' ' + diameter)
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
        .style("opacity", 0.8)
        .style("stroke", "yellow")
        .style("cursor", "pointer")
        .style("stroke-width", 10)
        .style("stroke-dasharray", ("1,11"));
        tooltip.html("<h1>Student no. " + "<em>" + d.data.students + "</em></h1><hr><h3>" +
          d.data.repos + " github repositories</h3><hr><h4>" + d.data.commits + " commits " +
          "<i class='fa fa-frown-o' aria-hidden='true'></i></h4>")
        .style("left", d3.event.pageX - 140 + "px")
        .style("top", d3.event.pageY - 300 + "px").style("display", "inline-block");

    } else if (d.data.commits > 100 && d.data.commits < 200) {
      d3.select(this)
        .style("opacity", 0.8)
        .style("stroke", "yellow")
        .style("cursor", "pointer")
        .style("stroke-width", 10)
        .style("stroke-dasharray", ("5,10"));
        tooltip.html("<h1>Student no. " + "<em>" + d.data.students + "</em></h1><hr><h3>" +
          d.data.repos + " github repositories</h3><hr><h4>" + d.data.commits + " commits " +
          "<i class='fa fa-meh-o' aria-hidden='true'></i></h4>")
        .style("left", d3.event.pageX - 140 + "px")
        .style("top", d3.event.pageY - 300 + "px").style("display", "inline-block");

    } else if (d.data.commits > 200 && d.data.commits < 300) {
      d3.select(this)
        .style("opacity", 0.8)
        .style("stroke", "yellow")
        .style("cursor", "pointer")
        .style("stroke-width", 10)
        .style("stroke-dasharray", ("10,4"));
        tooltip.html("<h1>Student no. " + "<em>" + d.data.students + "</em></h1><hr><h3>" +
          d.data.repos + " github repositories</h3><hr><h4>" + d.data.commits + " commits " +
          "<i class='fa fa-smile-o' aria-hidden='true'></i></h4>")
        .style("left", d3.event.pageX - 140 + "px")
        .style("top", d3.event.pageY - 300 + "px").style("display", "inline-block");

    } else if (d.data.commits > 300 && d.data.commits < 400) {
      d3.select(this)
        .style("opacity", 0.8)
        .style("stroke", "yellow")
        .style("cursor", "pointer")
        .style("stroke-width", 10)
        .style("stroke-dasharray", ("10,1"));
        tooltip.html("<h1>Student no. " + "<em>" + d.data.students + "</em></h1><hr><h3>" +
          d.data.repos + " github repositories</h3><hr><h4>" + d.data.commits + " commits " +
          "<i class='fa fa-smile-o' aria-hidden='true'></i>" + "<i class='fa fa-smile-o' aria-hidden='true'></i></h4>")
        .style("left", d3.event.pageX - 140 + "px")
        .style("top", d3.event.pageY - 300 + "px").style("display", "inline-block");

    } else if (d.data.commits > 400) {
      d3.select(this)
        .style("opacity", 0.8)
        .style("stroke", "yellow")
        .style("cursor", "pointer")
        .style("stroke-width", 10)
        .style("stroke-dasharray", ("100,0"));
        tooltip.html("<h1>Student no. " + "<em>" + d.data.students + "</em></h1><hr><h3>" +
          d.data.repos + " github repositories</h3><hr><h4>" + d.data.commits + " commits " +
          "<i class='fa fa-smile-o' aria-hidden='true'></i>" + "<i class='fa fa-smile-o' aria-hidden='true'></i>" + "<i class='fa fa-smile-o' aria-hidden='true'></i></h4>")
        .style("left", d3.event.pageX - 140 + "px")
        .style("top", d3.event.pageY - 300 + "px").style("display", "inline-block");

    }
  })
  .on("mouseout", function(d){
    tooltip.style("display","none");
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1);
  });

  node.append("text").style("text-anchor", "middle").text(function(d) {
    return "?"
  })
  .style("opacity", 0.7)
};

export default bubbleChart;
