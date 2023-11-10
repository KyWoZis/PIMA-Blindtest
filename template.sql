-- Template of tables to host blindtest by yourself

CREATE TABLE music (
    music_id int primary key AUTO_INCREMENT,
    music_name varchar(100) NOT NULL, 
    artist_name varchar(100) NOT NULL, 
    origin varchar(100), 
    music_type varchar(100)                  
    );;

--this is not a playlist, but the list of the playlists, since the playlist_name will be unique, it's the key, it will reference another table having the same name
CREATE TABLE playlist_list (
    user_id int NOT NULL,
    playlist_name varchar(100) primary key
);;

-- users table, the password is hashed with bcrypt, the is_admin is a boolean to know if the user is an admin or not

CREATE TABLE users (
    user_id int primary key AUTO_INCREMENT,
    username varchar(12) NOT NULL UNIQUE,
    password varchar(64) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);;