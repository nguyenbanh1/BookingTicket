-- movies
insert into movies(name, openningday, imageposter, type, duration)
    values('CHÚA TỂ GODZILLA', '2019-06-07', 'movie1.jpg', 'Hài, Hoạt Hình', 180);
insert into movies(name, openningday, imageposter, type, duration)
    values('CHÚA TỂ GODZILLA 123', '2019-06-07', 'movie1.jpg', 'Hài, Hoạt Hình', 180);
insert into movies(name, openningday, imageposter, type, duration)
    values('CHÚA TỂ', '2019-06-07', 'movie1.jpg', 'Hài, Hoạt Hình', 180);
insert into movies(name, openningday, imageposter, type, duration)
    values('GODZILLA', '2019-06-07', 'movie1.jpg', 'Hài, Hoạt Hình', 180);
-- users
insert into uzers(email, password, fullname, telephone, rule)
    values('nguyen@gmail.com', 'nguyen', 'tang khanh nguyen', '123123', 'admin');

-- cinema
insert into cinemas(name, address) values ('NguyenBanh', 'Quan Go Vap');
insert into cinemas(name, address)  values ('NguyenBanh 123', 'Quan 8');
-- -- rebuild The movies are watched most.
insert into showtimes(timestart, timefinish, ticketprice, movie_id, cinema_id)
	values('2019-06-05 17:00:00.000000'::timestamp,'2019-06-05 19:00:00.000000'::timestamp, 100000, 1, 1);
insert into showtimes(timestart, timefinish, ticketprice, movie_id, cinema_id)
	values('2019-05-06 17:00:00.000000'::timestamp,'2019-05-06 19:00:00.000000'::timestamp, 100000, 1, 1);
insert into showtimes(timestart, timefinish, ticketprice, movie_id, cinema_id)
	values('2019-05-06 17:00:00.000000'::timestamp,'2019-05-06 19:00:00.000000'::timestamp, 100000, 2, 1);

insert into bookings(timeofbooking, price, showtime_id, uzer_id)
	values('2019-06-01 17:00:00.000000'::timestamp, 100000, 2, 1);
insert into bookings(timeofbooking, price, showtime_id, uzer_id)
	values('2019-06-01 17:00:00.000000'::timestamp, 100000, 1, 1);
insert into bookings(timeofbooking, price, showtime_id, uzer_id)
	values('2019-06-02 18:00:00.000000'::timestamp, 100000, 3, 1);
