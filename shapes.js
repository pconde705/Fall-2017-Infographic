// d3.csv("Fall_2017_Stats.csv")
// .row(function(d) { return {students: d.Students, gender: d.Gender, age: Number(d.Age), linkedIn: d.LinkedIn, repos: Number(d.Repos), fail1: d.Failed_1, fail2: d.Failed_2 };})
// .get(function(error, data) {
//   data.forEach((student) => {
//     // console.log(student);
//   })
//   gender(data)
// });
d3.csv("Fall_2017_Stats.csv")
.row(function(d) { return { gender: d.Gender };})
.get(function(error, data) {
  data.forEach((student) => {
    // console.log(student);
  });
  gender(data);
});

var gender = function(obj) {
  var genders = [];
  var male = 0;
  var female = 0;
  var they = 0;
  var margin = { top: 0, right: 0, left: 30, bottom: 30 }
  var width = 400 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;
  var tempColor;
  obj.forEach((per) => {
    if (per.gender === "F") {
      female += 1;
    } else {
      male += 1;
    }
  });
  genders.push(female);
  genders.push(male);
  genders.push(they);
  // they/them/theirs, she/her/hers, he/him/his

  var yScale = d3.scaleLinear().domain([0, d3.max(genders)]).range([0, height]);

  var yAxisValues = d3.scaleLinear().domain([0, d3.max(genders)]).range([height, 0]);

  var yAxisTicks = d3.axisLeft(yAxisValues).ticks(10);

  var xScale = d3.scaleBand().domain(genders).paddingInner(.6).paddingOuter(.6)
    .range([0, width]);

  var colors = d3.scaleLinear().domain([0, d3.max(genders)]).range(['#ff9696', '#ff1e1e']);

  var tooltip = d3.select('body').append('div').attr("class", "toolTip");

  var genderChart = d3.select("#gender").append('svg').attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g').attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')
    .style('background', 'lightgrey')
    .selectAll('rect').data(genders).enter().append('rect')
    .attr('fill', function(d) {
      return colors(d);
    })
    .attr('width', function(d) {
      return xScale.bandwidth();
    })
    .attr('height', 0) // reset for animation
    .attr('x', function(d, i) {
      return xScale(d);
    })
    .attr('y', height)
    .on("mousemove", function(d) {
      if (d === 16) {
        tooltip.html(d).style("left", d3.event.pageX - 20 + "px")
        .style("top", d3.event.pageY - 100 + "px").style("display", "inline-block")
        .html(d + " LADIES").style("background", "#FD7C7D");
      } else {
        tooltip.html(d).style("left", d3.event.pageX - 20 + "px")
        .style("top", d3.event.pageY - 100 + "px").style("display", "inline-block")
        .html(d + " GENTLEMEN").style("background", "#FC242B");
      }
    })
    .on('mouseover', function(d){

      tempColor = this.style.fill;
      d3.select(this)
        .style("cursor", "pointer")
        .transition(500) // 500 milliseconds
        .style('opacity', 0.7)
        .style('fill', 'black');
    })

    .on('mouseout', function(d){
      d3.select(this)
        .transition(500)
        .style('opacity', 1)
        .style('fill', tempColor);

        tooltip.style("display","none");
    })

    var yGuide = d3.select('#gender svg').append('g').attr("class", "ticks").attr('transform', 'translate(20, 0)')
      .call(yAxisTicks);

    genderChart.transition()
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('y', function(d, i) {
        return height - yScale(d);
      })
      .delay(function(d, i) {
        return i * 20;
      })
      .duration(1000);

};

export default gender;
