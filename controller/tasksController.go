package controller

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"kanboard/database"
	"kanboard/model"
	"kanboard/utils"
	"net/http"
	"strconv"
)

var GetTaskByName = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	name := params["name"]

	task := database.GetTaskByName(name)
	resp := utils.Message(true, "Get task")
	resp["task"] = task

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

var GetTasksByProjectId = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		panic(err)
	}

	task := database.GetTasksByProjectId(id)
	resp := utils.Message(true, "Get tasks for project "+strconv.Itoa(id))
	resp["task"] = task

	utils.Respond(w, resp)
}

var GetTasks = func(w http.ResponseWriter, r *http.Request) {
	tasks := database.GetTasks()

	resp := utils.Message(true, "Get tasks")
	resp["tasks"] = tasks

	utils.Respond(w, resp)
}

var CreateTask = func(w http.ResponseWriter, r *http.Request) {
	task := &model.Task{}

	err := json.NewDecoder(r.Body).Decode(task)

	if err != nil {
		panic(err)
	}

	database.CreateTask(*task)
}

var UpdateTask = func(w http.ResponseWriter, r *http.Request) {
	task := &model.Task{}

	err := json.NewDecoder(r.Body).Decode(task)

	if err != nil {
		panic(err)
	}

	database.UpdateTask(*task)
}

var DeleteTask = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	name := params["name"]

	database.DeleteTask(name)

	utils.Respond(w, utils.Message(true, name+" deleted"))
}
