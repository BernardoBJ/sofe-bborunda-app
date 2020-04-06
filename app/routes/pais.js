import Route from '@ember/routing/route';

export default class PaisRoute extends Route {
    async model(params) {
        let nombrePais = `${params.nombre}`;
        return { nombrePais };
    }
}