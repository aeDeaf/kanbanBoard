package controller

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"kanboard/database"
	"kanboard/model"
	"kanboard/utils"
	"net/http"
)

var GetUsers = func(w http.ResponseWriter, r *http.Request) {
	users := database.GetUsers()
	for i := 0; i < len(users); i++ {
		users[i].Password = ""
	}

	resp := utils.Message(true, "Get users")
	resp["users"] = users
	utils.Respond(w, resp)
}

var GetUser = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	login := params["login"]
	user := database.GetUserByLogin(login)
	user.Password = ""

	resp := utils.Message(true, "Get user: "+login)
	resp["user"] = user

	utils.Respond(w, resp)
}

var GetTasksByPerformerUser = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	login := params["login"]

	task := database.GetTasksByPerformerUser(login)
	resp := utils.Message(true, "Get tasks for performer user "+login)
	resp["task"] = task

	utils.Respond(w, resp)
}

var CreateUser = func(w http.ResponseWriter, r *http.Request) {
	user := model.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		panic(err)
	}
	database.CreateUser(user)

	utils.Respond(w, utils.Message(true, "User created"))
}
