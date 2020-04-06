# sofe-bborunda-app

Se espera que los participantes realicen una Aplicación Web (Ember) como se muestra en la siguiente pagina https://coronastatistics.live/
* Utilizar el API de Corona Statistics Live y hacer uso de los Endpoints especificados.

    o http://api.coronastatistics.live/all

    o http://api.coronastatistics.live/countries
    
    o Ordenar Paises por
         Infectados en total
         Infectados del dia de hoy
         Muertes en total
         Muertes del dia de hoy
         Recuperados
         Activos (Infectados Vivos)
         Críticos
    o http://api.coronastatistics.live/countries/{country_name}
    o http://api.coronastatistics.live/timeline
    o http://api.coronastatistics.live/timeline/global
    o http://api.coronastatistics.live/timeline/{country_name}
* GitHub (sofe-cmarin-app, primer letra de su nombre y el apellido) para poder revisar el código.
* Realizar una documentación básica en el README de su proyecto, se pueden apoyar de la siguiente pagina
https://www.makeareadme.com/.
* La aplicación debe de contener la siguiente información:
    o Datos globales
    o Mapa con los datos
    o Lista de Países
    o Gráfica diaria global de infectados, muertos y recuperados
    o Datos desglosados por país

## Requisitos previos

Necesitara tener los siguientes elementos instalados en su computadora.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Instalación

* `git clone <repository-url>` este repositorio
* `cd sofe-bborunda-app`
* `npm install`

## Ejecusion / Desarrollo

* `ember serve`
* Visite su app en [http://localhost:4200](http://localhost:4200).
* Visite su tests en [http://localhost:4200/tests](http://localhost:4200/tests).

### Generador de codigo

Utilice los numerosos generadores de código, intente `ember help generate` para obtener más detalles.

### Ejecucion de pruebas

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Compilacion

* `ember build` (development)
* `ember build --environment production` (production)

### Implementación

Depende del servidor y caracteristicas de su infraestructura

## Lecturas adicionales / Enlaces útiles

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Extensiones de navegador de desarrollo
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
