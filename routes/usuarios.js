var ruta=require("express").Router();
var conexion=require("../conexion");

ruta.get("/",async(req,res)=>{
    try{
        var usuarios=await conexion.get();
        res.render("mostrar",{usuarios:usuarios});
    }
    catch(err){
        console.log(err);
        res.send("Error "+err);
    }
});

ruta.get("/nuevo", async(req,res)=>{
    res.render("nuevo");
});

ruta.post("/nuevo", async(req,res)=>{
    try{
        await conexion.doc().set(req.body);
        console.log("Registro insertado");
        res.redirect("/");
    }
    catch(err){
        console.log("error al registrar nuevo usuario ...... "+err);
    }
});

ruta.get("/modificar/:id", async(req,res)=>{
    var usuario=await conexion.doc(req.params.id).get();
    //console.log(usuario.data());
    res.render("modificar",{usuario:usuario.data(),id:usuario.id});
});

ruta.post("/modificar", async(req,res)=>{
    try{
        await conexion.doc(req.body.id).set(req.body);
        console.log("Registro modificado");
        res.redirect("/");
    }
    catch(err){
        console.log("error al modificar usuario ...... "+err);
    }
});

ruta.get("/borrar/:id", async(req,res)=>{
    try{
        await conexion.doc(req.params.id).delete();
        console.log("Registro borrado");
        res.redirect("/");
    }
    catch(err){
        console.log("error al borrar usuario ...... "+err);
    }
});

module.exports=ruta;