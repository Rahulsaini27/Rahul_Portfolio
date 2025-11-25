const bucket = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadToFirebase = (file, folder = 'uploads') => {
    return new Promise((resolve, reject) => {
        if (!file) return resolve(null);

        const fileName = `${folder}/${uuidv4()}${path.extname(file.originalname)}`;
        const fileUpload = bucket.file(fileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            console.error("Firebase Upload Error:", error);
            reject(error);
        });

        blobStream.on('finish', async () => {
            // Make the file public and return the URL
            await fileUpload.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

/**
 * Deletes a file from Firebase Storage using its Public URL
 */
const deleteFromFirebase = async (publicUrl) => {
    if (!publicUrl) return;

    try {
        // Extract the file path from the URL
        // URL format: https://storage.googleapis.com/BUCKET_NAME/FOLDER/FILENAME
        const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
        
        if (publicUrl.startsWith(baseUrl)) {
            const filePath = publicUrl.replace(baseUrl, ''); // Remove domain to get 'folder/filename'
            const file = bucket.file(filePath);
            
            // Check if file exists before deleting
            const [exists] = await file.exists();
            if (exists) {
                await file.delete();
            }
        }
    } catch (error) {
        console.error("Error deleting file from Firebase:", error);
        // We do not reject/throw error here to prevent crashing the server 
        // if the image was already missing.
    }
};

module.exports = { uploadToFirebase, deleteFromFirebase };