const bucket = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadToFirebase = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) return resolve('');

        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const fileUpload = bucket.file(fileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', async () => {
            // Make the file public so it can be accessed via URL
            await fileUpload.makePublic();
            
            // Get the public URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = uploadToFirebase;