/**
 * Created by ubuntu on 5/21/14.
 */

// Config Chart

function renderChart(objectChart) {

    if (typeof(objectChart) === 'string')  objectChart = JSON.parse(objectChart);
    var opt
    var chart
    var events = {}
    var opt = {}

    opt.typeChart = objectChart.type
    opt.grafrender = objectChart.renderto
    opt.legendaX = objectChart.labelX
    opt.legendaY = objectChart.labelY
    opt.url = objectChart.url
    opt.method = objectChart.method
    opt.data = objectChart.data
    opt.drilldown = objectChart.drilldown
    opt.chart_drilldown = objectChart.chart_drilldown
    opt.remote = objectChart.remote
    opt.parameter = objectChart.parameter
    opt.parameter_value = objectChart.parameter_value
    opt.data_format = objectChart.data_format
    opt.unidade = objectChart.unidade

    boxButtons(objectChart)

    if (opt.remote == true) {
        $.ajaxSetup({async: false});

        $.getJSON(opt.url + "?" + opt.parameter + "=" + opt.parameter_value, function (data) {
            categories = []
            series = []

            if (opt.data_format == 2) {
                $.each(data, function (key, val) {
                    categories.push(val[0])
                });
                $.each(data, function (key, val) {
                    series.push([
                        { name: val[1], data: val[2], pointPadding: 0.3, pointPlacement: -0.2 },
                        { name: val[3], data: val[4], pointPadding: 0.4, pointPlacement: -0.2 }
                    ])
                });

                series = series[0]
                title = objectChart.title
            
            } else if (opt.data_format == 3) {
                $.each(data, function (key, val) {
                    categories.push(val[0])
                });
                $.each(data, function (key, val) {
                    series.push([
                        { name: val[1], data: val[2]},
                        { name: val[3], data: val[4]}
                    ])
                });

                series = series[0]
                title = objectChart.title
            } else if (opt.data_format == 1) {
                $.each(data, function (key, val) {
                    categories.push(val[0])
                });

                $.each(data, function (key, val) {
                    series.push(val[1])
                });
            } else {
                series = [
                    {data: data}
                ]
            }

            if (typeof opt.parameter_value === 'undefined') {
                title = objectChart.title
            } else {
                title = objectChart.title + ' ' + opt.parameter_value
            }

            opt.title = title
            opt.categories = categories
            opt.series = series
        }).fail(function (jqXHR) {
            alert("Error");
        });


    } else {
        opt.title = objectChart.title
        opt.categories = objectChart.categories
        opt.series = objectChart.series
    }

    if (opt.drilldown == true) {
        var param
        if (opt.data_format == 3) {
            param = 'event.point.category'
        } else if (opt.data_format == 2) {
            param = 'event.point.category'
        } else {
            param = 'event.point.name'
        }

        backButton.render(objectChart)
        events = {
            click: function (event) {
                backButton.show(objectChart),
                opt.chart_drilldown.parameter_value = eval(param),
                renderChart(opt.chart_drilldown)

            }
        }
    }

    var colores = [
        '#7cb5ec',
        '#90ed7d',
        '#f7a35c',
        '#7cb5ec',
        '#EECFA1',
        '#708090',
        '#CD919E',
        '434348'
    ]

    if (opt.unidade == 'R$') {
        Highcharts.setOptions({
            lang: {
                decimalPoint: ',',
                thousandsSep: ".",
                numericSymbols: [' Centenas', ' Milhões', ' Bilhões'],
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                weekdays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
                shortMonths: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Imprimir",
                rangeSelectorFrom: "de",
                rangeSelectorTo: "para",
                rangeSelectorZoom: "Período",
                downloadPNG: 'Download em PNG',
                downloadJPEG: 'Download em JPEG',
                downloadPDF: 'Download em PDF',
                downloadSVG: 'Download em SVG',
                resetZoom: "Voltar o zoom",
                resetZoomTitle: "Redefinição de zoom"
            },
            tooltip: {
                yDecimals: 2 // If you want to add 2 decimals
            }
        });
    } else {
        Highcharts.setOptions({
            lang: {
                decimalPoint: ',',
                thousandsSep: ".",
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                weekdays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
                shortMonths: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Imprimir",
                rangeSelectorFrom: "de",
                rangeSelectorTo: "para",
                rangeSelectorZoom: "Período",
                downloadPNG: 'Download em PNG',
                downloadJPEG: 'Download em JPEG',
                downloadPDF: 'Download em PDF',
                downloadSVG: 'Download em SVG',
                resetZoom: "Voltar o zoom",
                resetZoomTitle: "Redefinição de zoom"
            },
            tooltip: {
                yDecimals: 2 // If you want to add 2 decimals
            }
        });

    }



    var bar = function () {
        chart;
        $(document).ready(function () {
            chart = new Highcharts.Chart({
                chart: {
                    renderTo: opt.grafrender,
                    type: 'bar',
//                    zoomType: 'y',
                    options3d: {
                        enabled: true,
                        alpha: 0,
                        beta: 0,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                series: eval(opt.series),
                title: {
                    text: '' //opt.title
                },
                yAxis: {
//                    categories: eval(opt.categories),
                    allowDecimals: false,
                    title: {
                        text: legendaY
                    }
                },
                legend: {
                    enabled: true,
                    floating: false
                },
                plotOptions: {
                    series: {
                        animation: true,
                        duration: 2000,
//                        colorByPoint: true,
                    },
                    bar: {
                        dataLabels: {
                            enabled: true
                        },

                    }
                },
                colores: colores,
                credits: {
                    enabled: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.y + ' ' + this.x.toLowerCase();
                    }
                }
            });
            chart.redraw();
        });
    }

    var columnStacked = function () {
        $(document).ready(function () {

            chart = new Highcharts.Chart({
                chart: {
                    renderTo: opt.grafrender,
                    type: 'column',
//                    zoomType: 'x',
                    options3d: {
                        enabled: false,
                        alpha: 0,
                        beta: 20,
                        depth: 50

                    }
                }, plotOptions: {
                    column: {
                        grouping: false,
                        shadow: true,
                        borderWidth: 0
                    }
                },
                series: eval(opt.series),
                title: {
                    text: opt.title
                },
                yAxis: {
                    max: 100,
                    title: {
                        text: ''
                    }
                },
                xAxis: {
                    categories: eval(opt.categories)
                },
                legend: {
//                    align: 'right',
//                    x: -70,
//                    verticalAlign: 'top',
//                    y: 20,
//                    floating: true,
//                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
//                    borderColor: '#CCC',
//                    borderWidth: 1,
//                    shadow: false
                    enabled: false,
                    floating: false

                },
                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: "{point.y}%"

                        }, lang: {
                            decimalPoint: ',',
                            thousandsSep: '.'
                        }
                    },
                    series: {
                        cursor: 'pointer',
                        events: events
                    }

                },
//                colors: colores.sort(),
                credits: {
                    enabled: false
                },
                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:.2f}%</b><br/>'
                },
                lang: {
                    decimalPoint: ',',
                    thousandsSep: '.'
                }
            });

            chart.redraw();
        });


    }

