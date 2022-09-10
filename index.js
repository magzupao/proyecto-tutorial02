import express from 'express';
import fileUpload from 'express-fileupload';
import { uploadFile } from './s3.js';

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './fileDir'
}))

app.get('/',(req,res)=>{
    res.json({message: 'welcome to server AWS S3'})
})

app.post('/fileUpload', async (req,res)=>{
    try{
        console.log(req.files)
        await uploadFile(req.files)
        res.json({message: 'subir archivo a AWS S3'})
    }catch(error){
        console.log(error)
    }
})

app.listen(3000);
console.log('Server on port $´{3000}');