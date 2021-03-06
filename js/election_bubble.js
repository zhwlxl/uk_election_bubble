
var USER_SPEED = "fast";

var width = 750,
    height = 750,
	padding = 1,
	maxRadius = 3;
	// color = d3.scale.category10();

var sched_objs = [],
	curr_minute = 0;

var act_codes = [
	{"index": "0", "short": "Conservative", "desc": "Conservative"},
	{"index": "1", "short": "Labour", "desc": "Labour"},
	{"index": "2", "short": "Liberal/Liberal Democrats", "desc": "Liberal Democrats"},
	{"index": "3", "short": "Other", "desc": "Other"},
	{"index": "4", "short": "Plaid Cymru/SNP", "desc": "Plaid Cymru/Scottish National Party"},
	{"index": "5", "short": "Did not vote", "desc": "Did not vote"},
];


var speeds = { "slow": 200, "medium": 125, "fast": 75 };


var time_notes = [
	{ "start_minute": 1, "stop_minute": 51, "year": "December 1918", "img": "img/1918.jpg", "color": "yellow", "note": "In the immediate aftermath of the First World War, the 'coupon election' elects David Lloyd George as Prime Minister of a Conservative-Liberal Coalition" },
	{ "start_minute": 54, "stop_minute": 104, "year": "November 1922", "img": "img/1922.jpg",  "color": "blue", "note": "Andrew Bonar Law elected Prime Minister with an overall Conservative majority, heralding a 42 year period where the Conservatives would govern for all but 8 years" },
	{ "start_minute": 107, "stop_minute": 157, "year": "December 1923", "img": "img/1923.jpg",  "color": "red", "note": "A hung parliament is returned.  Ramsay MacDonald becomes the first Labour Prime Minister with tacit support from the Liberals" },
	{ "start_minute": 160, "stop_minute": 210, "year": "October 1924", "img": "img/1924.jpg",  "color": "blue", "note": "Stanley Baldwin becomes Conservative Prime Minister after a vote of no confidence in the Labour government" },
	{ "start_minute": 213, "stop_minute": 263, "year": "May 1929", "img": "img/1929.jpg",  "color": "red", "note": "A hung parliament results in Ramsay MacDonald returning to power as the Labour Party wins the most seats." },
	{ "start_minute": 266, "stop_minute": 316, "year": "October 1931", "img": "img/1931.jpg",  "color": "blue", "note": "A national government containing a large number of Conservatives is elected to power following the Great Depression.  Stanley Baldwin returns as Prime Minister." },
	{ "start_minute": 319, "stop_minute": 369, "year": "November 1935", "img": "img/1935.jpg",  "color": "blue", "note": "The national government is returned to power with a reduced majority.  This would be the last General Election for 10 years due to the Second World War." },
	{ "start_minute": 372, "stop_minute": 422, "year": "July 1945", "img": "img/1945.jpg",  "color": "red", "note": "Under Clement Attlee, Labour win an unexpected landslide victory, dumping wartime leader Winston Churchill out of power" },
	{ "start_minute": 425, "stop_minute": 471, "year": "February 1950", "img": "img/1950.jpg",  "color": "red", "note": "Despite an increase in votes, Labour's majority is reduced to just 5 seats, with an extremely high turnout of over 80%" },
	{ "start_minute": 478, "stop_minute": 524, "year": "October 1951", "img": "img/1951.jpg",  "color": "blue", "note": "Labour call an early election hoping to increase their majority.  Although their vote increases, they lose their majority to the Conservatives, returning Winston Churchill to power" },
	{ "start_minute": 531, "stop_minute": 577, "year": "May 1955", "img": "img/1955.jpg",  "color": "blue", "note": "The Conservatives increase their majority under new leader Sir Anthony Eden, in the first General Election for which television footage still survives" },
    { "start_minute": 584, "stop_minute": 630, "year": "October 1959", "img": "img/1959.jpg",  "color": "blue", "note": "The Conservatives increase their majority for a second consecutive time, with new leader Harold Macmillan" },
    { "start_minute": 637, "stop_minute": 683, "year": "October 1964", "img": "img/1964.jpg",  "color": "red", "note": "Labour win a narrow majority of four seats, electing Harold Wilson as the youngest Prime Minister for 150 years" },
    { "start_minute": 690, "stop_minute": 736, "year": "March 1966","img": "img/1966.jpg",  "color": "red", "note": "Labour call an early election due to their small majority, and increase their majority to almost 100 seats" },
    { "start_minute": 743, "stop_minute": 789, "year": "June 1970", "img": "img/1970.jpg",  "color": "blue", "note": "The Conservatives win in a upset, electing Edward Heath as Prime Minister" },
    { "start_minute": 796, "stop_minute": 840, "year": "February 1974", "img": "img/1974-1.jpg",  "color": "red", "note": "A hung parliament is elected.  Incumbent Prime Minister Edward Heath fails to find a coalition and Harold Wilson is returned as leader of a Labour minority government" },
    { "start_minute": 849, "stop_minute": 895, "year": "October 1974", "img": "img/1974-2.jpg",  "color": "red", "note": "Labour, struggling as a minority government, quickly calls another election and achieves a slim majority of three seats" },
    { "start_minute": 902, "stop_minute": 948, "year": "May 1979", "img": "img/1979.jpg",  "color": "blue", "note": "Labour leader Jim Callaghan loses a vote of confidence and the Conservatives win the ensuing General Election, with Margaret Thatcher becoming Britain's first woman Prime Minister" },
    { "start_minute": 955, "stop_minute": 1001, "year": "June 1983", "img": "img/1983.jpg",  "color": "blue", "note": "In the aftermath of the Falklands War, the Conservatives win in a landslide" },
    { "start_minute": 1009, "stop_minute": 1054, "year": "June 1987", "img": "img/1987.jpg",  "color": "blue", "note": "Margaret Thatcher becomes the first leader to achieve three successive General Election wins since 1820, as the Conservatives win in another landslide" },
    { "start_minute": 1061, "stop_minute": 1107, "year": "April 1992", "img": "img/1992.jpg",  "color": "blue", "note": "The Conservatives, under new leader John Major, win a surprise fourth consecutive term, and receive the largest number of votes in General Election history" },
    { "start_minute": 1114, "stop_minute": 1160, "year": "May 1997", "img": "img/1997.jpg",  "color": "red", "note": "Tony Blair leads Labour to the largest number of seats in its history, with the Conservatives losing over half their seats" },
    { "start_minute": 1167, "stop_minute": 1213, "year": "June 2001", "img": "img/2001.jpg",  "color": "red", "note": "Another landslide for Tony Blair and Labour, but with a notably low turnout" },
    { "start_minute": 1220, "stop_minute": 1267, "year": "May 2005", "img": "img/2005.jpg",  "color": "red", "note": "A third consecutive term for Labour under Tony Blair, but with a reduced majority" },
    { "start_minute": 1273, "stop_minute": 1319, "year": "May 2010", "img": "img/2010.jpg",  "color": "blue", "note": "A hung parliament results in a Conservative-Liberal Democrat coalition led by David Cameron - the first coalition in British history to eventuate from an election outcome" },
    { "start_minute": 1326, "stop_minute": 1372, "year": "May 2015", "img": "img/2015.jpg",  "color": "blue", "note": "The Conservatives unexpectedly win an outright majority, with the consequences of a referendum on EU membership in 2016, which led to David Cameron's resignation as Prime Minister" },
    { "start_minute": 1379, "stop_minute": 1436, "year": "June 2017", "img": "img/2017.jpg",  "color": "blue", "note": "New Conservative leader Theresa May calls an early election and the Conservatives lose their majority.  They continue in government with the support of the DUP" },
];
var notes_index = 0;


