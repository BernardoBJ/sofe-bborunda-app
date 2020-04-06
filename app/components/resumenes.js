import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';

export default class ResumenesComponent extends Component {
    @tracked quantityI = "";
    @tracked quantityD = "";
    @tracked quantityR = "";
    @tracked quantityC = "";

    @tracked subtitleI = "";
    @tracked subtitleD = "";
    @tracked subtitleR = "";
    @tracked subtitleC = "";

    @tracked trendingI = "";
    @tracked trendingD = "";
    @tracked trendingR = "";
    @tracked trendingC = "";

    didInsertElement() {
        if (this.nombrePais != undefined) {
            axios.get('http://api.coronastatistics.live/countries/' + this.nombrePais)
                .then((response) => {
                    this.quantityI = response.data.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.quantityD = response.data.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.quantityR = response.data.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.quantityC = response.data.critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.subtitleI = response.data.todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Hoy';
                    this.subtitleD = response.data.todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Hoy';
                    this.subtitleR = response.data.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Restantes';
                    this.subtitleC = response.data.casesPerOneMillion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Por Millon';
                }, (error) => {
                    console.log(error);
                });
        } else {
            // Cargar informacion general
            axios.get('http://api.coronastatistics.live/all')
                .then((response) => {
                    this.quantityI = response.data.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.quantityD = response.data.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.quantityR = response.data.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }, (error) => {
                    console.log(error);
                });

            // Cargar informacion por pais
            axios.get('http://api.coronastatistics.live/countries')
                .then((response) => {
                    var critical = 0;
                    var todayI = 0;
                    var todayD = 0;
                    var todayR = 0;
                    var todayC = 0;
                    response.data.forEach((item) => {
                        critical += parseInt(item.critical);
                        todayI += parseInt(item.todayCases);
                        todayD += parseInt(item.todayDeaths);
                        todayR += parseInt(item.active);
                        todayC += parseInt(item.casesPerOneMillion);
                    });
                    this.quantityC = critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.subtitleI = todayI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Hoy';
                    this.subtitleD = todayD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Hoy';
                    this.subtitleR = todayR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Restantes';
                    this.subtitleC = todayC.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Por Millon';
                }, (error) => {
                    console.log(error);
                });
        }
    }
}
