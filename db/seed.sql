INSERT INTO
    department (department_name)
VALUES
    ("Accounting"),
    ("Engineering"),
    ("Development"),
    ("Admin"),
    ("HR");

INSERT INTO
    role (title, department_id, salary)
VALUES
    ("Accounting Director", 1, 1900000),
    ("Acocounting Lead", 1, 80000),
    ("Accounting Representative", 1, 35000),
    ("Engineering Manager", 2 , 1900000),
    ("Senior Dev", 3, 75000),
    ("Junior Dev", 3, 35000),
    ("HR Manager", 5, 50000),
    ("HR Lead", 5, 70000),
    ("HR Representative", 5, 25000),
    ("Systems Analyst", 4, 100000),
    ("Quality Analyst", 4, 85000);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Josh", "Random", 1, 1),
    ("Sally", "Sue", 2, 1),
    ("Bob", "Ross", 3, 1),
    ("Rick", "Ross", 4, 4),
    ("Luke", "Skywalker", 5, 4),
    ("Antwon", "Ericson", 6, 4),
    ("Ashton", "Morty", 7, 7),
    ("Sarah", "Henderson", 8, 7),
    ("Jen", "Pickle", 9, 7),
    ("Paul", "Paulson", 10, 10),
    ("Bill", "William", 11, 10),
    ("Larry", "David", 11, 10);