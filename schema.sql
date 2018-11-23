CREATE DATABASE wingman_db;

USE wingman_db;

CREATE TABLE user (
  user_id INT NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(100) NOT NULL,
  age TINYINT,
  gender VARCHAR(25),
  googleID VARCHAR(100) NOT NULL,
  emailAddress VARCHAR(255),
  profilePhoto TEXT,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE walk (
    walk_id INT NOT NULL AUTO_INCREMENT,
    requesterId INT,
    volunteerId INT,
    startLocation VARCHAR(255) NOT NULL,
    endLocation VARCHAR(255) NOT NULL,
    startTime DATETIME NOT NULL,
    completed BOOLEAN DEFAULT false NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY fk_user(user_id)
    REFERENCES user(user_id)
    ON DELETE CASCADE
    PRIMARY KEY (walk_id)
)