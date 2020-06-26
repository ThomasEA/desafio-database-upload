import Multer from 'multer';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const directoryPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directoryPath,
    storage: multer.diskStorage({
        destination: directoryPath,
        filename: (request, file, callback) => {
            const filename = `${crypto.randomBytes(10).toString('hex')}-${file.originalname}`;

            callback(null, filename);
        }
    })
}