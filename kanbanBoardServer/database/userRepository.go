package database

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"kanboard/model"
	"strconv"
)

func GetUsers() []model.User {
	db = Open()
	res, err := db.Query(`SELECT login, password, name FROM main.users`)
	Close()

	if err != nil {
		panic(err)
	}

	var users []model.User

	for res.Next() {
		user := model.User{}
		err := res.Scan(&user.Login, &user.Password, &user.Name)
		if err != nil {
			panic(err)
		}
		users = append(users, user)
	}

	return users
}

func GetUserByLogin(login string) model.User {
	db = Open()
	stmt, err := db.Prepare(`SELECT login, password, name FROM main.users WHERE login=?`)

	if err != nil {
		panic(err)
	}
	res := stmt.QueryRow(login)
	Close()
	user := model.User{}
	err = res.Scan(&user.Login, &user.Password, &user.Name)
	if err != nil {
		panic(err)
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
