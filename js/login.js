$("#btnLogin").on("click" ,function(){
    let user = $("#emailInput").val();
    let pass = $("#passInput").val();
    
    if(user!="" && pass!=""){
        window.sessionStorage.setItem("user",user);
        location.href="inicio.html"
    }else {
        alert("Los campos correo electrónico y cotraseña no pueden estar vacios!")
    }
})

$(".nombreUsuario").text(sessionStorage.getItem("user"));



$(".cerrar-sesion").on("click" ,function(){
    sessionStorage.clear();

})
