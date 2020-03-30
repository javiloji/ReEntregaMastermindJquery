

let mastermind = (function () {

    let colores = ["red", "blue", "grey", "pink", "violet", "black", "white", "yellow"];

    let combinacionObjetivo = [];

    let init = function () {
        let generarAleatorio = function () {
            return parseInt(Math.random() * colores.length);
        }
        combinacionObjetivo = [generarAleatorio(), generarAleatorio(), generarAleatorio(), generarAleatorio()];
        combinacionObjetivoColores = [colores[combinacionObjetivo[0]], colores[combinacionObjetivo[1]], colores[combinacionObjetivo[2]], colores[combinacionObjetivo[3]]];

    }

    let mostrar = function () {
        return combinacionObjetivoColores;
    }

    let compararCoincidencia = function (intento) {

        let combinacionNegrosYBlancas = [];
        let restantesObjetivo = [];
        let restantesIntento = [];
        // console.log(combinacionObjetivo);

        for (let i = 0; i <= combinacionObjetivo.length - 1; i++) {

            if (intento[i] === combinacionObjetivo[i]) {
                combinacionNegrosYBlancas.unshift(1);

            }
            else {
                restantesIntento.unshift(intento[i]);
                restantesObjetivo.unshift(combinacionObjetivo[i]);
            }
        }

        for (let i = 0; i <= restantesIntento.length - 1; i++) {

            if (restantesObjetivo.indexOf(restantesIntento[i]) != -1) {
                combinacionNegrosYBlancas.unshift(0);
                restantesObjetivo[restantesObjetivo.indexOf(restantesIntento[i])] = undefined;
            }
            else {
                combinacionNegrosYBlancas.unshift(-1);
            }
        }

        return combinacionNegrosYBlancas.sort().reverse();

    }

    return {
        init: init,
        mostrar: mostrar,
        compararCoincidencia: compararCoincidencia
    }

})();