var columnStackedPercentage = function () {
  $(document).ready(function () {

            chart = new Highcharts.Chart({
                chart: {
                    renderTo: opt.grafrender,
                    type: 'column',
                }, 
                series: eval(opt.series),
                title: {
                    text: opt.title
                },
                yAxis: {
                    max: 100,
                    title: {
                        text: ''
                    }
                },
                xAxis: {
                    categories: eval(opt.categories)
                },
                legend: {
                    enabled: false,
                    floating: false
                },
                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        stacking: 'percent',
                        borderWidth: 0,
                        dataLabels: {
                          enabled: false,
                          format: "{point.y}%"
                        }, 
                        lang: {
                          decimalPoint: ',',
                          thousandsSep: '.'
                        }
                    },
                    series: {
                        cursor: 'pointer',
                        events: events
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    shared: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    style: { color: '#F0F0F0' },
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>R$ {point.y}</b> ({point.percentage:.0f}%)<br/>'
                },
                lang: {
                    decimalPoint: ',',
                    thousandsSep: '.'
                },
                colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee","#55BF3B", "#DF5353", "#7798BF", "#aaeeee"]
            });

            chart.redraw();
        });
    }

    var column = function () {
        $(document).ready(function () {

            chart = new Highcharts.Chart({
                chart: {
                    renderTo: opt.grafrender,
                    type: 'column',
                    zoomType: 'x',
                    options3d: {
                        enabled: true,
                        alpha: 5,
                        beta: 10,
                        depth: 50,
                        viewDistance: 15
                    }
                },
                series: eval(opt.series),
                title: {
                    text: opt.title
                },
                yAxis: {
                    allowDecimals: true,
                    title: {
                        text: opt.legendaY
                    }
                },
                xAxis: {
                    categories: eval(opt.categories),
                    allowDecimals: true,
                    title: {
                        text: opt.legendaX
                    },
                    labels: {
                        rotation: 0,
                        align: 'right',
                        style: {
                            fontSize: '9px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                legend: {
                    enabled: false,
                    floating: false
                },
                plotOptions: {
                    column: {
//                        grouping: false,
//                        shadow: false,
//                        borderWidth: 0,
//                        dataLabels: {
//                            enabled: true,
//                            format: "{point.y}%"
//
//                        }, lang: {
//                            decimalPoint: ',',
//                            thousandsSep: '.'
//                        }
                    },
                    series: {
                        cursor: 'pointer',
                        events: events
                    }

                },
                colors : colores,
                credits : {
                    enabled: false
                }
//                tooltip: {
//                    shared: true,
//                    pointFormat: '<span style="color:{point.color}">' + opt.unidade + ' </span><b>{point.y}</b><br/>'
//                }
        });
        buttons(chart)
        chart.redraw();

    }
)
    ;
}

    var pie = function () {
        $(document).ready(function () {

                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: opt.grafrender,
                        type: 'pie',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,

                    },
                    series: eval(opt.series),
                    title: {
                        text: opt.title
                    },
                    yAxis: {
                        allowDecimals: true,
                        title: {
                            text: opt.legendaY
                        }
                    },
                    xAxis: {
                        categories: eval(opt.categories),
                        allowDecimals: true,
                        title: {
                            text: opt.legendaX
                        },
                        labels: {
                            rotation: 0,
                            align: 'right',
                            style: {
                                fontSize: '9px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    legend: {
                        enabled: false,
                        floating: false
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: true
                        },
                        series: {
                            cursor: 'pointer',
                            events: events
                        }

                    },
                    colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
                    credits : {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: '<b>R$ {point.y}</b>'
                    },
                });
                buttons(chart)
                chart.redraw();

            }
        )
        ;
    }


