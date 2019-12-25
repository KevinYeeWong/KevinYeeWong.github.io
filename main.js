var width =600;
var height= 600;
var xScale, yScale;
var xScale2, yScale2;




d3.csv("colleges.csv", function(csv) {
    for (var i=0; i<csv.length; ++i) {
		csv[i]["Median Debt"] = Number(csv[i]["Median Debt"]);
    //Median Debt
		csv[i]["Median Earnings 8 years After Entry"] = Number(csv[i]["Median Earnings 8 years After Entry"]);

    csv[i]["% White"] = Number(csv[i]["% White"])*100;
    csv[i]["% Black"] = Number(csv[i]["% Black"])*100;
    csv[i]["% Hispanic"] = Number(csv[i]["% Hispanic"])*100;
    csv[i]["% Asian"] = Number(csv[i]["% Asian"])*100;
    csv[i]["% American Indian"] = Number(csv[i]["% American Indian"])*100;
    csv[i]["% Pacific Islander"] = Number(csv[i]["% Pacific Islander"])*100;
    csv[i]["% Biracial"] = Number(csv[i]["% Biracial"])*100;
    csv[i]["% Nonresident Aliens"] = Number(csv[i]["Nonresident Aliens"])*100;
    //Mean Earnings 8 years After Entry
    csv[i]["Undergrad Population"] = Number(csv[i]["Undergrad Population"]);
    csv[i]["Admission Rate"] = Number(csv[i]["Admission Rate"]);
    csv[i]["Name"] = String(csv[i]["Name"]);
    }
    var mDebt = d3.extent(csv, function(row) { return row["Median Debt"]; });
    var mEarnings = d3.extent(csv, function(row) { return row["Median Earnings 8 years After Entry"]; });
    var mPopulation = d3.extent(csv, function(row) {return row["Undergrad Population"];});





    // Axis setup

    var xScale = d3.scaleLinear().domain([0,30000]).range([50, 570]).nice();
    var yScale = d3.scalePow().domain(mEarnings).range([570, 30]).nice();




    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    //Create SVGs for charts
    var chart1 = d3.select("#chart1")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);




    var chart3 = d3.select('#chart3');

    var legendVals2 = ["Less Than 10,000", "10,000-19,999", "20,000-29,999", "30,000-39,999","40,000-49,999","Greater Than 50,000"]
        var color = ['red','orange','yellow','green','blue','purple']

var svgLegned4 = d3.select(".legend4").append("svg")
            .attr("width", 1000)
            .attr("height", 50)

        var dataL = 0;
        var offset = 150;

        var legend4 = svgLegned4.selectAll('.legends4')
            .data(legendVals2)
            .enter().append('g')
            .attr("class", "legends4")
            .attr("transform", function (d, i) {
             if (i === 0) {
                dataL = d.length + offset
                return "translate(0,0)"
            } else {
             var newdataL = dataL
             dataL +=  d.length + offset
             return "translate(" + (newdataL) + ",0)"
            }
        })

        legend4.append('rect')
            .attr("x", 0)
            .attr("y", 5)
            .attr("width", 10)
            .attr("height", 10)
            .style("stroke", "black")
            .style("fill", function (d, i) {
            return color[i]
        })
            legend4.append('text')
            .attr("x", 20)
            .attr("y", 15)
        //.attr("dy", ".35em")
        .text(function (d, i) {
            return d
        })
            .attr("class", "textselected")
            .style("text-anchor", "start")
            .style("font-size", 15)




	 /******************************************



	 ******************************************/
//Pie Chart attempt
var pieW = 280,
    pieH = 280,
    pieR = 100;



var arc = d3.arc()
    	.outerRadius(pieR)
    	.innerRadius(pieR - 90);

 var arcOver = d3.arc()
                        .outerRadius(pieR + 5)
                        .innerRadius(pieR - 75);

      var data = [
      {name: 'white', percentage: '', color: '#EC5f67'}, //red
      {name: 'black', percentage: '', color: '#F99157'}, //orange
      {name: 'hispanic', percentage: '', color: '#FAC863'}, //yellow
      {name: 'asian',  percentage: '', color: '#99C794'}, //green
      {name: 'american indian', percentage: '', color: '#5FB3B3'}, //light blue
      {name: 'pacific islander',percentage: '', color: '#6699CC'}, //blue
      {name: 'biracial',percentage: '', color: '#C594C5'},  //purple
      {name: 'nonresident alien', percentage: '', color: '#AB7967'}, //brown
    ];

var pie = d3.pie()
	    .sort(null)
	    .value(function(d) {
	        return d.percentage;
	    });

		var svg2 = d3.select('#chart2').append("svg")
	    .attr("width", pieW)
	    .attr("height", pieH)
	    .append("g")
	    .attr("transform", "translate(" + pieW / 2 + "," + pieH / 2 + ")");





      function customXAxis(g) {
              g.call(xAxis);
              g.select(".domain").remove();
          }

          function customYAxis(g) {
                  g.call(yAxis);
                  g.select(".domain").remove();
                  g.selectAll(".tick text").attr("x", 4).attr("dy", -4);
              }


   var chartG = chart1.append('g');



//brushing


   var brush = d3.brush()
                .extent([[-10, -10], [width + 10, height + 10]]), idleTimeout,
                idleDelay = 200;
  brush.on('start', handleBrushStart)
      .on('brush', handleBrushMove)
      .on('end', handleBrushEnd);



  function handleBrushStart() {

    // console.log('%cBrush START!!', 'color: green');

    // We don't need to do anything here in our example.
    // In other cases, for example, if there are multiple charts that each has an independent brush,
    //    you might want to clear the existing brush whenever you start a new brush on a different chart,
    //    so that there is only one brush at any given time.
  }
  function handleBrushMove() {
    // console.log('%cBrush MOVING....', 'color: blue');

    // console.log(d3.event.selection); // check it out in the console!

  //   var sel = d3.event.selection;
  //   if (!sel) {
  //     // sel is null when we clear the brush
  //     return;
  //   }
  //   var [[left, top], [right, bottom]] = sel;
  //    console.log({left, top, right, bottom})
  //
  //
  // // Check all the text entries, highlight the ones that corresponding to the dots inside the brush
  // chart1.selectAll("circle")
  //       .filter(function (d) {
  //         var cx = xScale(d.SATM);
  //         var cy = yScale(d.SATV);
  //         if (left <= cx && cx <= right && top <= cy && cy <= bottom) {
  //
  //         }
  //     })



  // Note that we iterate through all the dots and text entries everytime the brush is moved.
  // This may be inefficient when the number of elements is very large - but in our case it doesn't matter
  //    and it's worth trading the negligible performance gain for simpler algorithm and better readability.
}
function idled() {
    idleTimeout = null;
}

function handleBrushEnd() {
  var sel = d3.event.selection;
  var [[left, top], [right, bottom]] = sel;

// Check all the text entries, highlight the ones that corresponding to the dots inside the brush
chart1.selectAll("circle")
.filter(function (d) {
  var cx = xScale(d["Median Debt"]);
  var cy = yScale(d["Median Earnings 8 years After Entry"]);
  if (!(left <= cx && cx <= right && top <= cy && cy <= bottom)) {
    return d;
  }
})
.remove();



          var s = d3.event.selection;
            if (!s) {
              if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
              xScale = d3.scaleLinear().domain([0, 30000]);
              yScale = d3.scaleLinear().domain([0, 130000]);
            } else {
                xScale.domain([s[0][0], s[1][0]].map(xScale.invert, xScale));
                yScale.domain([s[1][1], s[0][1]].map(yScale.invert, yScale));
                chart1.select(".brush").call(brush.move, null);

            }
            zoom();
        }


        function zoom() {
            var t = temp1.transition().duration(750);
            chart1.select("#axis-x").transition(t).call(xAxis);
            chart1.select("#axis-y").transition(t).call(yAxis);
            chart1.selectAll("circle").transition(t)
            .attr("cx", function(d) { return xScale(d["Median Debt"]); })
            .attr("cy", function(d) { return yScale(d["Median Earnings 8 years After Entry"]); })
        }
          chartG.call(brush);

function clearSelected() {
  d3.selectAll('.circle').classed('selected', false);
  chart3.select('#satm')
  .text('')
  chart3.select('#satv')
  .text('')
  chart3.select('#act')
  .text('')
  chart3.select('#gpa')
  .text('')
}


	 //add scatterplot pointsg
     var temp1 = chart1.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
     .attr("cx", 0)
	   .attr("cy", 0)
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
     .attr("fill", function(d){
      if(d["Undergrad Population"]<10000){
        //console.log(d["Undergrad Population"]);
        return "red";
      }else if(d["Undergrad Population"]<20000){
        return "orange";
      }else if(d["Undergrad Population"]<30000){
        return "yellow";
      }else if(d["Undergrad Population"]<40000){
        return "green";
      }else if(d["Undergrad Population"]<50000){
        return "blue";
      }else if(d["Undergrad Population"]<60000){
        return "purple";
      }
     })
	   .attr("cx", function(d) { return xScale(d["Median Debt"]); })
	   .attr("cy", function(d) { return yScale(d["Median Earnings 8 years After Entry"]); })
	   .attr("r", 5)
	   .on("click", function(d,i) {
       var x = chart1.selectAll("circle")
                    .classed('selected', false)
       var s = d3.select(this)
         s.classed('selected', true)
       var g = svg2.selectAll(".arc").remove();
       var g = svg2.selectAll("text").remove();

       data[0].percentage = d["% White"];
       data[1].percentage = d["% Black"];
       data[2].percentage = d["% Hispanic"];
       data[3].percentage = d["% Asian"];
       data[4].percentage = d["% American Indian"];
       data[5].percentage = d["% Pacific Islander"];
       data[6].percentage = d["% Biracial"];
       data[7].percentage = d["% Nonresident Aliens"];


       var g = svg2.selectAll(".arc")
         .data(pie(data))
         .enter().append("g")
         .attr("class", "arc");

      	 g.append("path")
       	.attr("d", arc)
        .transition()
        .duration(400)
        .style("fill", function(d,i) {
         	return d.data.color;
         });

         g.append("text")
     .attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 2.2;	//multiply by a constant factor
        _d[1] *= 2.2;	//multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .style("text-anchor", "middle")
      .text(function(d) {
        if(Number.isNaN(d.data.percentage)){
          return '';
        }
        if(d.data.percentage < 5) {
          return '';
        }
        console.log(d.data.percentage);
        return Math.ceil(d.data.percentage*100)/100 + '%';
        //console.log(d.data.percentage);
      });


     chart3.select('#name')
      .text(d["Name"])
      chart3.select('#satm')
      .text(d["Region"])
      chart3.select('#satv')
      .text(d["Median Debt"])
      chart3.select('#act')
      .text(d["Median Earnings 8 years After Entry"])
      chart3.select('#gpa')
      .text(d["Admission Rate"]*100 + "%")

       });





    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
    .attr('id', "axis-x")
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis) // call the axis generator
		.append("text")
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("Debt")
    .style('fill', 'black');

    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
    .attr('id', "axis-y")
		.attr("transform", "translate(50, 0)")
		.call(yAxis)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Earnings")
    .style('fill', 'black');

    // console.log(document.getElementById('chart3'));
    // document.getElementById('chart3').transform = transform.tra\(100,0);

    var cutoff = 0;
    var name = '';

    d3.select('#chart1')
        .append('p')
        .text('Admission Rate: ')
        .append('input')
        .attr('type','double')
        .attr('id','textInput')

    d3.select('#chart1')
        .append('button')
        .style("border", "1px solid black")
        .text('Filter Admissions')
        .on('click', function() {
            cutoff = document.getElementById('textInput').value
            //chart1.selectAll(".hidden").classed("hidden",false);
            chart1.selectAll("circle").classed("hidden",function(d){
              //console.log(d["Admission Rate"]<cutoff);
              return d["Admission Rate"]<cutoff;
            });
        });

    d3.select('#chart1')
        .append('p')
        .text('School Name: ')
        .append('input')
        .attr('type','double')
        .attr('id','textInput2')

        d3.select('#chart1')
        .append('button')
        .style("border", "1px solid black")
        .text('Search')
        .on('click', function() {
            name = document.getElementById('textInput2').value
            //chart1.selectAll(".hidden").classed("hidden",false);
            chart1.selectAll("circle").classed("hidden",function(d){
              //console.log(d["Admission Rate"]<cutoff);
              if(name==''){
                return false;
              }else{
              return d["Name"]!=name;
            }
            });
        });

        var svgLegned3 = d3.select(".legend3").append("svg")
            .attr("width", 100).attr("height", 300)

            var legend3 = svgLegned3.selectAll('.legend3')
            .data(legendVals2)
            .enter().append('g')
            .attr("class", "legends3")
            .attr("transform", function (d, i) {
            {
                return "translate(0," + i * 20 + ")"
            }
        })
        
        legend3.append('rect')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d, i) {
            return color[i]
        })
        
        legend3.append('text')
            .attr("x", 20)
            .attr("y", 10)
        //.attr("dy", ".35em")
        .text(function (d, i) {
            return d
        })
            .attr("class", "textselected")
            .style("text-anchor", "start")
            .style("font-size", 15)
	});
