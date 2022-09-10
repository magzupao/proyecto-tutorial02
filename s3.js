import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from './config.js';
import { createReadStream } from "fs";


const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

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