return eval(opt.typeChart + '()');
}


var boxButtons = function (chart) {
    if (getBoxButtons(chart).length == 0) {
        box_buttons = $('<div></div>').addClass('box-chart-buttons well well-sm text-right')
        $(box_buttons).appendTo($('#' + chart.renderto).parent())
    }
}

var getBoxButtons = function (chart) {
    return  $('#' + chart.renderto).siblings('.box-chart-buttons')
}
var backButton = {
    render: function (chart) {
        box = getBoxButtons(chart)
        if ($(box).children('.btn-back-chart').length == 0) {
            button = $("<a href='javascript:;'>Voltar</a>").addClass('btn-back-chart').addClass('btn').addClass('btn-default').hide()

            button.click(function () {
                renderChart(chart)
            })
            $(button).appendTo(box)

        } else {
            this.hide(chart)
        }
    },
    show: function (chart) {
        box = getBoxButtons(chart)
        box.children('.btn-back-chart').show();
    },

    hide: function (chart) {
        box = getBoxButtons(chart)
        box.children('.btn-back-chart').hide();
    }

}


var label = function (chart) {

    var enableDataLabels = true;
    $('#data-labels').click(function () {
        chart.series[0].update({
            dataLabels: {
                enabled: enableDataLabels
            }
        });
        enableDataLabels = !enableDataLabels;
    });
}

