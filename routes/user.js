var express = require("express");
var router = express.Router();
const Movie = require("../DB/model/Movie");
const User = require("../DB/model/User");
const Booking = require("../DB/model/Booking");
const ShowTime = require("../DB/model/ShowTime");
const Cinema = require("../DB/model/Cinema");
const Op = require('sequelize').Op;
const Pg = require("../DB/Postgres");
const Promise = require('bluebird');
/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.findAll().then(movies => {
    var data = movies.map((item) => item.dataValues);
    res.render("index", {result: data});
  }).catch(next);
});

router.get('/movieOnScreening', async function(req, res, next){
  var movies = await Movie.findAll({
    where: {
      openningday: {
        [Op.lte]: new Date()
      }
    }
  });
  res.send(movies);
});

router.get("/movieWatchedMost", async function(req, res, next){
  var movieIdList = await ShowTime.findAll({
    attributes: ['movie_id', [Pg.Sequelize.fn('count',Pg.Sequelize.col("showtimes.movie_id")), 'amount']],
    raw: true,
    include: [{model: Booking, attributes:[]}],
    group: ['showtimes.movie_id']
  });
  var Ids = movieIdList.map(item => item.movie_id)

  var movies = await Movie.findAll({
    where: {
      id: {
        [Op.in]: Ids
      }
    }
  });
  movieIdList.sort((a, b) => (a.count < b.count) ? 1 : -1);
  var moviesOrdered = movieIdList.map(item => movies.filter(movie => movie.id == item.movie_id));
  res.send(moviesOrdered);
});


router.post("/login", function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    User.findAll({where: {
        email: email,
        password: password
    }}).then(user => {
      if (!user && user.length != 1) {
        res.send({result: "false"})
      }
      res.send({result:"true"})
    }).catch(next);
});

router.post("/register", async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var fullname = req.body.fullname;
  var telephone = req.body.telephone;
  var user = await User.findAll({where: {
    email: email,
    password: password
  }})
  if (user) {
    res.send({result: "false"});
    return;
  }
  User.create({
      email: email,
      password: password,
      fullname: fullname,
      telephone: telephone,
      rule: "user"
    });
    res.send({result: "true"});    
});

router.post("/editUser", async function(req, res, next) {
  if (!req.body.id) {
    res.send("User not found.");
    return;
  }
  var user = {
    email : req.body.email,
    password: req.body.password,
    fullname: req.body.fullname,
    telephone: req.body.telephone
  }
  var updatedUser = await User.update(user, {
    where: {
      id: req.body.id
    }
  })
  if (!updatedUser) {
    res.send("Update error.");
    return;
  }
  res.send("Update successfully.");
});

router.get("/showtime", async function(req, res, next) {
  var nameCinema = req.query.nameCinema;
  var nameMovie = req.query.nameMovie;
  if (nameCinema && nameMovie) {
    res.send(await getShowtimeByNameMovieAndNameCinema(nameCinema, nameMovie));
    return;
  }
  if (nameCinema) {
    res.send(await getShowTimeByNameCinema(nameCinema));
  }
  return null;
});

router.get("/bookingTicket", async function(req, res, next){
  var userId = req.query.userId;
  var showtimeIdList = req.query.showtimeIdList.split(",");
  res.send(await bookTicket(userId, showtimeIdList));
});

async function bookTicket(userId, showtimeIdList) {
  await Pg.sequelize.transaction(async (t) => {
    for (let i = 0; i < showtimeIdList.length; i++) {
      const showtimeId = showtimeIdList[i];
      console.log(`Tim ghe ${showtimeId}`);
      const booking = await Booking.findAll({
        where: {
          id: showtimeId,
        },
        transaction: t,
        lock: true,
      });
      if (booking) {
        return showtimeIdList;
      }
      showtime.user_id = userId;
      await showtime.save({
        transaction: t
      });
      showtimeIdList[i] = -1;
    }
    // Doi 10 giay
    await Promise.delay(10000);
    return [];
  });
}

async function getShowtimeByNameMovieAndNameCinema(nameCinema, nameMovie) {
  var cinema = await Cinema.findAll({
    where: {
      name: nameCinema
    }
  });
  var movie = await Movie.findAll({
    where: {
      name: nameMovie
    }
  });
  if (!cinema || !movie) {
    return null;
  }
  var cinemaId = cinema[0].id;
  var movieId = movie[0].id;

  var showtimes = await ShowTime.findAll({
    where: {
      cinema_id: cinemaId,
      movie_id: movieId
    }
  });
  return showtimes;
}

async function getShowTimeByNameCinema(nameCinema) {
  var cinema = await Cinema.findAll({
    where: {  
      name: nameCinema
    }
  });
  if (!cinema) {
    return null;
  } 
  var cinemaId = cinema[0].id;
  var showtimes = await ShowTime.findAll({
    where: {
      cinema_id: cinemaId,
    }
  });
  return showtimes;
}

module.exports = router;
