package database

import (
	"fmt"
	"kanboard/model"
	"strconv"
)

func GetProjects() []model.Project {
	db = Open()
	res, err := db.Query(`
	SELECT p.id, p.name, p.description, u.name, u.login FROM main.projects AS p
    	JOIN users u on p.manager_id = u.id
	`)
	Close()
	if err != nil {
		panic(err)
	}

	var projects []model.Project

	for res.Next() {
		project := model.Project{}
		err := res.Scan(&project.Id, &project.Name, &project.Description, &project.ManagerName, &project.ManagerLogin)
		if err != nil {
			panic(err)
		}
		projects = append(projects, project)
	}
	return projects
}

func GetProjectById(id int) model.Project {
	db = Open()
	stmt, err := db.Prepare(`
	SELECT p.id, p.name, description, u.name, u.login FROM main.projects AS p
    	JOIN users u on p.manager_id = u.id
    WHERE p.id=?
    `)

	if err != nil {
		panic(err)
	}
	res := stmt.QueryRow(id)
	Close()
	project := model.Project{}
	err = res.Scan(&project.Id, &project.Name, &project.Description, &project.ManagerName, &project.ManagerLogin)
	if err != nil {
		return model.Project{}
	}

	return project
}

func CreateProject(project model.Project) {
	db = Open()
	stmt, err := db.Prepare(`
	INSERT INTO main.projects (name, description, manager_id) VALUES 
		(?, ?, (SELECT id FROM main.users WHERE login=?))
	`)

	if err != nil {
		panic(err)
	}

	res, err := stmt.Exec(project.Name, project.Description, project.ManagerLogin)
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
