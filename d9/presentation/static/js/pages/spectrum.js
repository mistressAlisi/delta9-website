var spc_canvas = {}
var spc_charts = {}
function draw_fullSpectrum() {
    $.getJSON('/static/json/SPECTRUM-fullOutput.json',function(data){
  draw_scatterChart(data,'chart_fullspectrum');
  
})};

function draw_12hProfile() {
    $.getJSON('/static/json/SPECTRUM-12x12h.json',function(data){
  draw_profileChart(data,'chart_profile');
  
})};

function draw_24hProfile() {
    $.getJSON('/static/json/SPECTRUM-24h.json',function(data){
  draw_profileChart(data,'chart_profile');
  
})};

function draw_bloomProfile() {
    $.getJSON('/static/json/SPECTRUM-bloom.json',function(data){
  draw_profileChart(data,'chart_profile');
  
})};

function draw_16hProfile() {
    $.getJSON('/static/json/SPECTRUM-16x8h.json',function(data){
  draw_profileChart(data,'chart_profile');
  
})};
function draw_vegProfile() {
    $.getJSON('/static/json/SPECTRUM-veg.json',function(data){
  draw_profileChart(data,'chart_profile');
  
})};
function draw_scatterChart(data,canvas) {    
    items_bc = [];
    items_ca = [];
    items_cb = [];
    items_d9 = [];
    for (d in data) {
           items_bc.push({"x":data[d]["nm"],"y":data[d]["bc"]});
           items_ca.push({"x":data[d]["nm"],"y":data[d]["cha"]});
           items_cb.push({"x":data[d]["nm"],"y":data[d]["chb"]});
           items_d9.push({"x":data[d]["nm"],"y":data[d]["d9"]});
//         items_bc.push(data[d]["bc"]);
    };
    spc_canvas[canvas] = document.getElementById(canvas);
    context = spc_canvas[canvas].getContext('2d');
    spc_charts[canvas] = new Chart.Scatter(context,{
        data: {
            datasets: [
            {
                label: "Beta-Carotene",
                data: items_bc,
                borderColor: '#ff0000',
                backgroundColor: 'rgba(255,0,0,0.2)',
                showLine: true,
            },
            {
                label: "Clorophyll-A",
                data: items_ca,
                borderColor: '#00ff00',
                backgroundColor: 'rgba(0,255,0,0.2)',
                showLine: true,
            },
            {
                label: "Clorophyll-B",
                data: items_cb,
                borderColor: '#00ddcc',
                backgroundColor: 'rgba(0,250,50,0.2)',
                showLine: true,
            },
            {
                label: "delta9",
                data: items_d9,
                borderColor: 'rgba(127,0,127,1)',
                backgroundColor: 'rgba(127,0,127,0.6)',
                showLine: true,
            },
            ]},
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                        min: 360,
                        max: 800
                        }
                        
                    }],
                    yAxes: [{
                        ticks: {
                        min: 0,
                        max: 50
                        }
                    }]
            }
                
            }
    });
};

function draw_profileChart(data,canvas) {    
    items_fr = [];
    items_dr = [];
    items_bl = [];
    items_gr = [];
    for (d in data) {
           items_fr.push({"x":data[d]["t"],"y":data[d]["fr"]});
           items_dr.push({"x":data[d]["t"],"y":data[d]["dr"]});
           items_bl.push({"x":data[d]["t"],"y":data[d]["bl"]});
           items_gr.push({"x":data[d]["t"],"y":data[d]["gr"]});
//         items_fr.push(data[d]["bc"]);
    };
    spc_canvas[canvas] = document.getElementById(canvas);
    context = spc_canvas[canvas].getContext('2d');
    if (spc_charts[canvas] == undefined) {
    spc_charts[canvas] = new Chart.Scatter(context,{
        data: {
            datasets: [
            {
                label: "Far Red",
                data: items_fr,
                borderColor: 'rgba(127,0,127,1)',
                backgroundColor: 'rgba(127,0,127,0.2)',
                showLine: true,
            },
            {
                label: "Deep Red",
                data: items_dr,
                borderColor: '#ff0000',
                backgroundColor: 'rgba(255,0,0,0.2)',
                showLine: true,
            },
            {
                label: "Deep Blue",
                data: items_bl,
                borderColor: 'rgb(0,0,250,1)',
                backgroundColor: 'rgba(0,0,250,0.2)',
                showLine: true,
            },
            {
                label: "Green",
                data: items_gr,
                borderColor: 'rgba(0,127,0,1)',
                backgroundColor: 'rgba(0,127,0,0.6)',
                showLine: true,
            },
            ]},
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            max: 23,
                            stepSize:1
                        }
                        
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 11,
                            stepSize:1
                        }
                    }]
            }
                
            }
    })} else {
        spc_charts[canvas].data.datasets = [];
        spc_charts[canvas].data.datasets = 
            [
            {
             label: "Far Red",
                data: items_fr,
                borderColor: 'rgba(127,0,127,1)',
                backgroundColor: 'rgba(127,0,127,0.2)',
                showLine: true,
            },
            {
                label: "Deep Red",
                data: items_dr,
                borderColor: '#ff0000',
                backgroundColor: 'rgba(255,0,0,0.2)',
                showLine: true,
            },
            {
                label: "Deep Blue",
                data: items_bl,
                borderColor: 'rgb(0,0,250,1)',
                backgroundColor: 'rgba(0,0,250,0.2)',
                showLine: true,
            },
            {
                label: "Green",
                data: items_gr,
                borderColor: 'rgba(0,127,0,1)',
                backgroundColor: 'rgba(0,127,0,0.6)',
                showLine: true,
            },
            ];
        spc_charts[canvas].update();
    }
    
};
$(document).ready(function(){
    draw_fullSpectrum();
    draw_12hProfile();
 });
