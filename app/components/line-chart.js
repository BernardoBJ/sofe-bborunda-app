import Component from '@ember/component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';

am4core.useTheme(am4themes_animated);

export default class LineChartComponent extends Component {
    didInsertElement() {
        // Crear instancia
        var chart = am4core.create("linechart", am4charts.XYChart);

        if (this.nombrePais != undefined) {
            axios.get('http://api.coronastatistics.live/timeline/' + this.GetName(this.nombrePais))
                .then((response) => {
                    chart.data = response.data.data.timeline;

                    // Crear ejes
                    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                    dateAxis.renderer.minGridDistance = 50;

                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                    // Crear series
                    var series1 = chart.series.push(new am4charts.LineSeries());
                    series1.dataFields.valueY = "cases";
                    series1.dataFields.dateX = "date";
                    series1.strokeWidth = 2;
                    series1.minBulletDistance = 10;
                    series1.tooltipText = "{valueY} Infectados";
                    series1.tooltip.pointerOrientation = "vertical";
                    series1.tooltip.background.cornerRadius = 20;
                    series1.tooltip.background.fillOpacity = 0.5;
                    series1.tooltip.label.padding(12, 12, 12, 12);
                    series1.stroke = am4core.color("blue");

                    var series2 = chart.series.push(new am4charts.LineSeries());
                    series2.dataFields.valueY = "deaths";
                    series2.dataFields.dateX = "date";
                    series2.strokeWidth = 2;
                    series2.minBulletDistance = 10;
                    series2.tooltipText = "{valueY} Muertos";
                    series2.tooltip.pointerOrientation = "vertical";
                    series2.tooltip.background.cornerRadius = 20;
                    series2.tooltip.background.fillOpacity = 0.5;
                    series2.tooltip.label.padding(12, 12, 12, 12);
                    series2.stroke = am4core.color("red");

                    var series3 = chart.series.push(new am4charts.LineSeries());
                    series3.dataFields.valueY = "recovered";
                    series3.dataFields.dateX = "date";
                    series3.strokeWidth = 2;
                    series3.minBulletDistance = 10;
                    series3.tooltipText = "{valueY} Recuperados";
                    series3.tooltip.pointerOrientation = "vertical";
                    series3.tooltip.background.cornerRadius = 20;
                    series3.tooltip.background.fillOpacity = 0.5;
                    series3.tooltip.label.padding(12, 12, 12, 12);
                    series3.stroke = am4core.color("green");

                    // Add scrollbar
                    chart.scrollbarX = new am4charts.XYChartScrollbar();
                    chart.scrollbarX.series.push(series1);
                    chart.scrollbarX.series.push(series2);
                    chart.scrollbarX.series.push(series3);

                    // Add cursor
                    chart.cursor = new am4charts.XYCursor();
                    chart.cursor.xAxis = dateAxis;
                    // chart.cursor.snapToSeries = series1;
                }, (error) => {
                    console.log(error);
                });
        } else {
            axios.get('http://api.coronastatistics.live/timeline/global')
                .then((response) => {
                    var data = [];
                    Object.keys(response.data).forEach(function (k) {
                        data.push({
                            date: k,
                            cases: response.data[k].cases,
                            deaths: response.data[k].deaths,
                            recovered: response.data[k].recovered
                        });
                    });

                    chart.data = data;

                    // Crear ejes
                    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                    dateAxis.renderer.minGridDistance = 50;

                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                    // Crear series
                    var series1 = chart.series.push(new am4charts.LineSeries());
                    series1.dataFields.valueY = "cases";
                    series1.dataFields.dateX = "date";
                    series1.strokeWidth = 2;
                    series1.minBulletDistance = 10;
                    series1.tooltipText = "{valueY} Infectados";
                    series1.tooltip.pointerOrientation = "vertical";
                    series1.tooltip.background.cornerRadius = 20;
                    series1.tooltip.background.fillOpacity = 0.5;
                    series1.tooltip.label.padding(12, 12, 12, 12);
                    series1.stroke = am4core.color("blue");

                    var series2 = chart.series.push(new am4charts.LineSeries());
                    series2.dataFields.valueY = "deaths";
                    series2.dataFields.dateX = "date";
                    series2.strokeWidth = 2;
                    series2.minBulletDistance = 10;
                    series2.tooltipText = "{valueY} Muertos";
                    series2.tooltip.pointerOrientation = "vertical";
                    series2.tooltip.background.cornerRadius = 20;
                    series2.tooltip.background.fillOpacity = 0.5;
                    series2.tooltip.label.padding(12, 12, 12, 12);
                    series2.stroke = am4core.color("red");

                    var series3 = chart.series.push(new am4charts.LineSeries());
                    series3.dataFields.valueY = "recovered";
                    series3.dataFields.dateX = "date";
                    series3.strokeWidth = 2;
                    series3.minBulletDistance = 10;
                    series3.tooltipText = "{valueY} Recuperados";
                    series3.tooltip.pointerOrientation = "vertical";
                    series3.tooltip.background.cornerRadius = 20;
                    series3.tooltip.background.fillOpacity = 0.5;
                    series3.tooltip.label.padding(12, 12, 12, 12);
                    series3.stroke = am4core.color("green");

                    // Add scrollbar
                    chart.scrollbarX = new am4charts.XYChartScrollbar();
                    chart.scrollbarX.series.push(series1);
                    chart.scrollbarX.series.push(series2);
                    chart.scrollbarX.series.push(series3);

                    // Add cursor
                    chart.cursor = new am4charts.XYCursor();
                    chart.cursor.xAxis = dateAxis;
                    // chart.cursor.snapToSeries = series1;
                }, (error) => {
                    console.log(error);
                });
        }
    }

    GetName(name) {
        if (name == 'USA') { name = 'us' }
        return name;
    }
}