// Activity to put in center of circle arrangement
var center_act = "Did not vote",
	center_pt = { "x": 380, "y": 365 };


// Coordinates for activities
var foci = {};
act_codes.forEach(function(code, i) {
	if (code.desc == center_act) {
		foci[code.index] = center_pt;
	} else {
		var theta = 2 * Math.PI / (act_codes.length-1);
		foci[code.index] = {x: 250 * Math.cos((i - 1) * theta)+380, y: 250 * Math.sin((i - 1) * theta)+365 };
	}
});


// Start the SVG
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('position', 'absolute')
    .attr('left', '200px')
    .attr('top', '200px');


// Load data and let's do it.
d3.tsv("data/elec_results.tsv", function(error, data) {

	data.forEach(function(d) {
		var day_array = d.day.split(",");
		var activities = [];
		for (var i=0; i < day_array.length; i++) {
			// Duration
			if (i % 2 == 1) {
				activities.push({'act': day_array[i-1], 'duration': +day_array[i]});
			}
		}
		sched_objs.push(activities);
	});

	// Used for percentages by minute
	var act_counts = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };

	// A node for each person's schedule
	var nodes = sched_objs.map(function(o,i) {
		var act = o[0].act;
		act_counts[act] += 1;
		var init_x = foci[act].x + Math.random();
		var init_y = foci[act].y + Math.random();
		return {
			act: act,
			radius: 3,
			x: init_x,
			y: init_y,
			color: color(act),
			moves: 0,
			next_move_time: o[0].duration,
			sched: o,
		}
	});

	var force = d3.layout.force()
		.nodes(nodes)
		.size([width, height])
		// .links([])
		.gravity(0)
		.charge(0)
		.friction(.9)
		.on("tick", tick)
		.start();

	var circle = svg.selectAll("circle")
		.data(nodes)
	    .enter().append("circle")
		.attr("r", function(d) { return d.radius; })
		.style("fill", function(d) { return d.color; });
		// .call(force.drag);

	// Activity labels
	var label = svg.selectAll("text")
		.data(act_codes)
	  .enter().append("text")
		.attr("class", "actlabel")
		.attr("x", function(d, i) {
			if (d.desc == center_act) {
				return center_pt.x;
			} else {
				var theta = 2 * Math.PI / (act_codes.length-1);
				return 340 * Math.cos((i - 1) * theta)+380;
			}

		})
		.attr("y", function(d, i) {
			if (d.desc == center_act) {
				return center_pt.y;
			} else {
				var theta = 2 * Math.PI / (act_codes.length-1);
				return 340 * Math.sin((i - 1) * theta)+365;
			}

		});

	label.append("tspan")
		.attr("x", function() { return d3.select(this.parentNode).attr("x"); })
		// .attr("dy", "1.3em")
		.attr("text-anchor", "middle")
		.text(function(d) {
			return d.short;
		});
	label.append("tspan")
		.attr("dy", "1.3em")
		.attr("x", function() { return d3.select(this.parentNode).attr("x"); })
		.attr("text-anchor", "middle")
		.attr("class", "actpct")
		.text(function(d) {
			return act_counts[d.index] + "%";
		});


	// Update nodes based on activity and duration
	function timer() {
		d3.range(nodes.length).map(function(i) {
			var curr_node = nodes[i],
				curr_moves = curr_node.moves;

			// Time to go to next activity
			if (curr_node.next_move_time == curr_minute) {
				if (curr_node.moves == curr_node.sched.length-1) {
					curr_moves = 0;
				} else {
					curr_moves += 1;
				}

				// Subtract from current activity count
				act_counts[curr_node.act] -= 1;

				// Move on to next activity
				curr_node.act = curr_node.sched[ curr_moves ].act;

				// Add to new activity count
				act_counts[curr_node.act] += 1;

				curr_node.moves = curr_moves;
				curr_node.cx = foci[curr_node.act].x;
				curr_node.cy = foci[curr_node.act].y;

				nodes[i].next_move_time += nodes[i].sched[ curr_node.moves ].duration;
			}

		});

		force.resume();
		curr_minute += 1;

		// Update percentages
		label.selectAll("tspan.actpct")
			.text(function(d) {
				return readablePercent(act_counts[d.index]);
			});

		// Update year and notes
		var true_minute = curr_minute % 1440;
		if (true_minute == time_notes[notes_index].start_minute) {
		    d3.select("#year")
		        .style("color", "#fffced")
		        .style("text-align", "left")
		        .style("font-size", "300%")
				.style("font-family", "adobe-caslon-pro")
				.text(time_notes[notes_index].year)
				.transition()
				.duration(500)
				.style("text-align", "center")
				.style("color", "#000000");
		}

        if (true_minute == time_notes[notes_index].start_minute + 10) {
			d3.select("#image").append('img')
			    .attr('src', time_notes[notes_index].img)
                .attr('width', 200)
                .attr('height', 250)
                .style('position', 'absolute')
                .style('top', '100px')
                .style('left', '150px')
                .style('opacity', 0)
                .style("display", "block")
                .style("background", time_notes[notes_index].color)
                .style("padding", "8px")
                .style("border", "1px solid #ccc")
                .style("box-shadow", "5px 5px 5px #999")
                .transition()
                .duration(1000)
                .style('opacity', 1);
	    }

		if (true_minute == time_notes[notes_index].start_minute + 10) {
			d3.select("#note")
				.style("top", "500px")
				.style("color", "#fffced")
				.style("font-size", "150%")
				.style("font-style", "italic")
			    .transition()
				.duration(500)
				.style("top", "370px")
				.style("color", "#000000")
				.text(time_notes[notes_index].note);
	    }

	    if (true_minute == time_notes[notes_index].stop_minute - 5) {
	        d3.select('#image')
	            .transition()
	            .duration(500)
	            .attr('opacity', 0);
	    }

		// Make note disappear at the end.
		else if (true_minute == time_notes[notes_index].stop_minute) {

			d3.select("#note").transition()
				.duration(500)
				.style("top", "500px")
				.style("color", "#fffced");

			d3.select("#year").transition()
				.duration(500)
				.style("top", "300px")
				.style("color", "#fffced");

			notes_index += 1;
			if (notes_index == time_notes.length) {
				notes_index = 0;
			}
		}


		setTimeout(timer, speeds[USER_SPEED]);
	}
	setTimeout(timer, speeds[USER_SPEED]);


	function tick(e) {
	  var k = 0.04 * e.alpha;

	  // Push nodes toward their designated focus.
	  nodes.forEach(function(o, i) {
		var curr_act = o.act;
        var damper = 1;
		o.color = color(curr_act);
	    o.y += (foci[curr_act].y - o.y) * k * damper;
	    o.x += (foci[curr_act].x - o.x) * k * damper;
	  });

	  circle
	  	  .each(collide(.5))
	  	  .style("fill", function(d) { return d.color; })
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; });
	}


	// Resolve collisions between nodes.
	function collide(alpha) {
	  var quadtree = d3.geom.quadtree(nodes);
	  return function(d) {
	    var r = d.radius + maxRadius + padding,
	        nx1 = d.x - r,
	        nx2 = d.x + r,
	        ny1 = d.y - r,
	        ny2 = d.y + r;
	    quadtree.visit(function(quad, x1, y1, x2, y2) {
	      if (quad.point && (quad.point !== d)) {
	        var x = d.x - quad.point.x,
	            y = d.y - quad.point.y,
	            l = Math.sqrt(x * x + y * y),
	            r = d.radius + quad.point.radius + (d.act !== quad.point.act) * padding;
	        if (l < r) {
	          l = (l - r) / l * alpha;
	          d.x -= x *= l;
	          d.y -= y *= l;
	          quad.point.x += x;
	          quad.point.y += y;
	        }
	      }
	      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	    });
	  };
	}




	// Speed toggle
	d3.selectAll(".togglebutton")
      .on("click", function() {
        if (d3.select(this).attr("data-val") == "slow") {
            d3.select(".slow").classed("current", true);
			d3.select(".medium").classed("current", false);
            d3.select(".fast").classed("current", false);
        } else if (d3.select(this).attr("data-val") == "medium") {
            d3.select(".slow").classed("current", false);
			d3.select(".medium").classed("current", true);
            d3.select(".fast").classed("current", false);
        }
		else {
            d3.select(".slow").classed("current", false);
			d3.select(".medium").classed("current", false);
			d3.select(".fast").classed("current", true);
        }

		USER_SPEED = d3.select(this).attr("data-val");
    });
}); // @end d3.tsv



function color(activity) {

	var colorByActivity = {
		"0": "blue",
		"1": "red",
		"2": "yellow",
		"3": "brown",
		"4": "black",
		"5": "grey",
	}

	return colorByActivity[activity];

}



// Output readable percent based on count.
function readablePercent(n) {

	var pct = 100 * n / 1000;
	if (pct < 1 && pct > 0) {
		pct = "<1%";
	} else {
		pct = Math.round(pct) + "%";
	}

	return pct;
}

