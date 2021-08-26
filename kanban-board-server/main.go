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

	router.HandleFunc("/test", controller.Test).Methods("GET", http.MethodOptions)
	router.HandleFunc("/task/{name}", controller.GetTaskByName).Methods("GET", http.MethodOptions)
	router.HandleFunc("/task/{name}", controller.DeleteTask).Methods("DELETE", http.MethodOptions)
	router.HandleFunc("/user/{login}/performer", controller.GetTasksByPerformerUser).Methods("GET",
		http.MethodOptions)
	router.HandleFunc("/task", controller.GetTasks).Methods("GET", http.MethodOptions)
	router.HandleFunc("/task", controller.CreateTask).Methods("POST", http.MethodOptions)
	router.HandleFunc("/task", controller.UpdateTask).Methods("PUT", http.MethodOptions)

	router.HandleFunc("/project", controller.GetProjects).Methods("GET", http.MethodOptions)
	router.HandleFunc("/project/{id}", controller.GetProjectById).Methods("GET", http.MethodOptions)
	router.HandleFunc("/project", controller.CreateProject).Methods("POST", http.MethodOptions)
	router.HandleFunc("/project/{id}/task", controller.GetTasksByProjectId).Methods("GET",
		http.MethodOptions)

	router.HandleFunc("/user", controller.GetUsers).Methods("GET", http.MethodOptions)
	router.HandleFunc("/user/{login}", controller.GetUser).Methods("GET", http.MethodOptions)
	router.HandleFunc("/user/{login}/performer", controller.GetTasksByPerformerUser).Methods("GET",
		http.MethodOptions)
	router.HandleFunc("/user", controller.CreateUser).Methods("POST", http.MethodOptions)
	router.HandleFunc("/user", controller.UpdateUser).Methods(http.MethodPut, http.MethodOptions)

	router.HandleFunc("/columns", controller.GetColumns).Methods(http.MethodGet, http.MethodOptions)

	router.Use(mux.CORSMethodMiddleware(router))
	err := http.ListenAndServe(":8080", router)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Server started")
	}
}
