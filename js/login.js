$("#btnLogin").on("click",function(){
    let user = $("#emailInput").val();
    let pass = $("#passInput").val();
    
    if(user!="" && pass!=""){
        location.href="inicio.html"
    }
})
