import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';

export default class ResumenesComponent extends Component {
    @tracked deathRate = "";
    @tracked recoveryRate = "";
    @tracked criticalRate = "";
    @tracked affectedCountries = "";

    didInsertElement() {
        if (this.nombrePais != undefined) {
            // Cargar informacion general
            axios.get('http://api.coronastatistics.live/countries/' + this.nombrePais)
                .then((response) => {
                    var d = response.data;

                    this.deathRate = Math.round((d.deaths / (d.deaths + d.recovered)) * 10000) / 100 + '%';
                    this.recoveryRate = Math.round((d.recovered / (d.deaths + d.recovered)) * 10000) / 100 + '%';
                    this.criticalRate = Math.round((d.critical / (d.cases - d.deaths - d.recovered)) * 10000) / 100 + '%';
                    this.affectedCountries = 1;
                }, (error) => {
                    console.log(error);
                });
        } else {
            // Cargar informacion general
            axios.get('http://api.coronastatistics.live/all')
                .then((response) => {
                    var d = response.data;

                    this.deathRate = Math.round((d.deaths / (d.deaths + d.recovered)) * 10000) / 100 + '%';
                    this.recoveryRate = Math.round((d.recovered / (d.deaths + d.recovered)) * 10000) / 100 + '%';

                    // Cargar informacion por pais
                    axios.get('http://api.coronastatistics.live/countries')
                        .then((response) => {
                            this.affectedCountries = response.data.length;
                            var critical = 0;
                            response.data.forEach((item) => {
                                critical += parseInt(item.critical);
                            });
                            this.criticalRate = Math.round((critical / (d.cases - d.deaths - d.recovered)) * 10000) / 100 + '%';
                        }, (error) => {
                            console.log(error);
                        });
                }, (error) => {
                    console.log(error);
                });
        }
    }
}
