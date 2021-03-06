package controller

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"kanboard/auth"
	"kanboard/database"
	"kanboard/model"
	"kanboard/utils"
	"net/http"
	"strconv"
)

var GetProjects = func(w http.ResponseWriter, r *http.Request) {
	utils.Cors(w, r)
	if r.Method == http.MethodOptions {
		return
	}
	err := auth.VerifyRequest(w, r)
	if err == nil {
		projects := database.GetProjects()
		resp := utils.Message(true, "Get all projects")
		resp["projects"] = projects
		utils.Respond(w, resp)
	}
}

var GetProjectById = func(w http.ResponseWriter, r *http.Request) {
	utils.Cors(w, r)
	if r.Method == http.MethodOptions {
		return
	}
	err := auth.VerifyRequest(w, r)
	if err == nil {
		params := mux.Vars(r)
		id, err := strconv.Atoi(params["id"])

		if err != nil {
			panic(err)
		}

		task := database.GetProjectById(id)
		resp := utils.Message(true, "Get project: "+strconv.Itoa(id))
		resp["task"] = task

		utils.Respond(w, resp)
	}
}

var CreateProject = func(w http.ResponseWriter, r *http.Request) {
	utils.Cors(w, r)
	if r.Method == http.MethodOptions {
		return
	}
	err := auth.VerifyRequest(w, r)
	if err == nil {
		project := model.Project{}

		err := json.NewDecoder(r.Body).Decode(&project)

		if err != nil {
			panic(err)
		}

		database.CreateProject(project)

		utils.Respond(w, utils.Message(true, "Project created"))
	}
}

var GetTasksByProjectId = func(w http.ResponseWriter, r *http.Request) {
	utils.Cors(w, r)
	if r.Method == http.MethodOptions {
		return
	}
	err := auth.VerifyRequest(w, r)
	if err == nil {
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
}
