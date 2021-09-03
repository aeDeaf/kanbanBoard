package database

import (
	"fmt"
	"kanboard/model"
	"strconv"
)

func GetTaskByName(name string) model.Task {
	db = Open()
	stmt, err := db.Prepare(`
	SELECT t.name, t.description, u.name, u.login, u2.name, u2.login, p.id, c.name, t.due FROM tasks AS t 
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
	err = res.Scan(&task.Name, &task.Description, &task.CreatorUserName, &task.CreatorUserLogin,
		&task.PerformerUserName, &task.PerformerUserLogin, &task.ProjectId, &task.ColumnName,
		&task.Due)
	if err != nil {
		panic(err)
	}

	return task
}

func GetTasksByPerformerUser(login string) []model.Task {
	db = Open()
	stmt, err := db.Prepare(`
	SELECT t.name, t.description, u.name, u.login, u2.name, u2.login, p.id, c.name, t.due FROM tasks AS t 
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
		err = res.Scan(&task.Name, &task.Description, &task.CreatorUserName, &task.CreatorUserLogin,
			&task.PerformerUserName, &task.PerformerUserLogin, &task.ProjectId, &task.ColumnName,
			&task.Due)
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
	SELECT t.name, t.description, u.name, u.login, u2.name, u2.login, p.id, c.name, t.due FROM tasks AS t 
    	JOIN users u on t.creator_user_id = u.id 
    	LEFT JOIN users u2 on t.performer_user_id = u2.id 
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
		fmt.Println("Error while getting tasks. \n" + err.Error())
	}
	Close()

	var tasks []model.Task

	for res.Next() {
		taskDB := model.TaskDB{}
		err = res.Scan(&taskDB.Name, &taskDB.Description, &taskDB.CreatorUserName, &taskDB.CreatorUserLogin,
			&taskDB.PerformerUserName, &taskDB.PerformerUserLogin, &taskDB.ProjectId, &taskDB.ColumnName,
			&taskDB.Due)
		if err != nil {
			panic(err)
		}
		performerUserName := taskDB.PerformerUserName.String
		performerUserLogin := taskDB.PerformerUserLogin.String
		due := taskDB.Due.String
		task := model.Task{Name: taskDB.Name, Description: taskDB.Description, CreatorUserName: taskDB.CreatorUserName,
			CreatorUserLogin: taskDB.CreatorUserLogin, PerformerUserName: performerUserName,
			PerformerUserLogin: performerUserLogin, ProjectId: taskDB.ProjectId,
			ColumnName: taskDB.ColumnName, Due: due}
		tasks = append(tasks, task)
	}

	return tasks
}

func GetTasks() []model.Task {
	db := Open()
	res, err := db.Query(`
	SELECT t.name, t.description, u.name, u.login, u2.name, u2.login, p.id, c.name, t.due FROM tasks AS t 
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
		taskDB := model.TaskDB{}
		err = res.Scan(&taskDB.Name, &taskDB.Description, &taskDB.CreatorUserName, &taskDB.CreatorUserLogin,
			&taskDB.PerformerUserName, &taskDB.PerformerUserLogin, &taskDB.ProjectId, &taskDB.ColumnName,
			&taskDB.Due)
		if err != nil {
			panic(err)
		}
		performerUserName := taskDB.PerformerUserName.String
		performerUserLogin := taskDB.PerformerUserLogin.String
		due := taskDB.Due.String
		task := model.Task{Name: taskDB.Name, Description: taskDB.Description, CreatorUserName: taskDB.CreatorUserName,
			CreatorUserLogin: taskDB.CreatorUserLogin, PerformerUserName: performerUserName,
			PerformerUserLogin: performerUserLogin, ProjectId: taskDB.ProjectId,
			ColumnName: taskDB.ColumnName, Due: due}
		tasks = append(tasks, task)
	}

	return tasks
}

func CreateTask(task model.Task) {
	db := Open()
	stmt, err := db.Prepare(`
	INSERT INTO main.tasks (name, description, creator_user_id, performer_user_id, project_id, column_id, due)
	VALUES (?, ?, (SELECT id FROM main.users WHERE login=?), (SELECT id FROM main.users WHERE login=?),
	         ?, 1, ?)
	`)

	if err != nil {
		panic(err)
	}

	res, err := stmt.Exec(task.Name, task.Description, task.CreatorUserLogin, task.PerformerUserLogin, task.ProjectId,
		task.Due)
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
	                      project_id=?, 
	                      column_id=(SELECT id FROM main.columns WHERE name=?) 
	WHERE id=?
	`)
	if err != nil {
		panic(err)
	}

	res, err := stmt.Exec(task.Description, task.CreatorUserLogin, task.PerformerUserLogin, task.ProjectId,
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
