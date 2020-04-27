

/**
 * 
 * Mastermind utilizando Jquery
 * 
 * @author Javier Lopera Jiménez
 * 
*/

$(function () {

    let $copia;

    let $bolaVacia;

    let colores = ["rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(128, 128, 128)",
        "rgb(255, 192, 203)", "rgb(238, 130, 238)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)"];

    let escuchadores = ["#red", "#blue", "#grey", "#pink", "#violet", "#black", "#white", "#yellow",];

    let $check = $("#comprobar");
    let $modal = $("#modal");

    let elegirColor = (colorFondo) => {

        $bolaVacia = $("[background-color='rgb(192, 192, 192)']").first();

        if ($bolaVacia.length !== 0) {
            $bolaVacia.fadeOut(100,function(){
                $bolaVacia.fadeIn(100, function () {
                    $bolaVacia.css("background-color", colorFondo);
                    $bolaVacia.attr('background-color', colorFondo);
                })
            })
        }

    }

    let borrarColor = (bola) => {

        bola.css("background-color", "rgb(192, 192, 192)");
        bola.attr('background-color', "rgb(192, 192, 192)");

    }

    let comprobar = () => {

        let combinacionGanadora = [];

        let arrayNegrosYBlancos = [];

        let $ultimaLinea = $("#ultimaLinea");
        let $coloresUltimaLinea = $("#ultimaLinea .colorElegido");

        let $comprobadosUltimaLinea = $("#ultimaLinea .colorComprobado");

        $bolaVacia = $("[background-color='rgb(192, 192, 192)']").first();


        if ($bolaVacia.length === 0) {


            $coloresUltimaLinea.each(function () {
                combinacionGanadora.push(colores.indexOf($(this).css("background-color")));
            })

            arrayNegrosYBlancos = mastermind.compararCoincidencia(combinacionGanadora);

            $("#ultimaLinea .colorComprobado").each(function (i){
                if (arrayNegrosYBlancos[i] == 1) {
                    $(this).css("background-color", "rgb(0,0,0)");
                }
                else if (arrayNegrosYBlancos[i] == 0) {
                    $(this).css("background-color", "rgb(255,255,255)");
                }
                else {
                    $(this).css("background-color", "rgb(192, 192, 192)");
                }
            })
            
            if (JSON.stringify(arrayNegrosYBlancos) == JSON.stringify([1, 1, 1, 1])) {

                $modal.css("visibility", "visible");
                $("#ultimaLinea .colorElegido").off("click");
                $check.off("click");

                $("#colores div").off("click");
            }

            // Primero inicializo copia, que tendra el clon del div de ultima linea
            // Después, al clonarlo, elimino el id ultimaLinea del primero, para que no se repita
            // Por ultimo limpio la ultima linea para que todos salgan en gris

            $copia = $ultimaLinea.clone();

            $ultimaLinea.before($copia);

            $("#juego #ultimaLinea").first().removeAttr("id");

            $coloresUltimaLinea.attr('background-color', "rgb(192, 192, 192)").css('background-color', "rgb(192, 192, 192)");
            
            $("#ultimaLinea .colorComprobado").css('background-color', "rgb(192, 192, 192)");
            
        }
    }

    console.log("Dejo el mastermind.init en consola para que puedas hacer mejor las pruebas: ");
    mastermind.init();

    console.log(mastermind.mostrar());

    /**
     * Este each es el encargado de elegir los colores pulsados y añadirles el escuchador
    */

    $.each(colores, function (i) {
        $(escuchadores[i]).click(function () {
            $(escuchadores[i]).fadeOut(100, function () {
                $(this).fadeIn(100, function () {
                    elegirColor(colores[i]);
                })
            })
        })
    })

    //Borra el color clicado

    $("#ultimaLinea .colorElegido").click(function () {
        $(this).fadeOut(100,function(){
            $(this).fadeIn(100, function () {
                borrarColor($(this));
            })
        })
    });

    $check.click(function () {
        $(this).fadeOut(100,function(){
            $(this).fadeIn(100, function () {
                comprobar();
            })
        })
    });

    $("#salir").click(function () { window.close() });
    $("#seguirJugando").click(function () {
        $modal.css("visibility", "hidden");
        location.reload();
    });

})