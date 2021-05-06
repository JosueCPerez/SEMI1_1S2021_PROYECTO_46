var user_name = "";

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var filePreview = document.createElement('img');
            filePreview.id = 'file-preview';
            filePreview.className = input.files[0].name;
            //e.target.result contents the base64 data from the image uploaded
            filePreview.src = e.target.result;
            filePreview.width = 180;
            filePreview.height = 220;
            //console.log(e.target.result);

            var previewZone = document.getElementById('file-preview-zone');
            previewZone.appendChild(filePreview);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

var fileUpload = document.getElementById('file-upload');
fileUpload.onchange = function(e) {
    readFile(e.srcElement);
}

function obtener_img() {
    var file = document.getElementById('file-preview');
    //console.log(file.src);
    console.log(file.textContent);
    //return file.src;
}

function registrar() {
    alert("entro a registrar")
    //obtener valores 
    var username = document.getElementById('username').value;
    var nombre = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var password_confirn = document.getElementById('password_confirm').value;
    var img_info = document.getElementById('file-preview').className;
    var img_split = img_info.split('.');
    img_name = img_split[0];
    img_extension = img_split[1];
    var img_base64 = document.getElementById('file-preview').src;

    var data = JSON.stringify({
        "nick": username,
        "name": nombre,
        "password": password,
        "profile": img_name,
        "base64": img_base64,
        "extension": img_extension
    });

    if (password == password_confirn) {

        var url = "http://localhost:3000/api/registerUser";
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', url, true);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(data);
        xhttp.onreadystatechange = function() {

            //console.log(xhttp.responseText);

            if (xhttp.status === 200) {
                alert('Se a registrado correctamente');
                console.log(xhttp.responseText);
                window.location.replace('index.html');

            } else {
                alert('Se produjo un error al registrar, porfavor intente de nuevo. ');
            }
        };

    }
}

function login() {
    username = document.getElementById('username_sigin').value;
    password = document.getElementById('password_sigin').value;

    var data = JSON.stringify({
        "nick": username,
        "password": password
    });

    //console.log(data)
    // consulta para verificar el usuario
    var url = "http://localhost:3000/api/loginUser";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        //console.log(xhttp.responseText);
        // respuesta del servidor   
        var respuesta = xhttp.responseText;
        //console.log(respuesta)
        var json = JSON.parse(respuesta);

        var verifiar = json.Count
            //count = respuesta.Count;
        if (verifiar == 1) {
            alert("bienvenido " + username);
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("json", respuesta);
            } else {
                // LocalStorage no soportado en este navegador
            }
            window.location.replace('ver_fotos.html');

        } else {
            alert("Datos incorrectos, no se pudo iniciar sesion");
        }

    };

    //console.log(data);

}

function ir_registro() {
    window.location.replace('registro.html');
}

function ir_login_webcam() {
    window.location.replace('prueba.html');
}

function ir_verfotos() {
    window.location.replace('ver_fotos.html');
}
function ir_chat() {
    window.location.replace('chat.html');
}

