package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"kanboard/controller"
	"net/http"
)

func main() {
	fmt.Println("App started")

	router := mux.NewRouter()

	router.HandleFunc("/test", controller.Test).Methods("GET")
	router.HandleFunc("/task/{name}", controller.GetTaskByName).Methods("GET")
	router.HandleFunc("/task/{name}", controller.DeleteTask).Methods("DELETE")
	router.HandleFunc("/user/{login}/performer", controller.GetTasksByPerformerUser).Methods("GET")
	router.HandleFunc("/task", controller.GetTasks).Methods("GET")
	router.HandleFunc("/task", controller.CreateTask).Methods("POST")
	router.HandleFunc("/task", controller.UpdateTask).Methods("PUT")

	router.HandleFunc("/project", controller.GetProjects).Methods("GET")
	router.HandleFunc("/project/{id}", controller.GetProjectById).Methods("GET")
	router.HandleFunc("/project", controller.CreateProject).Methods("POST")
	router.HandleFunc("/project/{id}/task", controller.GetTasksByProjectId).Methods("GET")

	err := http.ListenAndServe(":8080", router)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Server started")
	}
}
