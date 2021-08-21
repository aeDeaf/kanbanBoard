package database

import (
	"fmt"
	"kanboard/model"
	"strconv"
)

func GetTaskByName(name string) model.Task {
	db = Open()
	stmt, err := db.Prepare(`
	SELECT t.name, t.description, u.name, u2.name, p.name, c.name FROM tasks AS t 
    	JOIN users u on t.creator_user_id = u.id JOIN users u2 on t.performer_user_id = u2.id 
    	JOIN projects p on p.id = t.project_id JOIN columns c on c.id = t.column_id 
	WHERE t.name=?;
	`)

	if err != nil {
		panic(err)
	}
	fmt.Println(name)
	res := stmt.QueryRow(name)
	Close()

	task := model.Task{}
	err = res.Scan(&task.Name, &task.Description, &task.CreatorUser, &task.PerformerUser, &task.ProjectName,
		&task.ColumnName)
	if err != nil {
		panic(err)
	}

	return task
}

func GetTasksByPerformerUser(login string) []model.Task {
	db = Open()
	stmt, err := db.Prepare(`
	SELECT t.name, t.description, u.name, u2.name, p.name, c.name FROM tasks AS t 
    	JOIN users u on t.creator_user_id = u.id JOIN users u2 on t.performer_user_id = u2.id 
    	JOIN projects p on p.id = t.project_id 
    	JOIN columns c on c.id = t.column_id WHERE u2.login=?;
	`)

	if err != nil {
		panic(err)
	}
	fmt.Println(login)
	res, err := stmt.Query(login)
	if err != nil {
		panic(err)
	}
	Close()

	var tasks []model.Task

	for res.Next() {
		task := model.Task{}
		err = res.Scan(&task.Name, &task.Description, &task.CreatorUser, &task.PerformerUser, &task.ProjectName,
			&task.ColumnName)
		if err != nil {
			panic(err)
		}
		tasks = append(tasks, task)
	}

	return tasks
}

func GetTasksByProjectId(id int) []model.Task {
	db = Open()
	stmt, err := db.Prepare(`
	SELECT t.name, t.description, u.name, u2.name, p.name, c.name FROM tasks AS t 
    	JOIN users u on t.creator_user_id = u.id 
    	JOIN users u2 on t.performer_user_id = u2.id 
    	JOIN projects p on p.id = t.project_id 
    	JOIN columns c on c.id = t.column_id 
	WHERE p.id=?;
	`)

	if err != nil {
		panic(err)
	}
	fmt.Println(id)
	res, err := stmt.Query(id)
	if err != nil {
		panic(err)
	}
	Close()

	var tasks []model.Task

	for res.Next() {
		task := model.Task{}
		err = res.Scan(&task.Name, &task.Description, &task.CreatorUser, &task.PerformerUser, &task.ProjectName,
			&task.ColumnName)
		if err != nil {
			panic(err)
		}
		tasks = append(tasks, task)
	}

	return tasks
}

func GetTasks() []model.Task {
	db := Open()
	res, err := db.Query(`
	SELECT t.name, t.description, u.name, u2.name, p.name, c.name FROM tasks AS t
	    JOIN users u on t.creator_user_id = u.id
	    JOIN users u2 on t.performer_user_id = u2.id
	    JOIN projects p on p.id = t.project_id
	    JOIN columns c on c.id = t.column_id;
	    `)
	Close()

	if err != nil {
		panic(err)
	}

	var tasks []model.Task

	for res.Next() {
		task := model.Task{}
		err = res.Scan(&task.Name, &task.Description, &task.CreatorUser, &task.PerformerUser, &task.ProjectName,
			&task.ColumnName)
		if err != nil {
			panic(err)
		}
		tasks = append(tasks, task)
	}

	return tasks
}

func CreateTask(task model.Task) {
	db := Open()
	stmt, err := db.Prepare(`
	INSERT INTO main.tasks (name, description, creator_user_id, performer_user_id, project_id, column_id)
	VALUES (?, ?, (SELECT id FROM main.users WHERE login=?), (SELECT id FROM main.users WHERE login=?),
	         (SELECT id FROM main.projects WHERE name=?), 1)
	`)

	if err != nil {
		panic(err)
	}

	res, err := stmt.Exec(task.Name, task.Description, task.CreatorUser, task.PerformerUser, task.ProjectName)
	Close()
	if err != nil {
		panic(err)
	}
	affected, err := res.RowsAffected()

	if err != nil {
		panic(err)
	}
	fmt.Println("Affected: " + strconv.FormatInt(affected, 10) + " rows")
}

func UpdateTask(task model.Task) {
	db := Open()
	stmt, err := db.Prepare("SELECT id FROM main.tasks WHERE name=?")

	if err != nil {
		panic(err)
	}

	row := stmt.QueryRow(task.Name)
	id := -1
	err = row.Scan(&id)
	if err != nil {
		panic(err)
	}

	if id == -1 {
		fmt.Println("No such task with name: " + task.Name)
		return
	}

	stmt, err = db.Prepare(`
	UPDATE main.tasks SET 
	                      description=?, 
	                      creator_user_id=(SELECT id FROM main.users WHERE login=?), 
	                      performer_user_id=(SELECT id FROM main.users WHERE login=?), 
	                      project_id=(SELECT id FROM main.projects WHERE name=?), 
	                      column_id=(SELECT id FROM main.columns WHERE name=?) 
	WHERE id=?
	`)
	if err != nil {
		panic(err)
	}

	res, err := stmt.Exec(task.Description, task.CreatorUser, task.PerformerUser, task.ProjectName,
		task.ColumnName, id)

	if err != nil {
		panic(err)
	}
	affected, err := res.RowsAffected()

	fmt.Println("Affected: " + strconv.FormatInt(affected, 10) + " rows")
	Close()
}

func DeleteTask(name string) {
	db := Open()
	stmt, err := db.Prepare("DELETE FROM main.tasks WHERE name=?")
	if err != nil {
		panic(err)
	}

	res, err := stmt.Exec(name)
	Close()

	if err != nil {
		panic(err)
	}

	affected, err := res.RowsAffected()
	fmt.Println("Affected: " + strconv.FormatInt(affected, 10) + " rows")
}
