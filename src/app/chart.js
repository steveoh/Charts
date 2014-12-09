console.log('starting up');

// Get the CSV and create the chart
$.ajax('data/logs/user_counts.csv').done(function(csv) {
    console.log('downloaded data');
    $('#container').highcharts({
        chart:{
            type: 'line'
        },
        data: {
            csv: csv
        },
        title: {
            text: 'Concurrent Users'
        },
        subtitle: {
            text: 'For 30 days',
        },
        xAxis: {
            tickInterval: 2 * 24 * 3600 * 1000,
            tickWidth: 0,
            gridLineWidth: 1,
            labels: {
                align: 'left',
                x: 3,
                y: -3
            }
        },
        yAxis: [{ // left y axis
            title: {
                text: 'Concurrent Users'
            },
            labels: {
                align: 'left',
                x: 3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }, { // right y axis
            linkedTo: 0,
            gridLineWidth: 0,
            opposite: true,
            title: {
                text: null
            },
            labels: {
                align: 'right',
                x: -3,
                y: 16,
                format: '{value:.,0f}'
            },
            showFirstLabel: false
        }],
        legend: {
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0,
            floating: true,
            y: 20
        },
        plotOptions: {
            series: {
                allowPointSelect: false
            }
        },
        series: [{
            lineWidth: 1,
            marker: {
                radius: 4
            }
        }]
    });
});