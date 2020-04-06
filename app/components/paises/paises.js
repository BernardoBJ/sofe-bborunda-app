import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PaisesComponent extends Component {
    @tracked query = '';
    @tracked sort = '';

    @action changeOrder(val) {
        this.sort = val;
    }
}