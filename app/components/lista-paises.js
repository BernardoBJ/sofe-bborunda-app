import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';

export default class ListaPaisesComponent extends Component {
    @tracked paises = [];

    didInsertElement() {
        // Cargar informacion general
        axios.get('http://api.coronastatistics.live/countries')
            .then((response) => {
                this.paises = response.data;
            }, (error) => {
                console.log(error);
            });

    }
}
