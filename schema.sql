CREATE DATABASE wingman_db;

USE wingman_db;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(100) NOT NULL,
  age TINYINT,
  gender VARCHAR(25),
  googleID VARCHAR(100) NOT NULL,
  emailAddress VARCHAR(255),
  profilePhoto VARCHAR(20000),
  PRIMARY KEY (id)
);

CREATE TABLE walk (
    id INT NOT NULL AUTO_INCREMENT,
    requesterId INT,
    volunteerId INT,
    startLocation VARCHAR(255) NOT NULL,
    endLocation VARCHAR(255) NOT NULL,
    startTime DATETIME,
    completed BOOLEAN DEFAULT false NOT NULL,
    PRIMARY KEY (id)
)