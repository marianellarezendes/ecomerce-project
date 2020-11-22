var product = {};
var review = {};
var allProducts = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        $("#productImagesGallery").html(htmlContentToAppend);
    }
}

$(document).ready(inicio);

function inicio() {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            allProducts = resultObj.data;



            

        }

    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;


            $("#productName").html(product.name);
            $("#productDescription").html(product.description);
            $("#productCount").html(product.soldCount);
            $("#productCategory").html(product.category);
            $("#productPrice").html(product.currency + " " + product.cost);
            relatedProducts();

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }

    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            review = resultObj.data;



            showComments(review);

        }

    });

  



}

function showComments(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];


        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3 imgUu">
                        <img src="https://i.redd.it/bmnyvcumaim11.jpg" class="img-thumbnail img-user">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ comment.user + `</h4>
                            <small class="text-muted">puntuación ` + comment.score + ` </small>
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                        <p class="mb-1">` + comment.dateTime + `</p>
                    </div>
                </div>
            </div>

        `

        $("#reviewsUsers").html(htmlContentToAppend);
    }



}

$("#btnComment").click(newComment);

function newComment() {

    let comment = $("#newComment").val();
    let user = sessionStorage.getItem("user");


    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var hour = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()

    var date = year + "-" + month + "-" + day + " " + hour;
    



    if (comment != "") {

        var Ncomment = {
            dateTime: date,
            description: comment,
            score: "-",
            user: user

        };

        review.push(Ncomment);
        $("#newComment").val("");
        showComments(review);
    }


}

function relatedProducts() {

    let htmlContentToAppend = "";
    let related = product.relatedProducts;
    let pos =""
    for (let i = 0; i < related.length; i++) {
       pos="";
        pos= product.relatedProducts[i]

        htmlContentToAppend += allProducts[pos].name + ", ";
         

        

        $("#relatedProducts").html(htmlContentToAppend);

    }


}





