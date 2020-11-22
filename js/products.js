const ORDER_ASC_BY_PRICE = "AB";
const ORDER_DESC_BY_PRICE = "BA";
const ORDER_BY_RELEVANCY = "Relev.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

$(document).ready(inicio);

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {

        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost < bCost) { return -1; }
            if (aCost > bCost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost < bCost) { return 1; }
            if (aCost > bCost) { return -1; }
            return 0;

        });
    } else if (criteria === ORDER_BY_RELEVANCY) {
        result = array.sort(function (a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if (aRel < bRel) { return 1; }
            if (aRel > bRel) { return -1; }
            return 0;
        });

    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];


        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
                 
            
                <div class="card mt-2 ml-4 mb-2" style="width: 18rem;">
                    <img src="` + product.imgSrc + `" class="card-img-top" alt="...">
                    <div class="card-body" >
                        <h5 class="card-title">`+ product.name + `</h5>
                        <small class="text-muted">se han vendido ` + product.soldCount + `</small>
                        <p class="card-text" >` + product.description + ` </p>
                        <p> `+ product.currency + product.cost + `</p>
                        <a href="product-info.html" class="btn btn-primary btn-block">Ver</a>
                    </div>
                </div>
            
                `


        }
        $("#productsList").html(htmlContentToAppend);
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}



function inicio() {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    $("#sortAscPrice").click(sortAscPrice);
    $("#sortDescPrice").click(sortDescPrice);
    $("#sortByRelev").click(sortByRelev);
    $("#rangeFilterPrice").click(rangeFilterPrice);
    $("#clearRangeFilterPrice").click(clearRangeFilterPrice);
    

}


function sortAscPrice() {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
}

function sortDescPrice() {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
}

function sortByRelev() {
    sortAndShowProducts(ORDER_BY_RELEVANCY);
}

function rangeFilterPrice() {
    minPrice = $("#rangeFilterPriceMin").val();
    maxPrice = $("#rangeFilterPriceMax").val();

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
        minPrice = parseInt(minPrice);
    }
    else {
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
        maxPrice = parseInt(maxPrice);
    }
    else {
        maxPrice = undefined;
    }

    showProductsList();
}




function clearRangeFilterPrice() {
    $("#rangeFilterPriceMin").val("");
    $("#rangeFilterPriceMax").val("");

    minPrice = undefined;
    maxPrice = undefined;

    showProductsList();
}


