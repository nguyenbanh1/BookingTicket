const Sequelize = require('sequelize');
const env = process.env.DATABASE_URL;
const sequelize = new Sequelize(env || 'postgres://postgres:nguyen@localhost:5432/postgres', {
  define: {
    timestamps: false
  }
});
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;