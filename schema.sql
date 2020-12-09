DROP DATABASE IF EXISTS tracker;

CREATE DATABASE tracker;

USE tracker;

CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL 
, name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL
, title VARCHAR(30) NOT NULL
, salary DECIMAL NOT NULL
, department_id INT NOT NULL
);

CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL
, first_name VARCHAR(30) NOT NULL
, last_name VARCHAR(30) NOT NULL
, role_id INT NOT NULL
, manager_id INT NULL
);


INSERT INTO department (name)
VALUES ("Merchandising");

INSERT INTO roles (title, salary, department_id)
VALUES ("Associate Merchandiser", 37000 , 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kaylee", "Horner", 1, 1);