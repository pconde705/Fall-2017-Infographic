<h1 align="center">
  <br>
  <a href="https://pconde705.github.io/Fall-2017-Infographic/"><img src="https://res.cloudinary.com/lopopoa2/image/upload/v1512754121/Screen_Shot_2017-12-08_at_9.27.10_AM_yjzigm.png" alt="infographic header"></a>
  <br>
  <h3 align="center">An animated statistical infographic of App Academy's Fall 2017 class built in <a href="https://d3js.org/" target="_blank">D3</a>.</h3>
  <br>
</h1>


## Key Features

* D3 Bar graph, Pie Charts and Bubble Charts
* Hover Effect Tooltips displaying parsed data
* Stats that display each students's Github repo and commit history
* Statistical breakdowns of age and gender ratio among the student body


<p align="center">
  <img src="https://res.cloudinary.com/lopopoa2/image/upload/v1512760965/Screen_Shot_2017-12-08_at_11.05.15_AM_arylow.png">
</p>

Scrolling over each graph will reveal a tooltip with information related to number of men and/or women who belong to a certain age group.

```javascript
var path = g.selectAll('path')
  .data(circle(maleData))
  .enter()
  .append("g")
  .append('path')
  .attr('d', arc)
  .attr('fill', (d,i) => color(i))
  .style('opacity', opacity)
  .style('stroke', 'lightgreen')
  .on("mousemove", function(d) {
    d3.selectAll('path')
      .style("opacity", 1);
    d3.select(this)
      .style("opacity", 0.3);
    tooltip.html("<strong>" + d.data.value + "</strong>" + " male: " + "<em>" + d.data.age + "</em>" + " years young!").style("left", d3.event.pageX - 20 + "px")
    .style("top", d3.event.pageY - 200 + "px").style("left", d3.event.pageX - 240 + "px").style("display", "inline-block");
  })
  .on("mouseout", (d) => {
    tooltip.style("display","none");
    d3.selectAll('path')
      .style("opacity", 1);
  })
  ```
