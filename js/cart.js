var articles = {};

$(document).ready(inicio);

function inicio() {

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articles = resultObj.data;

        }
        showCart(articles);
    })

    $('#shippingForm input').on('change', metodoDeEnvioFavorito);
}


function showCart(obj) {

    let list = obj.articles;
    let htmlContentToAppend = "";

    let count = 0;
    let unitCost = 0;
    total = 0;

    for (let i = 0; i < list.length; i++) {

        count = list[i].count;
        unitCost = list[i].unitCost;
        total = count * unitCost;


        htmlContentToAppend += `

        <div class="col-lg-6"> <img style="height:40px" src="`+ list[i].src + `">` + list[i].name + ` </div>
        <div class="col-lg-3"  > <span id="cantidad" >` + count + `</span>
        
        <input id="decrease"  type="button" value="-">
        <input id="increase" type="button" value="+">
        </div>
        <div class="col-lg-3" id="precio">` + list[i].currency + " " + unitCost + `</div> 
        `


        $("#contentCart").html(htmlContentToAppend);
        $("#subtotalCart").html(total.toFixed(2));
        $("#currencyCart").html(list[i].currency);

        $("#decrease").on("click", function () {

            if (count == 1) {
                $("#decrease").attr("disabled", true);
            }

            count = count - 1;
            $("#cantidad").html(count);
            total = total - unitCost;
            $("#subtotalCart").html(total.toFixed(2));
            metodoDeEnvioFavorito();
            totalCompra();

        });
        $("#increase").on("click", function () {

            $('#decrease').removeAttr("disabled");

            count = count + 1;
            $("#cantidad").html(count);
            total = total + unitCost;
            $("#subtotalCart").html(total.toFixed(2));
            metodoDeEnvioFavorito();
            totalCompra();
        });


        metodoDeEnvioFavorito();
        totalCompra();

    }

}

/* funciones que sirven para la elección sobre los input type=radio de método de pago dentro de modal */

$("#chooseBankDeposit").on("click", function () {

    $("#creditCardMethod").addClass("d-none");
    $("#bankDepositMethod").removeClass("d-none");

});

$("#chooseCreditCard").on("click", function () {

    $("#creditCardMethod").removeClass("d-none");
    $("#bankDepositMethod").addClass("d-none");

});


/*función para validar campos para lograr la compra exitosamente */

$("#finalizePurchase").on("click", function () {


    if ($("#inputAddress").val() !== ""  && $("#inputCountry").val() !== ""
     && $("#ShowPaymentMethod").text() == " Método ya elegido" ) {

        $("#validationFailure").html("");
        $("#inputAddress").val("");
        $("#inputCountry").val("");
        $("#inputAddress").removeClass("errorValidacion");
        $("#inputCountry").removeClass("errorValidacion");
        $("#missingPayment").val("");
        $("#ShowPaymentMethod").val("");
       
        alert("Compra realizada con éxito");
        
        

    } else {
        $("#validationFailure").html("¡Existen campos obligatorios sin completar!");
        $("#validationFailure").addClass("colorAlertCart");

        $("#inputAddress").addClass("errorValidacion");
        $("#inputCountry").addClass("errorValidacion");
    }

    if($("#ShowPaymentMethod").text()==""){

       $("#missingPayment").html("¡Selecciona un método de pago!");
       $("#missingPayment").addClass("colorAlertCart");

    }

    


});



/*función validación de datos modal */

$("#paymentConfirmed").on("click", function () {

    if ($("#titularDeLaTarjeta").val() !== "" && $("#numerosDeLaTarjeta").val() !== "" &&
        $("#inputCVV").val() !== "" && $("#inputvencimiento").val() !== ""
        && $("#chooseCreditCard").is(":checked")) {

        $("#openModal").modal("hide");
        $("#ShowPaymentMethod").html(" Método ya elegido");


    } else {


        $("#titularDeLaTarjeta").addClass("errorValidacion");
        $("#numerosDeLaTarjeta").addClass("errorValidacion");
        $("#inputCVV").addClass("errorValidacion");
        $("#inputvencimiento").addClass("errorValidacion");

        $("#validationFailureModal").html("¡Existen campos obligatorios sin completar!");
    }

});

$("#paymentConfirmed").on("click", function () {

    if ($("#personToDeposit").val() !== "" && $("#personWhoDeposits").val() !== "" &&
        $("#sourceAccount").val() !== "" && $("#destinationAccount").val() !== "" && $("#bankingEntity").val() !== ""
        && $("#chooseBankDeposit").is(":checked")) {

        $("#openModal").modal("hide");
        $("#ShowPaymentMethod").html(" Método ya elegido");


    } else {


        $("#personToDeposit").addClass("errorValidacion");
        $("#personWhoDeposits").addClass("errorValidacion");
        $("#sourceAccount").addClass("errorValidacion");
        $("#destinationAccount").addClass("errorValidacion");
        $("#bankingEntity").addClass("errorValidacion");
        $("#chooseBankDeposit").addClass("errorValidacion");

        $("#validationFailureModal").html("¡Existen campos obligatorios sin completar!");
    }

});




function metodoDeEnvioFavorito() {

    let radioSelected = $("input[name=shippingRadio]:checked", "#shippingForm").val();
    let subtotalCompra = parseInt($("#subtotalCart").text());

    if (radioSelected == "premium") {

        let resultado = subtotalCompra * 0.15;
        $("#ShippingCost").html(resultado.toFixed(2));
        totalCompra()

    } else if (radioSelected == "express") {

        let resultado = subtotalCompra * 0.07;
        $("#ShippingCost").html(resultado.toFixed(2));
        totalCompra()

    } else if (radioSelected == "standard") {

        let resultado = subtotalCompra * 0.05;
        $("#ShippingCost").html(resultado.toFixed(2));
        totalCompra()

    }
}

function totalCompra() {

    let subtotal = parseInt($("#subtotalCart").text());
    let envio = parseInt($("#ShippingCost").text());
    let resultado = subtotal + envio;

    $("#totalCart").html(resultado.toFixed(2));
}



