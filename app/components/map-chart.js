import Component from '@ember/component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';

am4core.useTheme(am4themes_animated);

export default class MapChartComponent extends Component {
    didInsertElement() {
        // Crear instancia
        var chart = am4core.create("mapchart", am4maps.MapChart);

        axios.get('http://api.coronastatistics.live/countries')
            .then((response) => {
                response.data.forEach((item) => {
                    item.country = this.GetName(item.country);
                    var id = am4geodata_worldLow.features.find(c => c.properties.name == item.country);
                    if (id != undefined) {
                        item.id = id.properties.id;
                    } else {
                        console.log('Not found: ' + item.country);
                    }
                    item.color = chart.colors.getIndex(0);
                });

                // Asignar definicion de mapa
                chart.geodata = am4geodata_worldLow;

                // Asignar proyeccion
                chart.projection = new am4maps.projections.Miller();

                // Crear poligonos de mapa
                var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
                polygonSeries.exclude = ["AQ"];
                polygonSeries.useGeodata = true;
                polygonSeries.nonScalingStroke = true;
                polygonSeries.strokeWidth = 0.5;
                polygonSeries.calculateVisualCenter = true;

                var imageSeries = chart.series.push(new am4maps.MapImageSeries());
                imageSeries.data = response.data;
                imageSeries.dataFields.value = "cases";

                var imageTemplate = imageSeries.mapImages.template;
                imageTemplate.nonScaling = true

                var circle = imageTemplate.createChild(am4core.Circle);
                circle.fillOpacity = 0.7;
                circle.propertyFields.fill = "color";
                circle.tooltipText = "{country}: [bold]{value}[/]";

                imageSeries.heatRules.push({
                    "target": circle,
                    "property": "radius",
                    "min": 4,
                    "max": 30,
                    "dataField": "value"
                });

                imageTemplate.adapter.add("latitude", function (latitude, target) {
                    var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
                    if (polygon) {
                        return polygon.visualLatitude;
                    }
                    return latitude;
                });

                imageTemplate.adapter.add("longitude", function (longitude, target) {
                    var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
                    if (polygon) {
                        return polygon.visualLongitude;
                    }
                    return longitude;
                });
            }, (error) => {
                console.log(error);
            });
    }

    GetName(name) {
        if (name == 'Saint Pierre Miquelon') { name = 'Saint Pierre and Miquelon' }
        else if (name == 'Caribbean Netherlands') { name = 'Netherlands' }
        else if (name == 'Turks and Caicos') { name = 'Turks and Caicos Islands' }
        else if (name == 'St. Barth') { name = 'Saint Barthelemy' }
        else if (name == 'St. Vincent Grenadines') { name = 'Saint Vincent and the Grenadines' }
        else if (name == 'Cabo Verde') { name = 'Cape Verde' }
        else if (name == 'Eswatini') { name = 'eSwatini' }
        else if (name == 'Macao') { name = 'Macau' }
        else if (name == 'Congo') { name = 'Republic of Congo' }
        else if (name == 'DRC') { name = 'Democratic Republic of Congo' }
        else if (name == 'Faeroe Islands') { name = 'Faroe Islands' }
        else if (name == 'Palestine') { name = 'Palestinian Territories' }
        else if (name == 'Ivory Coast') { name = 'Côte d\'Ivoire' }
        else if (name == 'Réunion') { name = 'Reunion' }
        else if (name == 'S. Korea') { name = 'South Korea' }
        else if (name == 'UK') { name = 'United Kingdom' }
        else if (name == 'USA') { name = 'United States' }
        return name;
    }
}

