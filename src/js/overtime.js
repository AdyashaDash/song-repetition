import * as d3 from 'd3';
import DATA from './years.js';

var linecolor = "steelblue";
const MOVING_YAXIS = false;

class OverTimeChart {

  constructor() {
    this.root = d3.select('#rovertime');
    let margin = {top: 20, right: 20, bottom: 50, left: 40};
    var totalW = 1200;
    var totalH = 600;
    this.W = totalW - margin.left - margin.right;
    this.H = totalH - margin.top - margin.bottom;
    this.R = 25; // radius of artist circles
    this.svg = this.root.append('svg')
      .attr('width', totalW)
      .attr('height', totalH)
      .style('background-color', 'rgba(255,240,255,1)')
      .append("g")
        .attr("transform", "translate(" + margin.left + " " + margin.top + ")");

    //this.xscale = d3.scaleOrdinal()
    this.xscale = d3.scaleLinear() // TODO: figure out ordinal v linear
      .domain(d3.extent(DATA, (yr) => (yr.year)))
      .range([0, this.W]);
    // Scale the y axis up enough to accomodate the top topsong
    // (TODO: might want to do this dynamically)
    let topsongs = DATA.map((yr) => (yr.topsong.rscore));
    let yrscores = DATA.map((yr) => (yr.rscore));
    let hitscores = DATA.map((yr) => (yr.hitsRscore));
    let all_ys = yrscores.concat(hitscores);
    if (!MOVING_YAXIS) {
      all_ys = all_ys.concat(topsongs);
    }
    all_ys.push(0.75); 
    let yextent = d3.extent(all_ys);
    this.ymin = yextent[0];
    this.ymax = yextent[1];
    this.yscale = d3.scaleLinear()
      .domain(d3.extent(all_ys))
      .range([this.H, 0]);

    // X axis
    this.svg.append("g")
        .attr("transform", "translate(0 " + this.H + ")")
        .call(d3.axisBottom(this.xscale).ticks(10, 'd'));

    // Y axis
    this.svg.append("g")
        .classed('yaxis', true)
          .call(d3.axisLeft(this.yscale))
        .append("text")
          .attr("transform", "rotate(-90)")
          .text("repetitiveness");
    // TODO: figure out why label isn't showing up

    this.addGridLines();

  }

  updateYMax(ymax) {
    if (!ymax) {
      this.ymax = this.prevYMax;
      this.prevYMax = null;
    } else {
      this.prevYMax = this.ymax;
      this.ymax = ymax;
    }
    this.yscale.domain([this.ymin, this.ymax]);
    this.svg.select('.yaxis').call(d3.axisLeft(this.yscale));
    // need to redraw all points
    //this.plotOverall()
    // TODO: this turns out to be kinda complicated. probably should try
    // to smoothly animate the line down (or up), but this has the effect
    // of pulling the rug from under the user's cursor, causing the point
    // they were on to be mouseout'd. Blargh.
  }

  addGridLines() {
    let xgrid = d3.axisBottom(this.xscale).ticks(5);
    let ygrid = d3.axisLeft(this.yscale).ticks(5);
    this.svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + this.H + ")")
      .call(xgrid
          .tickSize(-this.H)
          .tickFormat("")
      );
    this.svg.append("g")
      .attr("class", "grid")
      .call(ygrid
          .tickSize(-this.W)
          .tickFormat("")
      );
  }

  plotOverall() {
    let xer = (yr) => (this.xscale(yr.year));
    let yer = (yr) => (this.yscale(yr.rscore));
    // line
    var line = d3.line()
      .x( (yr) => (this.xscale(yr.year)))
      .y( (yr) => (this.yscale(yr.rscore)));
    // render it
    this.svg.append("path")
      .datum(DATA)
      .attr("stroke", linecolor)
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    // zzz
    this.pointifier = (sel) => (
        sel.append('circle')
          .classed('pt', true)
          .attr('r', 3)
          .attr('cx', xer)
          .attr('cy', yer)
    );
    this.pointifier(
      this.svg.selectAll('.pt').data(DATA)
        .enter()
      )
      .on('mouseover', (d,i,n) => {this.focusYear(d,i,n)})
      .on('mouseout', (d,i,n) => {this.defocusYear(d,i,n)})
      .attr('fill', linecolor);

  }

  focusYear(dat, i, nodes) {
    let pt = nodes[i];
    d3.select(pt).attr('fill', 'red');
    // add a point and label for topsong
    let hov = this.svg.append('g').classed('hover', true);
    let topsong = dat.topsong;
    topsong.year = dat.year;
    let x = this.xscale(topsong.year);
    if (MOVING_YAXIS && topsong.rscore > this.ymax) {
      console.log('increasing ymax');
      this.updateYMax(topsong.rscore);
    }
    let y = this.yscale(topsong.rscore);
    hov.append('circle')
      .classed('pt', true)
      .attr('r', 3)
      .attr('cx', x)
      .attr('cy', y)
      .attr('fill', 'fuchsia');

    hov.append('text')
      .text(topsong.artist + ' - ' + topsong.title)
      .attr('x', x+11)
      .attr('y', y+3)
      .attr('font-size', 16);

  }

  defocusYear(dat, i, nodes) {
    if (this.prevYMax) {
      this.updateYMax();
    }
    let pt = nodes[i];
    d3.select(pt).attr('fill', linecolor);
    this.svg.selectAll('.hover').remove();
  }

  static init() {
    let c = new OverTimeChart();
    c.plotOverall();
    return c;
  }
}

export default OverTimeChart;
