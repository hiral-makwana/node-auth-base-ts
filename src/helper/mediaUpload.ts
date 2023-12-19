import path from 'path'
import multer from 'multer'
import fs from 'fs';
import config from '../config/config.json';

const uploadFolder = config.UPLOAD_DIR || 'uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, uploadFolder);
  },
  filename: function (req: any, file: any, cb: (arg0: any, arg1: any) => void) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage
})

export { upload };