package controller

import (
	"kanboard/utils"
	"net/http"
)

var Test = func(w http.ResponseWriter, r *http.Request) {
	utils.Cors(w, r)
	if r.Method == http.MethodOptions {
		return
	}
	resp := utils.Message(true, "hui")
	resp["data"] = "HUI"
	utils.Respond(w, resp)
}