function obtener_usuario() {

    json_user = localStorage.getItem("json");
    //obtener los datos del localStorage
    var json = JSON.parse(json_user);
    var path_image = "";
    //alert(json_user);

    for (let dato of json.Items) {
        if (dato.location != null) {
            imagen = document.getElementById('img_user');
            imagen.src = dato.location.S
            path_image = dato.location.S
        }

        if (dato.name != null) {
            label = document.getElementById("label_nombre");
            label.innerHTML = '<h4>' + dato.name.S + '</h4>';
        }

        if (dato.nick != null) {
            label = document.getElementById("label_user");
            label.innerHTML = '<h4>' + dato.nick.S + '</h4>';
        }
    }

    var data = JSON.stringify({
        "location": path_image
    });

    //console.log(data)
    // consulta para verificar el usuario
    var url = "http://localhost:3000/api/getDataPhoto";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        // respuesta del servidor   
        var respuesta = xhttp.responseText;
        //console.log(respuesta)
        var json = JSON.parse(respuesta);

        var verifiar = json.data
        if (verifiar) {
            var details = verifiar['FaceDetails'][0];
            label = document.getElementById("tags");
            label.innerHTML = '<span class="badge rounded-pill bg-warning text-light">' + details.AgeRange.Low + '-' + details.AgeRange.High + ' Años</span>';
            label.innerHTML += '<span class="badge rounded-pill bg-info  text-light">' + details.Gender.Value + '</span>';
            if (details.Smile.Value)
                label.innerHTML += '<span class="badge rounded-pill bg-danger text-light">Smile</span>';
            if (details.Eyeglasses.Value)
                label.innerHTML += '<span class="badge rounded-pill bg-light text-dark">Eyeglasses</span>';
            if (details.Sunglasses.Value)
                label.innerHTML += '<span class="badge rounded-pill bg-primary text-light">Sunglasses</span>';
            if (details.Beard.Value)
                label.innerHTML += '<span class="badge rounded-pill bg-success text-light">Beard</span>';
            if (details.Mustache.Value)
                label.innerHTML += '<span class="badge rounded-pill bg-info text-light">Mustache</span>';
            if (details.EyesOpen.Value)
                label.innerHTML += '<span class="badge rounded-pill bg-dark text-light">EyesOpen</span>';
            if (details.MouthOpen.Value)
                label.innerHTML += '<span class="badge rounded-pill bg-warning text-light">MouthOpen</span>';

            details['Emotions'].forEach(element => {
                if (element.Confidence >= 80)
                    label.innerHTML += '<span class="badge rounded-pill bg-danger text-light">' + element.Type + '</span>';

            });
        } else {
            alert("Problema al leer la imagen");
        }

    };
}

function login_web(photo) {
    var data = JSON.stringify({
        "image": photo
    });

    //console.log(data)
    // consulta para verificar el usuario
    var url = "http://localhost:3000/api/loginWeb";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        // respuesta del servidor   
        var respuesta = xhttp.responseText;
        console.log(respuesta)
        var json = JSON.parse(respuesta);

        var verifiar = json.Count
            //count = respuesta.Count;
        if (verifiar == 1) {
            alert("bienvenido " + json.Items[0].nick.S);
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("json", respuesta);
            } else {
                // LocalStorage no soportado en este navegador
            }
            window.location.replace('ver_fotos.html');

        } else {
            alert("Datos incorrectos, no se pudo iniciar sesion");
            window.location.replace('index.html');
        }

    };
}

function cerrar_sesion() {
    window.location.replace('index.html');
}

function ir_editar() {
    window.location.replace('editar.html');
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

function datos_editar() {
    json_user = localStorage.getItem("json");
    console.log(json_user);

    var json = JSON.parse(json_user);

    for (let dato of json.Items) {

        if (dato.name != null) {
            label = document.getElementById("name");
            label.value = dato.name.S;
        }

        if (dato.nick != null) {
            label = document.getElementById("username");
            label.value = dato.nick.S;
        }
    }
}

function update() {
    json_user = localStorage.getItem("json");
    console.log(json_user);


    //obtener datos del localstorage
    img_base64 = document.getElementById('file-upload').src;
    id_user = "";
    username = document.getElementById("username").value;
    nombre = document.getElementById("name").value;
    password = document.getElementById("password").value;

    // si no selecciona nueva foto
    if (document.getElementById('file-preview') == null) {
        alert("No se selecciono ninguna foto");
        return;
    } else if (document.getElementById('name').value == "") {
        alert("llenar el campo de nombre");
        return;
    } else if (document.getElementById('username').value == "") {
        alert("llenar el campo de Username");
        return;
    } else if (document.getElementById('password').value == "") {
        alert("No se ingreso la contraseña");
        return;
    }

    //informacion de la imagen
    var img_info = document.getElementById('file-preview').className;
    var img_split = img_info.split('.');
    img_name = img_split[0];
    img_extension = img_split[1];
    var img_base64 = document.getElementById('file-preview').src;


    var json = JSON.parse(json_user);
    for (let dato of json.Items) {
        if (dato.id_user != null) {
            id_user = dato.id_user.S
        }
    }

    //creacion del json 
    var data = JSON.stringify({
        "id": id_user,
        "nick": username,
        "name": nombre,
        "password": password,
        "profile": img_name,
        "base64": img_base64,
        "extension": img_extension
    });
    //console.log(data);
    // consulta para update el usuario
    var url = "http://localhost:3000/api/updateUser";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (xhttp.status == 200) {
            
            alert('Se actualizo su informacion');
            window.location.replace('inicio.html');

        } else {
            alert('Se produjo un error al actualizar su informacion');
        }
    };
    //actualizar el lochal storage
    var data = JSON.stringify({
        "nick": username,
        "password": password
    });
    alert(data)
    //console.log(data)
    // consulta para verificar el usuario
    var url2 = "http://localhost:3000/api/loginUser";
    var xhttp2 = new XMLHttpRequest();

    xhttp2.open('POST', url2, true);
    xhttp2.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp2.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp2.setRequestHeader("Accept", "application/json");
    xhttp2.setRequestHeader("Content-Type", "application/json");
    xhttp2.send(data);
    xhttp2.onreadystatechange = function() {
        //console.log(xhttp.responseText);
        // respuesta del servidor   
        var respuesta = xhttp2.responseText;
        //console.log(respuesta)
        var json = JSON.parse(respuesta);

        var verifiar = json.Count
            //count = respuesta.Count;
        if (verifiar == 1) {
            console.log("bienvenido " + username);
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("json", respuesta);
            } else {
                // LocalStorage no soportado en este navegador
            }
           // window.location.replace('inicio.html');

        }else{
            console.log("error de datos")
        }
    };

}

