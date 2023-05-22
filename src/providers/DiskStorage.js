const fs = require('fs');
const path = require('path');

const uploadConfig = require('../configs/upload');

class DiskStorage {
  async saveAvatarFile(file) {

    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.USERS_UPLOADS_FOLDER, file),
      );

    return file;
  }

  async savePictureFile(file) {
      
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.DISHES_UPLOADS_FOLDER, file)
    )

    return file;
  }

  async deleteAvatarFile(file) {
    
    const usersFilePath = path.resolve(uploadConfig.USERS_UPLOADS_FOLDER, file);

    try {

      await fs.promises.stat(usersFilePath);

    } catch(error) {

      console.error(error);
    }

    await fs.promises.unlink(usersFilePath);
  }

  async deletePictureFile(file) {

    const dishesFilePath = path.resolve(uploadConfig.DISHES_UPLOADS_FOLDER, file);

    try {

      await fs.promises.stat(dishesFilePath);

    } catch(error) {

      console.error(error);
    }

    await fs.promises.unlink(dishesFilePath);
  }

}

module.exports = DiskStorage;