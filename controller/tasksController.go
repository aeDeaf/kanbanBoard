package controller

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"kanboard/auth"
	"kanboard/database"
	"kanboard/model"
	"kanboard/utils"
	"net/http"
)

var GetTaskByName = func(w http.ResponseWriter, r *http.Request) {
	err := auth.VerifyRequest(w, r)
	if err == nil {
		params := mux.Vars(r)
		name := params["name"]

		task := database.GetTaskByName(name)
		resp := utils.Message(true, "Get task")
		resp["task"] = task

		utils.Respond(w, resp)
	}
}

var GetTasks = func(w http.ResponseWriter, r *http.Request) {
	err := auth.VerifyRequest(w, r)
	if err == nil {
		tasks := database.GetTasks()

		resp := utils.Message(true, "Get tasks")
		resp["tasks"] = tasks

		utils.Respond(w, resp)
	}
}

var CreateTask = func(w http.ResponseWriter, r *http.Request) {
	err := auth.VerifyRequest(w, r)
	if err == nil {
		task := &model.Task{}

		err := json.NewDecoder(r.Body).Decode(task)

		if err != nil {
			panic(err)
		}

		database.CreateTask(*task)
	}
}

var UpdateTask = func(w http.ResponseWriter, r *http.Request) {
	err := auth.VerifyRequest(w, r)
	if err == nil {
		task := &model.Task{}

		err := json.NewDecoder(r.Body).Decode(task)

		if err != nil {
			panic(err)
		}

		database.UpdateTask(*task)
	}
}

var DeleteTask = func(w http.ResponseWriter, r *http.Request) {
	err := auth.VerifyRequest(w, r)
	if err == nil {
		params := mux.Vars(r)
		name := params["name"]

		database.DeleteTask(name)

		utils.Respond(w, utils.Message(true, name+" deleted"))
	}
}
