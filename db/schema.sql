DELETE DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE DATABASE employee_tracker; 

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (department_name)
);

CREATE TABLE current_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    current_role_id INT NOT NULL,
    manager_id INT REFERENCES employee(id),
    PRIMARY KEY (id),
    FOREIGN KEY (current_role_id) REFERENCES current_role(id)
);