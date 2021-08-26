package database

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"kanboard/model"
	"strconv"
)

func GetUsers() []model.User {
	db = Open()
	res, err := db.Query(`SELECT login, password, name, description, avatar FROM main.users`)
	Close()

	if err != nil {
		panic(err)
	}

	var users []model.User

	for res.Next() {
		user := model.User{}
		err := res.Scan(&user.Login, &user.Password, &user.Name, &user.Description, &user.Avatar)
		if err != nil {
			panic(err)
		}
		users = append(users, user)
	}

	return users
}

func GetUserByLogin(login string) model.User {
	db = Open()
	stmt, err := db.Prepare(`SELECT login, password, name, description, avatar FROM main.users WHERE login=?`)

	if err != nil {
		panic(err)
	}
	res := stmt.QueryRow(login)
	Close()
	user := model.User{}
	err = res.Scan(&user.Login, &user.Password, &user.Name, &user.Description, &user.Avatar)
	if err != nil {
		fmt.Println("Error while getting user " + login + "\n" + err.Error())
	}
	return user
}

func CreateUser(user model.User) {
	db = Open()
	stmt, err := db.Prepare(`
	INSERT INTO main.users (login, password, name) VALUES
		(?, ?, ?)
	`)

	if err != nil {
		panic(err)
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	res, err := stmt.Exec(user.Login, string(hashedPassword), user.Name)
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

func UpdateUser(user model.User) {
	db = Open()
	stmt, err := db.Prepare(`SELECT id FROM main.users WHERE login=?`)
	if err != nil {
		panic(err)
	}
	res := stmt.QueryRow(user.Login)
	var id int
	err = res.Scan(&id)
	if err != nil {
		fmt.Println("Can not find user with login " + user.Login)
		return
	}
	stmt, err = db.Prepare(`UPDATE main.users SET description=?, avatar=?`)
	if err != nil {
		panic(err)
	}
	r, err := stmt.Exec(user.Description, user.Avatar)
	Close()
	if err != nil {
		panic(err)
	}
	affected, err := r.RowsAffected()

	if err != nil {
		panic(err)
	}
	fmt.Println("Affected: " + strconv.FormatInt(affected, 10) + " rows")
}
