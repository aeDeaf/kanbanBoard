CREATE TABLE IF NOT EXISTS users
(
    id       INTEGER PRIMARY KEY,
    login    TEXT UNIQUE,
    password TEXT,
    name     TEXT
);

CREATE TABLE IF NOT EXISTS projects
(
    id          INTEGER PRIMARY KEY,
    name        TEXT UNIQUE,
    description TEXT,
    manager_id  INTEGER,
    FOREIGN KEY (manager_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS columns
(
    id   INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS tasks
(
    id                INTEGER PRIMARY KEY,
    name              TEXT UNIQUE,
    description       TEXT,
    creator_user_id   INTEGER,
    performer_user_id INTEGER,
    project_id        INTEGER,
    column_id         INTEGER,
    FOREIGN KEY (creator_user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (performer_user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
    FOREIGN KEY (column_id) REFERENCES columns (id) ON DELETE CASCADE
);



INSERT OR IGNORE INTO main.users (id, login, password, name)
VALUES (1, 'admin', '$2a$10$DPb81W0X2hjX7/vLbWy1PO0PG30ELloYk6HJYkQtdvO3Zbk0krZ9q', 'Admin'),
       (2, 'user1', '$2a$10$DPb81W0X2hjX7/vLbWy1PO0PG30ELloYk6HJYkQtdvO3Zbk0krZ9q', 'User 1'),
       (3, 'user2', '$2a$10$DPb81W0X2hjX7/vLbWy1PO0PG30ELloYk6HJYkQtdvO3Zbk0krZ9q', 'User 2');

INSERT OR IGNORE INTO main.projects (id, name, description, manager_id)
VALUES (1, 'Project 1', 'Project 1 description', 1),
       (2, 'Project 2', 'Project 2 description', 1),
       (3, 'Project 3', 'Project 3 description', 2);


INSERT OR IGNORE INTO main.columns (id, name)
VALUES (1, 'Backlog'),
       (2, 'WIP'),
       (3, 'In testing'),
       (4, 'Done');

INSERT OR IGNORE INTO main.tasks (id, name, description, creator_user_id, performer_user_id, project_id, column_id)
VALUES (1, 'Task 1', 'Task1 description', 1, 2, 1, 1),
       (2, 'Task 2', 'Task2 description', 1, 2, 2, 2),
       (3, 'Task 3', 'Task3 description', 1, 3, 3, 3);





