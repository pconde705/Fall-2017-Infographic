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


## Gender and Age Ratio

<p align="center">
  <img src="https://res.cloudinary.com/lopopoa2/image/upload/v1512760965/Screen_Shot_2017-12-08_at_11.05.15_AM_arylow.png">
</p>

Scrolling over the bar chart reveals a simple tooltip numeric over how many men and women are in our class. The pie chart graph will reveal a tooltip with information related to the number of men and/or women who belong to a certain age group.

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
    tooltip.html("<strong>" + d.data.value + "</strong>" + " male: " + "<em>" + d.data.age + "</em>" + " years young!")
    .style("left", d3.event.pageX - 20 + "px")
    .style("top", d3.event.pageY - 200 + "px")
    .style("left", d3.event.pageX - 240 + "px").style("display", "inline-block");
  })
  .on("mouseout", (d) => {
    tooltip.style("display","none");
    d3.selectAll('path')
      .style("opacity", 1);
  })
  ```

  ## Bubble chart

  <p align="center">
    <img src="https://res.cloudinary.com/lopopoa2/image/upload/v1512762458/Screen_Shot_2017-12-08_at_11.42.06_AM_copy_e4yww8.png">
  </p>

  The bubble chart holds the both the number of Github repositories each student has created but also their commit contribution over the year. Each student remains anonymous by name but can identify themselves based on their developer history. As an added bonus if their commit history is lacking the emoji will change to reflect what it considers to be a poor commit history or a great commit history.


  ```javascript
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

    ```
