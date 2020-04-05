import File from '../models/File';

class AvatarController {
  async store(req, res) {
    const { filename, path } = req.file;
    const file = await File.create({ filename, path });

    return res.json(file);
  }
}

export default new AvatarController();
