# proyecto-tutorial02
Subir archivos a AWS S3 usando NodeJs

Este ejemplo ha replicado lo que esta publicado en:  

https://www.youtube.com/watch?v=sDVRyFaoI8s&t=222s
https://github.com/FaztTech/nodejs-s3-example

1. creamos el bucket

tutorial02-bucket

2. creamos el usuario - tutorial02_user_upload

AKIXXXXXXXXXXXXXXX7IZW									KEY  
p9GIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzfOSzx				password

3. creamos la politica de seguridad - tutorial02_policies_s3_upload

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::tutorial02-bucket",
                "arn:aws:s3:::tutorial02-bucket/*"
            ]
        }
    ]
}  
```  

4. creamos el grupo - tutorial02_group_s3_upload


5. configuramos los accesos IAM  
```  
user - 				group - 				policies  
tutorial02_user_upload  ->	tutorial02_group_s3_upload ->	tutorial02_policies_s3_upload  
```  

6. CREAMOS PROYECTO EN VSCODE
Requisitos:
npm -v 8.15.0
node -v v16.17.0  

c:\...\proyecto-tutorial02

7. inicializamos el proyecto  
```  
npm init -y  
```  

8. instalamos el plugin para subir ficheros  
```  
npm i express express-fileupload  
```  

para no estar deteniendo ni arrancando el servidor y detecte los cambios intalamos:  
```  
npm i nodemon -D  
```  

para ejecutar hacemos en cambio en packag.json agregando el "dev": "nodemon index.js"   
```  
"scripts": {
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },  
```  
para poder realizar los import y usar la sintaxis de js configuramos package.json con este atributo:   
```  
  "type": "module",  
```  
  
package.json deberia quedar asi:   
```   
{
  "name": "proyecto-tutorial02",  
  "version": "1.0.0",  
  "description": "",  
  "main": "index.js",  
  "type": "module",  
  "scripts": {  
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"  
  },  
  "keywords": [],  
  "author": "",  
  "license": "ISC",  
  "dependencies": {  
    "express": "^4.18.1",  
    "express-fileupload": "^1.4.0"  
  },  
  "devDependencies": {  
    "nodemon": "^2.0.19"  
  }  
}  
```  
8. creamos el archivo index.js  
```  
import express from 'express';  

const app = express();  

app.get('/',(req,res)=>{
    res.json({message: 'welcome to server AWS S3'})  
})  

app.listen(3000);  
console.log('Server on port $´{3000}');  
```  
ejecutamos el siguiente comando y debemos tener el servidor ejecutandose en el puerto 3000, probamos con localhost:3000  
```  
npm run dev  
```  

9. para hacer pruebas vamos a instalar un cliente REST similar a Potsman pero con la ventaja que trabaja desde Vscode, vamos a la ventana plugin e instalamos:  
Thunder Client  

10. detenemos el servidor porque debemos instalar un modulo dotenv cuya utilidad es leer el archivo oculto .env  
```  
npm i dotenv  
```  

contenido de .env  
```  
AWS_BUCKET_NAME=tutorial02-bucket  
AWS_BUCKET_REGION=us-east-1  
AWS_PUBLIC_KEY=AKIAWXXXXXXXXXXXXIZW  
AWS_SECRET_KEY=p9GIlRLnxxxxxxxxxxxxxxxxxxxxxxxkizfOSzx  
```  
11. en la raiz del proyecto creamos el archivo de configuracion
config.js  

```  
import {config} from 'dotenv'  

config()  

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME  
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION  
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY  
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY  

```  

12. para conectar a AWS hay que instalar el SDK para nodejs  
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/  
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html  
```  
npm install @aws-sdk/client-s3  
```  

13. creamos el archivo s3.js que se conectara al S3 de Amazon usando la configuracion en config.js  

Nota.- cuando hacemos las pruebas desde el cliente REST la variable que se define en el html donde se carga el archivo a enviar debe tener un nombre especifico que despues sera util para poder recuperar en al S3.js  
  
Por ejemplo:  

desde el cliente REST se ha definido como inputFile esta variable despues es util en el S3.js para recuperar el nombre del archivo y la ruta.  

```  
...  
export async function uploadFile(file){
    const stream = createReadStream(file.inputFile.tempFilePath)  
    console.log(AWS_PUBLIC_KEY, AWS_SECRET_KEY)  
    const uploadParams = {  
        Bucket: AWS_BUCKET_NAME,  
        Key: file.inputFile.name,  
        Body: stream  
    }  
    const command = new PutObjectCommand(uploadParams)  
    return await client.send(command)  
}  
...  
```
