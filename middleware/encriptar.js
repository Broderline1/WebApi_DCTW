const bcrypt = require('bcryptjs');

exports.encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};