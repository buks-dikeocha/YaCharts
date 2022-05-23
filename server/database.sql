CREATE DATABASE yacharts WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1;

CREATE TABLE public."user"
(
    user_id serial NOT NULL,
    first_name character varying(64) NOT NULL,
    last_name character varying(64) NOT NULL,
    email character varying(255) NOT NULL,
    password_ character varying(255) NOT NULL,
    PRIMARY KEY (user_id)
);

ALTER TABLE IF EXISTS public."user" OWNER to postgres;

create table public."chart"(
	chart_id serial,
	user_idf int,
	chart_name varchar(64),
	chart_desc varchar(1024),
	primary key (chart_id),
	foreign key (user_idf) references public."user" (user_id)
)

create table public."stat"( -- statistic
	stat_id serial,
	user_idf int,
	chart_idf int,
	stat_title varchar(255),
	stat_value real,
	primary key (stat_id),
	foreign key (user_idf) references public."user" (user_id),
	foreign key (chart_idf) references public."chart" (chart_id)
);


insert into public."chart" (user_idf, chart_name, chart_desc) values (1, 'activities', 'activites');
insert into public."chart" (user_idf, chart_name, chart_desc) values (1, 'payments', 'payments');
insert into public."chart" (user_idf, chart_name, chart_desc) values (2, 'colors', 'activites');
insert into public."chart" (user_idf, chart_name, chart_desc) values (1, 'kitchen', 'kitchen');

insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (1, 1, 'sleep', 6.5);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (1, 1, 'eat', 2);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (1, 2, 'bills', 219.00);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (1, 2, 'food', 374.63);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (1, 2, 'kids', 89.21);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (2, 1, 'blue', 7);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (2, 1, 'red', 6);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (2, 1, 'yellow', 2);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (2, 1, 'green', 4);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (3, 1, 'plates', 50);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (3, 1, 'cups', 25);
insert into public."stat" (user_idf, chart_idf, stat_title, stat_value) values (3, 1, 'utensils', 25);
