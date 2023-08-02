var express=require("express");
var usuariosRutas=require("./routes/usuarios");


var app=express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",usuariosRutas);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:3000");
});