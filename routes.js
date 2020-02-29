module.exports= (APP,Data,Zonas,SelectPlatillos, Total) =>{

//Zonas disponibles ruta  http://localhost:5000/
APP.get('/', (req,res)=>{
    res.json('Zonas disponibles = ' + Zonas.map(f => ' Zona ' + f.zona +'') );
});

//Restaurantes por  Zona http://localhost:5000/zona/Norte
APP.get('/zona/:name', (req,res)=>{
    var zona = req.params.name;
    var restaurants =  Data.filter(c => c.zona == zona).map(x => x.name +' id = ' + x.id );
    var message=" Restaurantes en zona "
    res.send(JSON.stringify(message + zona + ' = ' + restaurants));
});

//http://localhost:5000/name/
//Platillos por restaurante con post, pide que le envies el id=id del restaurante deseado. Ej: id=3
APP.post('/name', (req,res)=>{
    var id =Number(req.body.id) ;
    var name = Data.filter(x => Number(x.id) === id)
    console.log (name)
    var platillo = name.map (x => x.platillos)
    res.send(`<h2>Platillos del restaurante ${name[0].name}</h2>${JSON.stringify(platillo)}`);
});

//http://localhost:5000/platillo
//Seleccionar platillo de un restaurante, pide el nombre del platillo y el nombre del restaurante
//ej. name= "Carls Jr Norte", platillo="Olive Oil" que los obtuvo al dar click en el menú anterior sin que el usuario de la información
APP.post('/platillo', (req,res)=>{
    var id =Number(req.body.idRestaurant) ;
    var idPlatillo = req.body.idPlatillo;

    var shopCart = (Data[id].platillos).filter (x => x.id == idPlatillo);
    SelectPlatillos.push(shopCart[0].name);
    Total +=shopCart[0].value;
    console.log (SelectPlatillos, Total)
    res.json(`Usted Seleccionó ${shopCart[0].name} y su carrito actualizado es: ${SelectPlatillos} `);
    
});


//Deseleccionar platillo http://localhost:5000/platillo con parametro en body platillo = Olive Oils por ejemplo
APP.get('/platillo', (req,res)=>{ 
    var id =Number(req.body.idRestaurant) ;
    var idPlatillo = req.body.idPlatillo;
    var shopCart = (Data[id].platillos).filter (x => x.id == idPlatillo);
    Total -= shopCart[0].value;
    SelectPlatillos = SelectPlatillos.filter( x => x !== String(shopCart[0].name));
    console.log (SelectPlatillos, Total);
    res.end(`<h2>Usted eliminó del carrito</h2><h3> ${shopCart[0].name} </h3> <h4>Carrito actualizado ${SelectPlatillos}</h4>`);

});

//Check out  http://localhost:5000/send  con parametro send = booleano  para verificar si desea enviarlo o no
//en caso de enviarlo se vacia el carrito en SelecPlatillos.
APP.get('/send', (req,res)=>{
    let compra = [];
    if(req.body.send == 1) {
        compra = SelectPlatillos;
        SelectPlatillos=[];
    }
    console.log (SelectPlatillos);
    res.end( `Usted comprará =  ${compra} con un Total a pagar de : ${Total} `);
});

//Cancelar pedido  http://localhost:5000/cancel donde el parametro cancel es booleano y dice si se cancela o no el pedido
APP.get('/cancel', (req,res)=>{
    if(req.body.cancel == 1) {
        SelectPlatillos=[]; 
        console.log(SelectPlatillos);
        var message= "Canceló su pedido";
    }
    else{var message= "No se cancelo su pedido, puede seguir comprando";
    }
    res.send(`<h2> ${message} </h2>Carrito: ${SelectPlatillos}`);
});





}