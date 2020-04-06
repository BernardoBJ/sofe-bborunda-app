import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

export default class ListaPaisesComponent extends Component {
    @tracked paises = [];

    didInsertElement() {
        // Cargar informacion general
        axios.get('http://api.coronastatistics.live/countries')
            .then((response) => {
                response.data.forEach((item) => {
                    var id = am4geodata_worldLow.features.find(c => c.properties.name == this.GetName(item.country));
                    if (id != undefined) {
                        item.id = id.properties.id.toLowerCase();
                    } else {
                        console.log('Not found: ' + item.country);
                    }
                });
                this.paises = response.data;
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
