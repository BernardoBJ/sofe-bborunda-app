import Component from '@glimmer/component';

export default class PaisesFilterComponent extends Component {
    get results() {
        let { paises, query, sort } = this.args;

        if (sort == 'todayCases') {
            paises = paises.sort((a, b) => parseInt(b.todayCases) - parseInt(a.todayCases));
        } else if (sort == 'cases') {
            paises = paises.sort((a, b) => parseInt(b.cases) - parseInt(a.cases));
        } else if (sort == 'deaths') {
            paises = paises.sort((a, b) => parseInt(b.deaths) - parseInt(a.deaths));
        } else if (sort == 'todayDeaths') {
            paises = paises.sort((a, b) => parseInt(b.todayDeaths) - parseInt(a.todayDeaths));
        } else if (sort == 'recovered') {
            paises = paises.sort((a, b) => parseInt(b.recovered) - parseInt(a.recovered));
        } else if (sort == 'alive') {
            paises = paises.sort((a, b) => (parseInt(b.cases) - parseInt(b.deaths)) - (parseInt(a.cases) - parseInt(a.deaths)));
        } else if (sort == 'critial') {
            paises = paises.sort((a, b) => parseInt(b.critical) - parseInt(a.critical));
        }

        if (query) {
            paises = paises.filter(pais => pais.country.toLowerCase().includes(query.toLowerCase()));
        }

        return paises;
    }
}