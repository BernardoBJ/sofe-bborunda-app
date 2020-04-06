import Component from '@ember/component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';

am4core.useTheme(am4themes_animated);

export default class SolidGaugeComponent extends Component {
    didInsertElement() {
        // Crear instancia
        var chart = am4core.create("solidgauge", am4charts.RadarChart);
        chart.colors.list = [
            am4core.color("yellow"),
            am4core.color("blue"),
            am4core.color("green"),
            am4core.color("red")
        ];

        if (this.nombrePais != undefined) {
            axios.get('http://api.coronastatistics.live/countries/' + this.nombrePais)
                .then((response) => {
                    var d = response.data;

                    var actives = Math.round((d.active / d.cases) * 100);
                    var deathRate = Math.round((d.deaths / (d.deaths + d.recovered)) * 100);
                    var recoveryRate = Math.round((d.recovered / (d.deaths + d.recovered)) * 100);
                    var criticalRate = Math.round(d.critical / (d.cases - d.deaths - d.recovered) * 100);

                    // Agregar informacion
                    chart.data = [
                        {
                            "category": "Criticos",
                            "value": criticalRate,
                            "full": 100
                        }, {
                            "category": "Activos",
                            "value": actives,
                            "full": 100
                        }, {
                            "category": "Recuperados",
                            "value": recoveryRate,
                            "full": 100
                        }, {
                            "category": "Muertos",
                            "value": deathRate,
                            "full": 100
                        }];

                    // Hacer que el grafico no sea un circulo completo
                    chart.startAngle = -90;
                    chart.endAngle = 180;
                    chart.innerRadius = am4core.percent(20);

                    // Asignar formato de numero
                    chart.numberFormatter.numberFormat = "#.#'%'";

                    // Crear ejes
                    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "category";
                    categoryAxis.renderer.grid.template.location = 0;
                    categoryAxis.renderer.grid.template.strokeOpacity = 0;
                    categoryAxis.renderer.labels.template.horizontalCenter = "right";
                    categoryAxis.renderer.labels.template.fontWeight = 500;
                    categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
                        return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
                    });
                    categoryAxis.renderer.minGridDistance = 10;

                    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
                    valueAxis.renderer.grid.template.strokeOpacity = 0;
                    valueAxis.min = 0;
                    valueAxis.max = 100;
                    valueAxis.strictMinMax = true;

                    // Crear series
                    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
                    series1.dataFields.valueX = "full";
                    series1.dataFields.categoryY = "category";
                    series1.clustered = false;
                    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
                    series1.columns.template.fillOpacity = 0.08;
                    series1.columns.template.cornerRadiusTopLeft = 20;
                    series1.columns.template.strokeWidth = 0;
                    series1.columns.template.radarColumn.cornerRadius = 20;

                    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
                    series2.dataFields.valueX = "value";
                    series2.dataFields.categoryY = "category";
                    series2.clustered = false;
                    series2.columns.template.strokeWidth = 0;
                    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
                    series2.columns.template.radarColumn.cornerRadius = 20;

                    series2.columns.template.adapter.add("fill", function (fill, target) {
                        return chart.colors.getIndex(target.dataItem.index);
                    });

                    chart.cursor = new am4charts.RadarCursor();
                }, (error) => {
                    console.log(error);
                });
        } else {
            axios.get('http://api.coronastatistics.live/all')
                .then((response) => {
                    var d = response.data;

                    var actives = Math.round(((d.cases - d.deaths) / d.cases) * 100);
                    var deathRate = Math.round((d.deaths / (d.deaths + d.recovered)) * 100);
                    var recoveryRate = Math.round((d.recovered / (d.deaths + d.recovered)) * 100);

                    // Cargar informacion por pais
                    axios.get('http://api.coronastatistics.live/countries')
                        .then((response) => {
                            this.affectedCountries = response.data.length;
                            var critical = 0;
                            response.data.forEach((item) => {
                                critical += parseInt(item.critical);
                            });
                            var criticalRate = Math.round(critical / (d.cases - d.deaths - d.recovered) * 100);

                            // Agregar informacion
                            chart.data = [
                                {
                                    "category": "Criticos",
                                    "value": criticalRate,
                                    "full": 100
                                }, {
                                    "category": "Activos",
                                    "value": actives,
                                    "full": 100
                                }, {
                                    "category": "Recuperados",
                                    "value": recoveryRate,
                                    "full": 100
                                }, {
                                    "category": "Muertos",
                                    "value": deathRate,
                                    "full": 100
                                }];

                            // Hacer que el grafico no sea un circulo completo
                            chart.startAngle = -90;
                            chart.endAngle = 180;
                            chart.innerRadius = am4core.percent(20);

                            // Asignar formato de numero
                            chart.numberFormatter.numberFormat = "#.#'%'";

                            // Crear ejes
                            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                            categoryAxis.dataFields.category = "category";
                            categoryAxis.renderer.grid.template.location = 0;
                            categoryAxis.renderer.grid.template.strokeOpacity = 0;
                            categoryAxis.renderer.labels.template.horizontalCenter = "right";
                            categoryAxis.renderer.labels.template.fontWeight = 500;
                            categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
                                return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
                            });
                            categoryAxis.renderer.minGridDistance = 10;

                            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
                            valueAxis.renderer.grid.template.strokeOpacity = 0;
                            valueAxis.min = 0;
                            valueAxis.max = 100;
                            valueAxis.strictMinMax = true;

                            // Crear series
                            var series1 = chart.series.push(new am4charts.RadarColumnSeries());
                            series1.dataFields.valueX = "full";
                            series1.dataFields.categoryY = "category";
                            series1.clustered = false;
                            series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
                            series1.columns.template.fillOpacity = 0.08;
                            series1.columns.template.cornerRadiusTopLeft = 20;
                            series1.columns.template.strokeWidth = 0;
                            series1.columns.template.radarColumn.cornerRadius = 20;

                            var series2 = chart.series.push(new am4charts.RadarColumnSeries());
                            series2.dataFields.valueX = "value";
                            series2.dataFields.categoryY = "category";
                            series2.clustered = false;
                            series2.columns.template.strokeWidth = 0;
                            series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
                            series2.columns.template.radarColumn.cornerRadius = 20;

                            series2.columns.template.adapter.add("fill", function (fill, target) {
                                return chart.colors.getIndex(target.dataItem.index);
                            });

                            chart.cursor = new am4charts.RadarCursor();
                        }, (error) => {
                            console.log(error);
                        });
                }, (error) => {
                    console.log(error);
                });
        }
    }
}

