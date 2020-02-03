import File from '../Models/File';

export default {
  async store(req, res, next) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    req.fileId = file.id;

    return next();
  },
};