function add_album() {
    json_user = localStorage.getItem("json");
    //console.log(json_user);
    var id_user = "";
    var json = JSON.parse(json_user);
    for (let dato of json.Items) {
        if (dato.id_user != null) {
            id_user = dato.id_user.S
        }
    }

    nombre = document.getElementById('album_name').value;
    if (nombre == "") {
        alert("Ingresar nombre del album.");
        return;
    }

    var data = JSON.stringify({
        "id": id_user,
        "name": nombre
    });

    //console.log(data);
    // consulta para agregar el album
    var url = "http://localhost:3000/api/addAlbum";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (xhttp.status === 200) {
            alert(xhttp.responseText);

        } else {
            alert(xhttp.responseText);
        }
    };
}

function datos_album() {

    //obtener datos del usuario
    json_user = localStorage.getItem("json");
    //obtener los datos del localStorage
    var json = JSON.parse(json_user);
    var id_user;
    for (let dato of json.Items) {
        if (dato.id_user != null) {
            id_user = dato.id_user.S
        }
    }

    //obtener id del album
    var data = JSON.stringify({
        "id": id_user
    });

    var url = "http://localhost:3000/api/getAllAlbumData";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (xhttp.status === 200) {
            var respuesta = xhttp.responseText;
            var json = JSON.parse(respuesta);

            var verificar = json.Count
            if (verificar >= 1) {
                localStorage.setItem("json_album", respuesta);
            } else {
                localStorage.setItem("json_album", null);
            }


        } else {
            localStorage.setItem("json_album", null);
        }
    };
}

function deleteAlbum() {
    //obtener datos del usuario
    json_user = localStorage.getItem("json");
    //console.log(json_user);
    var json = JSON.parse(json_user);

    var id_user = "";
    for (let dato of json.Items) {
        if (dato.id_user != null) {
            id_user = dato.id_user.S;
        }
    }

    // obtener el id del album
    var id_album = "";
    json_album = localStorage.getItem("json_album");
    if (json_album == null) {
        alert("No se encontraron albumes para este usuario");
        return;
    } else {
        var json = JSON.parse(json_album);
        album = document.getElementById("album_deelete").value;
        for (let dato of json.Items) {
            if (dato.name != null) {
                if (dato.name.S == album) {
                    id_album = dato.id_album.S
                }
            }
        }
    }

    if (id_user != "" && id_album != "") {
        //consulta para eliminar el album
        var data = JSON.stringify({
            "id": id_user,
            "album": id_album
        });
        // consulta para obtener datos del album el album
        var url = "http://localhost:3000/api/deleteAlbum";
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', url, true);
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(data);
        xhttp.onreadystatechange = function() {
            if (xhttp.status === 200) {
                //alert(xhttp.responseText);
                alert("Se elimino el album")
            } else {
                //alert(xhttp.responseText);
                alert("Error al eliminar album")
            }
        };
    } else {
        alert("Ingrese el nombre del album a eliminar");
    }


}