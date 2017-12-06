d3.csv("Fall_2017_Stats.csv")
.row(function(d) { return { gender: d.Gender, age: Number(d.Age) };})
.get(function(error, data) {
  data.forEach((student) => {
    // console.log(student);
  });
  malePie(data);
});

var malePie = function(data) {
  // console.log(data);
  var maleData = [];
  var twenty1 = 0;
  var twenty2 = 0;
  var twenty3 = 0;
  var twenty4 = 0;
  var twenty5 = 0;
  var twenty6 = 0;
  var twenty7 = 0;
  var twenty8 = 0;
  var twenty9 = 0;
  var thirty = 0;
  var thirty1 = 0;
  var thirty2 = 0;
  var data21 = {};
  var data22 = {};
  var data23 = {};
  var data24 = {};
  var data25 = {};
  var data26 = {};
  var data27 = {};
  var data28 = {};
  var data29 = {};
  var data30 = {};
  var data31 = {};
  var data32 = {};

  data.forEach((person) => {
    if (person.gender === "M" && person.age === 21) {
      twenty1 += 1;
      data21 = {age: "21", value: twenty1};
    } else if (person.gender === "M" && person.age === 22) {
      twenty2 += 1;
      data22 = {age: "22", value: twenty2};
    } else if (person.gender === "M" && person.age === 23) {
      twenty3 += 1;
      data23 = {age: "23", value: twenty3};
    } else if (person.gender === "M" && person.age === 24) {
      twenty4 += 1;
      data24 = {age: "24", value: twenty4};
    } else if (person.gender === "M" && person.age === 25) {
      twenty5 += 1;
      data25 = {age: "25", value: twenty5};
    } else if (person.gender === "M" && person.age === 26) {
      twenty6 += 1;
      data26 = {age: "26", value: twenty6};
    } else if (person.gender === "M" && person.age === 27) {
      twenty7 += 1;
      data27 = {age: "27", value: twenty7};
    } else if (person.gender === "M" && person.age === 28) {
      twenty8 += 1;
      data28 = {age: "28", value: twenty8};
    } else if (person.gender === "M" && person.age === 29) {
      twenty9 += 1;
      data29 = {age: "29", value: twenty9};
    } else if (person.gender === "M" && person.age === 30) {
      thirty += 1;
      data30 = {age: "30", value: thirty};
    } else if (person.gender === "M" && person.age === 31) {
      thirty1 += 1;
      data31 = {age: "31", value: thirty1};
    } else if (person.gender === "M" && person.age === 32) {
      thirty2 += 1;
      data32 = {age: "32", value: thirty2};
    }
  });
  maleData.push(data21);
  maleData.push(data22);
  maleData.push(data23);
  maleData.push(data24);
  maleData.push(data25);
  maleData.push(data26);
  maleData.push(data27);
  maleData.push(data28);
  maleData.push(data29);
  maleData.push(data30);
  maleData.push(data31);
  maleData.push(data32);
// console.log(maleData);

  var width = 500;
  var height = 400;
  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeCategory20);
  var opacity = 0.9;

  var svg = d3.select("#male-pie").append("svg").attr("width", width).attr("height", height);

  var g = svg.append("g").attr("transform", 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  var arc = d3.arc().outerRadius(radius).innerRadius(150);
  // Have symbol of men and women appear inside innerRadius

  var circle = d3.pie().value(function(d) {
    return d.value;
  }).sort(null);


  var path = g.selectAll('path')
    .data(circle(maleData))
    .enter()
    .append("g")
    .append('path')
    .attr('d', arc)
    .attr('fill', (d,i) => color(i))
    .style('opacity', opacity)
    .style('stroke', 'white')
    .on("mouseover", (d) => {

    })
    .on("mouseout", (d) => {

    })
};

export default malePie;
