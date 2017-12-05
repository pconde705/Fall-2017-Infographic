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
  })
  gender(data)
});

var gender = function(obj) {
  var genders = [];
  var male = 0
  var female = 0
  obj.forEach((per) => {
    if (per.gender === "F") {
      female += 1
    } else {
      male += 1
    }
  })
  genders.push(female);
  genders.push(male);
  console.log(genders);

  d3.select("#gender")
    .append('svg')
    .attr("width", 600)
    .attr("height", 400)
    .style('background', '#72ff56')
    .selectAll('rect').data(genders)
    .enter().append('rect')
    .style('fill', '#C61C6F')
    .attr('width', 50)
    .attr('height', function(d) {
      return d;
    })
    .attr('x', function(d, i) {
      return i * (50 + 5)
    })
    .attr('y', function(d, i) {
      return 400 - d;
    })
};
