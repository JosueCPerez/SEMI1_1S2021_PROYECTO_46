# Seminario de Sistemas 1
## _PROYECTO_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

### TPC

Es aplicación web que almacena fotos de platillos junto con sus recetas. Esta permite subir todo tipo de fotos. Tiene como funcionalidad las secciones para listar todas las fotos subidas, listarlas por álbumes o mostrar las fotos de perfil del usuario, todo esto para cada usuario y crear de forma interactiva tu recetario personal que podras compartir con otros usuarios.

#### Datos Estudiantes
| Nombre | Carné |
| ------ | ------ |
| Heidy Carolina Castellanos de León | 201612282 |
| Josué Carlos Pérez Montenegro  | 201403546 |
#### Arquitectura
![Bucket](imagenes/arqui.jpg "Arquitectura del proyecto")
##### _Base de datos_
La base de datos esta diseñada por tres tablas:
> User--> id_user: identificador del usuario
        nick: registro con el que se esta manejando la cuenta
        name: nombre del usuario
        password: contraseña de la cuenta
        photo: La foto de perfil asociada a la cuenta
        
> Album--> id_album: identificador del album
        id_user: identificador del usuario (para asociar un album a un usuario)
        name: nombre del album
        
> Image--> id_image: identificador de una imagen
         id_album: identificador del album (para asociar una imagen a un album)
         name: nombre de la foto
         photo: direccion de la imagen 
         
##### _Servidor Nodejs_
- [Dependecia] - aws-sdk: 2.853.0
- [Dependecia] - cors: 2.8.5
- [Dependecia] - express: 4.17.1
- [Dependecia] - md5: 2.3.0
- [Dependecia] - mysql: 2.18.1

![Bucket](imagenes/nodejs.png "Codigo del servidor Nodejs")
![Bucket](imagenes/nodejs2.png "Codigo del peticiones del servidor Nodejs")

#### Usuarios de IAM
- bucket_user
     - AmazonS3FullAccess 
- dynamoDB_user 
    - AmazonDynamoDBFullAccess 
- rekognition_user
    -  AmazonRekognitionFullAccess 
- translate_user
   -  TranslateFullAccess 
- lex_user
  -  AmazonLexFullAccess 

#### Capturas de Pantalla
##### _Buckets de S3_
![Bucket](imagenes/bucket.png "S3")
##### _EC2_
![Bucket](imagenes/ec2node.png "Nodejs")
![Bucket](imagenes/ec2py.png "Python")
##### _DynamoDB_
![Bucket](imagenes/dynamo.png "DynamoDB")
##### _Lex_
![image](https://user-images.githubusercontent.com/53104989/114101633-373fd500-9883-11eb-9e4f-94f9c3fe0430.png)
##### _Aplicación Web_
![Bucket](imagenes/Ugram2.png "Registro")
![Bucket](imagenes/Ugram.png "Inicio")
![image](https://user-images.githubusercontent.com/53104989/114101741-65bdb000-9883-11eb-928c-938a483e3e13.png)

