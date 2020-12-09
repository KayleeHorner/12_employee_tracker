USE tracker; 

INSERT INTO department (name)
VALUES ("Merchandising");

INSERT INTO role (title, salary, department_id)
VALUES ("Associate Merchandiser", 37000 , 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kaylee", "Horner", 1, 1);