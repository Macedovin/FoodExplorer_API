const knex = require('../database/knex');

const AppError = require('../utils/AppError');

const DiskStorage = require('../providers/DiskStorage');

class DishPictureController {
  async update(request, response) {
    const { id } = request.params;

    const pictureFileName = request.file.filename;

    const pictureDish = await knex('dishes').where({ id }).first();

    if(!pictureDish) {
      throw new AppError('O prato a ter sua imagem atualizada não foi encontrado.');
    };

    const diskStorage = new DiskStorage();

    if(pictureDish.picture) {
      await diskStorage.deletePictureFile(pictureDish.picture);
    };

    const filename = await diskStorage.savePictureFile(pictureFileName);

    pictureDish.picture = filename;

    await knex('dishes').update(pictureDish).where({ id });

    return response.json(pictureDish)
  }
}

module.exports = DishPictureController;