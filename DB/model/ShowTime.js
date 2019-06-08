const Pg = require("../Postgres");
const Sequelize = Pg.Sequelize;
const sequelize = Pg.sequelize;
const Movie = require("../model/Movie");
class ShowTime extends Sequelize.Model {}
ShowTime.init({
  // attributes
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
  timestart: Sequelize.DATE,
  timefinish: Sequelize.DATE,
}, {
  sequelize,
  modelName: 'showtimes',
  underscored: true,
  // options
});
ShowTime.belongsTo(Movie);
Movie.hasMany(ShowTime);
module.exports = ShowTime;
