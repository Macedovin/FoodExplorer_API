const knex = require('../database/knex');

const AppError = require('../utils/AppError');

const DiskStorage = require('../providers/DiskStorage');

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;

    const avatarFileName = request.file.filename;

    const avatarUser = await knex('users').where({ id: user_id }).first();

    if (!avatarUser) {
      throw new AppError('Somente usuários autenticados podem mudar o avatar.', 401);
    };

    const diskStorage = new DiskStorage();

    if (avatarUser.avatar) {
      await diskStorage.deleteAvatarFile(avatarUser.avatar);
    }; 

    const filename = await diskStorage.saveAvatarFile(avatarFileName); 

    avatarUser.avatar = filename;

    const [updatedUserWithAvatar] = await knex('users')
      .where({ id: user_id })
      .update({
        avatar: avatarUser.avatar,
        updated_at: knex.fn.now()
      })
      .returning(['name', 'email', 'avatar', 'updated_at']);

    return response.json({updatedUserWithAvatar});
  }
}

module.exports = UserAvatarController;