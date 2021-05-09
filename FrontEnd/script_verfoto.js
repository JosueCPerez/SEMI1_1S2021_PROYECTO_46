
//Metodo para obtener las fotos de los albums
function getFotos() {
    //obtener albumes del usuario
    json_user = localStorage.getItem("json");
    var json = JSON.parse(json_user);
    id_user = "";


    for (let dato of json.Items) {
        if (dato.id_user != null) {
            id_user = dato.id_user.S
        }
        if (dato.name != null) {
            label = document.getElementById("label_user");
            
            label.innerHTML = "<h1>  "+ dato.name.S + "<h1>";
        }
        if (dato.location != null) {
            imagen = document.getElementById('img_user');
            imagen.src = dato.location.S
        }
    }

    var data = JSON.stringify({
        id: id_user
    });

    // consulta para verificar el usuario
    var url = "http://localhost:3000/api/getAllAlbumData";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {

        var respuesta = (xhttp.responseText);
        //console.log(respuesta);
        var photos_json = JSON.parse(respuesta);
        var count = 0;
        var contenido = "";
        photos_json.Items.forEach(element => {
            contenido += '<li class="nav-item" role="presentation">';
            
            if(element.name.S === "Profile"){
                
            }else{
                if (count == 0)
                contenido += '<button class="nav-link active" id="pills-' + element.id_album.S + '-tab" data-bs-toggle="pill" data-bs-target="#' + element.name.S + '" type="button" role="tab" aria-controls="pills-' + element.name.S + '" aria-selected="true">' + element.name.S + '</button>';
            else
                contenido += '<button class="nav-link" id="pills-' + element.id_album.S + '-tab" data-bs-toggle="pill" data-bs-target="#' + element.name.S + '" type="button" role="tab" aria-controls="pills-' + element.name.S + '" aria-selected="false">' + element.name.S + '</button>';
            contenido += '</li>';
            count++;
            }

            
        });
        document.getElementById("pills-tab").innerHTML = contenido;
    };


    var url2 = "http://localhost:3000/api/getphoto";
    var xhttp2 = new XMLHttpRequest();

    xhttp2.open('POST', url2, true);
    xhttp2.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp2.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp2.setRequestHeader("Accept", "application/json");
    xhttp2.setRequestHeader("Content-Type", "application/json");
    xhttp2.send(data);
    xhttp2.onreadystatechange = function() {

        var respuesta = (xhttp2.responseText);
        //console.log(respuesta);
        var photos_json = JSON.parse(respuesta);
        lista_imagenes = photos_json.imagenes;
        var temp_album = "";
        var primero = true;
        var count = 0;
        var contenido = "";
        document.getElementById("pills-tabContent").innerHTML = "";
        
        for (imagen of lista_imagenes) {
            //console.log(imagen);
            imagen_info = imagen.split(";");
            album = imagen_info[0];
            
            
            img_name = imagen_info[1];
            img_desc = imagen_info[2];
            img_src = imagen_info[3];
            
            if(album =="Profile"){

            }else{
                if (temp_album != album) {
                    temp_album = album;
                    if (primero == true) {
                        primero = false;
                        count = 0;
                        contenido = '<div class="tab-pane fade show active" id="' + temp_album + '" role="tabpanel" aria-labelledby="pills-' + temp_album + '-tab">';
                        contenido += '<div class="row" id="tags">';
                        contenido += '<div class="col-sm-4">';
                        contenido += '<div class="card" style="width: 18rem;">';
                        contenido += '<img src="' + img_src + '" class="card-img-top" alt="' + img_name + '"  width="100" height="170">';
                        contenido += '<div class="card-body">';
                        contenido += '<h5 class="card-title">' + img_name + '</h5>';
                        contenido += '<p id="' + temp_album + img_name + '" class="card-text" >' + img_desc + '</p>';
                        contenido += '<input id="captura" type="button" name="submit" class="btn btn-primary" onclick="ir_traducir(\'' + temp_album + img_name + '\')" value="Ver más">';
                        contenido += '</div>';
                        contenido += '</div>';
                        contenido += '</div>';
                    } else {
                        if (count == 2) {
                            primero = false;
                            count = 0;
                            contenido += '</div>';
                            contenido += '<div class="tab-pane fade" id="' + temp_album + '" role="tabpanel" aria-labelledby="pills-' + temp_album + '-tab">';
                            contenido += '<div class="row" id="tags">';
                            contenido += '<div class="col-sm-4">';
                            contenido += '<div class="card" style="width: 18rem;">';
                            contenido += '<img src="' + img_src + '" class="card-img-top" alt="' + img_name + ' "  width="100" height="170">';
                            contenido += '<div class="card-body">';
                            contenido += '<h5 class="card-title">' + img_name + '</h5>';
                            contenido += '<p id="' + temp_album + img_name + '" class="card-text">' + img_desc + '</p>';
                            contenido += '<input id="captura" type="button" name="submit" class="btn btn-primary" onclick="ir_traducir(\'' + temp_album + img_name + ', '+img_src+'\')" value="Ver más">';
                            contenido += '</div>';
                            contenido += '</div>';
                            contenido += '</div>';
                        } else {
                            primero = false;
                            count = 0;
                            contenido += '</div>';
                            contenido += '</div>';
                            contenido += '<div class="tab-pane fade" id="' + temp_album + '" role="tabpanel" aria-labelledby="pills-' + temp_album + '-tab">';
                            contenido += '<div class="row" id="tags">';
                            contenido += '<div class="col-sm-4">';
                            contenido += '<div class="card" style="width: 18rem;">';
                            contenido += '<img src="' + img_src + '" class="card-img-top" alt="' + img_name + '" width="100" height="170">';
                            contenido += '<div class="card-body">';
                            contenido += '<h5 class="card-title">' + img_name + '</h5>';
                            contenido += '<p id="' + temp_album + img_name + '" class="card-text">' + img_desc + '</p>';
                            contenido += '<input id="captura" type="button" name="submit" class="btn btn-primary" onclick="ir_traducir(\'' + temp_album + img_name +  '\')" value="Ver más">';
                            contenido += '</div>';
                            contenido += '</div>';
                            contenido += '</div>';
                        }
    
                    }
                } else {
                    if (count == 2) {
                        count = 0;
                        contenido += '</div>';
                        contenido += '<div class="row" id="tags">';
                        contenido += '<div class="col-sm-4">';
                        contenido += '<div class="card" style="width: 18rem;">';
                        contenido += '<img src="' + img_src + '" class="card-img-top" alt="' + img_name + '" width="100" height="170">';
                        contenido += '<div class="card-body">';
                        contenido += '<h5 class="card-title">' + img_name + '</h5>';
                        contenido += '<p id="' + temp_album + img_name + '" class="card-text">' + img_desc + '</p>';
                        contenido += '<input id="captura" type="button" name="submit" class="btn btn-primary" onclick="ir_traducir(\'' + temp_album + img_name + '\')" value="Ver mas">';
                        contenido += '</div>';
                        contenido += '</div>';
                        contenido += '</div>';
                    } else {
                        count++;
                        contenido += '<div class="col-sm-4">';
                        contenido += '<div class="card" style="width: 18rem;">';
                        contenido += '<img src="' + img_src + '" class="card-img-top" alt="' + img_name + '" width="100" height="170">';
                        contenido += '<div class="card-body">';
                        contenido += '<h5 class="card-title">' + img_name + '</h5>';
                        contenido += '<p id="' + temp_album + img_name + '" class="card-text">' + img_desc + '</p>';
                        contenido += '<input id="captura" type="button" name="submit" class="btn btn-primary" onclick="ir_traducir(\'' + temp_album + img_name + '\')" value="Ver mas">';
                        contenido += '</div>';
                        contenido += '</div>';
                        contenido += '</div>';
                    }
                }
            }
            
        }
        document.getElementById("pills-tabContent").innerHTML = contenido;
    };
}

function ir_traducir(texto ) {
    var send_text = document.getElementById(texto).textContent;
    document.getElementById('texto_traducir').innerText = send_text;
    $('#exampleModal').modal('show');
}

function trandu() {
    var texto = document.getElementById('texto_traducir').value;
    var tipo = document.getElementById("tipo_tradu").value;
    if (tipo != "Languages") {
        var data = JSON.stringify({
            text: texto,
            leng: tipo
        });

        // consulta para verificar el usuario
        var url = "http://localhost:3000/api/translate";
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', url, true);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(data);
        xhttp.onreadystatechange = function() {

            var respuesta = (xhttp.responseText);
            //console.log(respuesta);
            var tra_json = JSON.parse(respuesta);
            document.getElementById("traducido").innerText = tra_json.message;
        };
    } else {
        alert("Debe seleccionar un lenguaje");
    }
}

function limpiar() {
    document.getElementById("traducido").innerText = "";
}

function ir_subirfoto() {
    window.location.replace('subirfoto.html');
}

function ir_editaralbum() {
    window.location.replace('editar_album.html');
}

function ir_inicio() {
    window.location.replace('inicio.html');
}