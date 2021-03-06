import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(
          null,
          `${new Date().getTime()}-${
            file.originalname.split('.')[0]
          }.png`.replace(/ /g, '')
        );
      });
    },
  }),
};
