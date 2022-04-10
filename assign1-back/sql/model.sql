create database assign1;

create table clinics(
    clinic_id serial not null primary key,
    clinic_name varchar(186) not null,
    clinic_location_lang varchar(28)  not null,
    clinic_location_lat varchar(28)  not null,
    clinic_phone_number varchar(28) not null,
    clinic_website varchar(56) not null,
    clinic_services varchar(1000) not null,
    clinic_work_hours varchar(28) not null,
    clinic_img_link varchar(158) not null,
    clinic_is_active boolean default false not null,
    clinic_is_deleted boolean default false not null,
    clinic_added_at timestamptz default current_timestamp
);

create table patients(
   patient_id serial not null primary key, 
   patient_address varchar(128)  not null,
   patient_name varchar(86) not null,
   patient_service varchar(186) not null,
   patient_age integer not null,
   patient_added_at timestamptz default current_timestamp
);

create table users (
    user_id serial not null primary key,
    username varchar(164) not null,
    password varchar(60) not null
);

-- [
-- {
-- name: Akfa Medline,
-- lat: 41.34323036392372,
-- long: 69.20890546592135,
-- services: lab, dentist, dermatolog,urolog..
-- phone_number:99890123345
-- website: akfa-medline.uz
-- open_close: 8:00-19:00
-- image_link: https://avatars.mds.yandex.net/get-altay/1483503/2a000001678c8557eb311d84649adec99084/XXXL
-- }
-- ]