var buttons = function (chart) {
    $(function () {
        // Toggle names
        var name = false;
        $('#name').click(function () {
            chart.series[0].update({
                name: name ? null : 'First'
            });
            name = !name;
        });

        // Toggle data labels
        var enableDataLabels = true;
        $('#data-labels').click(function () {
            chart.series[0].update({
                dataLabels: {
                    enabled: enableDataLabels
                }
            });
            enableDataLabels = !enableDataLabels;
        });

        // Toggle point markers
        var enableMarkers = true;
        $('#markers').click(function () {
            chart.series[0].update({
                marker: {
                    enabled: enableMarkers
                }
            });
            enableMarkers = !enableMarkers;
        });

        // Toggle point markers
        var color = false;
        $('#color').click(function () {
            chart.series[0].update({
                color: color ? null : Highcharts.getOptions().colors[1]
            });
            color = !color;
        });

        // Set type
        $.each(['line', 'column', 'spline', 'area', 'areaspline', 'scatter', 'pie'], function (i, type) {
            $('.' + type).click(function () {
                chart.series[0].update({
                    type: type
                });
            });
        });
    });

}


var do_on_load = function () {

    $(function () {
        Highcharts.SparkLine = function (options, callback) {
            var defaultOptions = {
                chart: {
                    renderTo: (options.chart && options.chart.renderTo) || this,
                    backgroundColor: null,
                    borderWidth: 0,
                    type: 'area',
                    margin: [2, 0, 2, 0],
                    width: 160,
                    height: 35,
                    style: {
                        overflow: 'visible'
                    },
                    skipClone: true
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
//                    categories:  ['', 'Indice recente', 'Indice Final'],
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    startOnTick: false,
                    endOnTick: false,
                    tickPositions: []
                },
                yAxis: {
                    endOnTick: false,
                    startOnTick: false,
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    tickPositions: [0]
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    backgroundColor: null,
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    hideDelay: 0,
                    shared: true,
                    padding: 0,
                    positioner: function (w, h, point) {
                        return { x: point.plotX - w / 2, y: point.plotY - h};
                    }
                },
                plotOptions: {
                    series: {
                        animation: false,
                        lineWidth: 1,
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        marker: {
                            radius: 1,
                            states: {
                                hover: {
                                    radius: 2
                                }
                            }
                        },
                        fillOpacity: 0.25
                    },
                    column: {
                        negativeColor: '#910000',
                        borderColor: 'silver'
                    }
                }
            };
            options = Highcharts.merge(defaultOptions, options);

            return new Highcharts.Chart(options, callback);
        };

        var start = +new Date(),
            $tds = $("td[data-sparkline]"),
            fullLen = $tds.length,
            n = 0;

        function doChunk() {
            var time = +new Date(),
                i,
                len = $tds.length;

            for (i = 0; i < len; i++) {
                var $td = $($tds[i]),
                    stringdata = $td.data('sparkline'),
                    arr = stringdata.split('; '),
                    data = $.map(arr[0].split(', '), parseFloat),
                    chart = {};

                if (arr[1]) {
                    chart.type = arr[1];
                }
//            $td.parent().find('th').html(

                $td.highcharts('SparkLine', {
                    series: [
                        {
                            data: data,
                            pointStart: 1
                        }
                    ],
                    tooltip: {
                        headerFormat: '<span style="font-size: 10px"></span><br/>',
                        pointFormat: 'R$ <b>{point.y}.000</b>'
                    },
                    chart: chart
                });

                n++;

                // If the process takes too much time, run a timeout to allow interaction with the browser
                if (new Date() - time > 500) {
                    $tds.splice(0, i + 1);
                    setTimeout(doChunk, 0);
                    break;
                }

                // Print a feedback on the performance
                if (n === fullLen) {
//                $('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
                }
            }
        }

        doChunk();


    });

}

$(document).ready(do_on_load)
$(window).bind('page:load', do_on_load)

