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
    playlist_name varchar(100) primary key,
);;

-- user still need to be added, 

