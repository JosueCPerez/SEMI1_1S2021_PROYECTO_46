function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var filePreview = document.getElementById('file-preview');
            filePreview.className = input.files[0].name;
            //e.target.result contents the base64 data from the image uploaded
            filePreview.src = e.target.result;
            filePreview.width = 250;
            filePreview.height = 200;
            //console.log(e.target.result);
            contenedor = document.getElementById("container");
            contenedor.height = 600;
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

function ir_inicio() {
    window.location.replace('inicio.html');
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

function subir_foto() {

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

    imagen = document.getElementById("file-preview");
    if (imagen.className == "") {
        alert('No se ha seleccionado ninguna foto para subir');
        return;
    }
    imagen_src = imagen.src;
    var img_info = imagen.className;
    var img_split = img_info.split('.');
    img_extension = img_split[1];

    imagen_name = document.getElementById('img_name').value;
    if (imagen_name == "") {
        alert("Ingrese el nombre de la foto a subir.");
        return;
    }

    imagen_descrip = document.getElementById('img_desc').value;
    if (imagen_name == "") {
        alert("Ingrese una descripcion para la imagen.");
        return;
    }

    //subir foto
    var data = JSON.stringify({
        "id": id_user,
        "name": imagen_name,
        "desc": imagen_descrip,
        "base64": imagen_src,
        "extension": img_extension
    });

    // consulta para update el usuario
    var url = "http://localhost:3000/api/uploadPhoto";
    var xhttp = new XMLHttpRequest();

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow_Credentials", 'true');
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (xhttp.status === 200) {
            alert("Se agrego la foto.");
        } else {
            alert(xhttp.responseText);
        }
    };

}