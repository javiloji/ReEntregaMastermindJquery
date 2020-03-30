

/**
 * 
 * Mastermind utilizando Jquery
 * 
 * @author Javier Lopera Jiménez
 * 
*/

$(function () {

    let copia;

    let coloresElegidos = document.getElementsByClassName("colorElegido");

    let colores = ["rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(128, 128, 128)",
        "rgb(255, 192, 203)", "rgb(238, 130, 238)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)"];

    let escuchadores = ["#red", "#blue", "#grey", "#pink", "#violet", "#black", "#white", "#yellow",];

    // let arrayBorrar = ["#red", "#blue", "#grey", "#pink", "#violet", "#black", "#white", "#yellow",];


    let $check = $("#comprobar");
    let $modal = $("#modal");

    let elegirColor = (colorFondo) => {

        for (let i = 0; i < coloresElegidos.length; i++) {

            if (window.getComputedStyle(coloresElegidos[i]).backgroundColor === "rgb(192, 192, 192)") {
                coloresElegidos[i].style.backgroundColor = colorFondo;
                break;
            }
        }
    }

    let borrarColor = (color) => {
        color.style.backgroundColor = "rgb(192, 192, 192)";
    }

    let arrayNegrosYBlancos;
    let comprobar = () => {
        if (window.getComputedStyle(coloresElegidos[0]).backgroundColor != "rgb(192, 192, 192)"
            && window.getComputedStyle(coloresElegidos[1]).backgroundColor != "rgb(192, 192, 192)"
            && window.getComputedStyle(coloresElegidos[2]).backgroundColor != "rgb(192, 192, 192)"
            && window.getComputedStyle(coloresElegidos[3]).backgroundColor != "rgb(192, 192, 192)"
        ) {

            arrayNegrosYBlancos = mastermind.compararCoincidencia([
                colores.indexOf(window.getComputedStyle(coloresElegidos[0]).backgroundColor),
                colores.indexOf(window.getComputedStyle(coloresElegidos[1]).backgroundColor),
                colores.indexOf(window.getComputedStyle(coloresElegidos[2]).backgroundColor),
                colores.indexOf(window.getComputedStyle(coloresElegidos[3]).backgroundColor)
            ]
            );

            for (let i = 0; i < arrayNegrosYBlancos.length; i++) {

                if (arrayNegrosYBlancos[i] == 1) {
                    $(".colorComprobado")[i].style.backgroundColor = "rgb(0,0,0)";
                }
                else if (arrayNegrosYBlancos[i] == 0) {
                    $(".colorComprobado")[i].style.backgroundColor = "rgb(255,255,255)";
                }
                else {
                    $(".colorComprobado")[i].style.backgroundColor = "rgb(192, 192, 192)";
                }

            }
            if (JSON.stringify(arrayNegrosYBlancos) == JSON.stringify([1, 1, 1, 1])) {
                $modal.css("visibility", "visible");
            }

            document.getElementById("juego").insertBefore(copia, document.getElementById("cajaPrincipal"));
            copia = document.getElementById("cajaPrincipal").cloneNode(true);

            for (let i = 0; i < 4; i++) {

                document.getElementById("cajaPrincipal").getElementsByTagName("div")[0].getElementsByClassName("colorElegido")[i].addEventListener("click", function () {
                    borrarColor(document.getElementsByClassName("coloresElegidos")[0].childNodes[i * 2 + 1]); // El metodo childNodes devuelve el div en este orden: 1,3,5,7
                })
            }
        }
    }
    console.log("Dejo el mastermind.init en consola para que puedas hacer mejor las pruebas: ");
    mastermind.init();

    copia = document.getElementById("cajaPrincipal").cloneNode(true);

    console.log(mastermind.mostrar());

    /**
     * Este for es el encargado de elegir los colores pulsados y añadirles el escuchador
    */



    for (let i = 0; i < colores.length; i++) {

        $(escuchadores[i]).click(function () {
            $(escuchadores[i]).fadeOut(100, function () {
                $(this).fadeIn(100, function () {
                    elegirColor(colores[i]);
                })
            })
        })
    }

    for (let i = 0; i < 4; i++) {

        document.getElementById("cajaPrincipal").getElementsByTagName("div")[0].getElementsByClassName("colorElegido")[i].addEventListener("click", function () {
            borrarColor(document.getElementsByClassName("coloresElegidos")[0].childNodes[i * 2 + 1]); // El metodo childNodes devuelve el div en este orden: 1,3,5,7
        })
    }

    $check.click(comprobar);

    $("#salir").click(function () { location.reload() });
    $("#seguirJugando").click(function () { $modal.css("visibility", "hidden") });

})