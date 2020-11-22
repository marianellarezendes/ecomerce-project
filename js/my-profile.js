var perfilUsuario = {

    "nombres": "",
    "apellidos": "",
    "edad": null,
    "email": "",
    "contacto": null
};


$(document).ready(inicio);

function inicio() {

    
    cargaPerfil();
   

     $("#saveChanges").click(newData);    


}

function cargaPerfil(){

    let cargoUsuario = JSON.parse(window.localStorage.getItem("datosPerfil" ));


    if(cargoUsuario != null ){

       $("#firstNameProfile").val(cargoUsuario.nombres);
       $("#lastNameProfile").val(cargoUsuario.apellidos);
       $("#ageProfile").val(cargoUsuario.edad);
       $("#emailProfile").val(cargoUsuario.email);
       $("#contactNumberProfile").val(cargoUsuario.contacto);

    }
}

function newData() {

    perfilUsuario.nombres = $("#firstNameProfile").val();
    perfilUsuario.apellidos =   $("#lastNameProfile").val();
    perfilUsuario.edad =  parseInt($("#ageProfile").val());
    perfilUsuario.email =  $("#emailProfile").val();
    perfilUsuario.contacto = parseInt($("#contactNumberProfile").val());
   
     

    window.localStorage.setItem("datosPerfil", JSON.stringify(perfilUsuario)); 
    cargaPerfil();
}



