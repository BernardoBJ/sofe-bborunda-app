import Component from '@ember/component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';

am4core.useTheme(am4themes_animated);

export default class PieChartComponent extends Component {
    didInsertElement() {
        // Crear instancia
        var chart = am4core.create("piechart", am4charts.PieChart);

        if (this.nombrePais != undefined) {
            axios.get('http://api.coronastatistics.live/countries/' + this.nombrePais)
                .then((response) => {
                    var data = [];
                    data.push({
                        concept: "Muertos",
                        quantity: response.data.deaths
                    });
                    data.push({
                        concept: "Recuperados",
                        quantity: response.data.recovered
                    });
                    data.push({
                        concept: "Activos",
                        quantity: response.data.critical
                    });
                    chart.data = data;

                    // Agregar y configurar series
                    var pieSeries = chart.series.push(new am4charts.PieSeries());
                    pieSeries.dataFields.value = "quantity";
                    pieSeries.dataFields.category = "concept";
                    pieSeries.slices.template.stroke = am4core.color("#fff");
                    pieSeries.slices.template.strokeWidth = 2;
                    pieSeries.slices.template.strokeOpacity = 1;
                    pieSeries.labels.template.disabled = true;
                    pieSeries.ticks.template.disabled = true;

                    // Animacion inicial
                    pieSeries.hiddenState.properties.opacity = 1;
                    pieSeries.hiddenState.properties.endAngle = -90;
                    pieSeries.hiddenState.properties.startAngle = -90;
                }, (error) => {
                    console.log(error);
                });
        } else {
            axios.get('http://api.coronastatistics.live/countries')
                .then((response) => {
                    var sorted = response.data.sort((a, b) => parseInt(b.cases) - parseInt(a.cases));

                    var data = [];
                    var cnt = 0, other = 0;
                    var obj = { country: "Otros", cases: 0 };
                    sorted.forEach((item) => {
                        if (cnt++ < 10) {
                            data.push(item);
                        } else {
                            other += parseInt(item.cases);
                        }
                    });
                    obj.cases = other;
                    data.push(obj);

                    // Agregar informacion
                    chart.data = data;

                    // Agregar y configurar series
                    var pieSeries = chart.series.push(new am4charts.PieSeries());
                    pieSeries.dataFields.value = "cases";
                    pieSeries.dataFields.category = "country";
                    pieSeries.slices.template.stroke = am4core.color("#fff");
                    pieSeries.slices.template.strokeWidth = 2;
                    pieSeries.slices.template.strokeOpacity = 1;
                    pieSeries.labels.template.disabled = true;
                    pieSeries.ticks.template.disabled = true;

                    // Animacion inicial
                    pieSeries.hiddenState.properties.opacity = 1;
                    pieSeries.hiddenState.properties.endAngle = -90;
                    pieSeries.hiddenState.properties.startAngle = -90;
                }, (error) => {
                    console.log(error);
                });
        }
    }
}

