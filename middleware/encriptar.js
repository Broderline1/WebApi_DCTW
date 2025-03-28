const bcrypt = require('bcryptjs');

const encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = encriptarPassword;
