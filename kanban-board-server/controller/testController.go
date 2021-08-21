package controller

import (
	"kanboard/utils"
	"net/http"
)

var Test = func(w http.ResponseWriter, r *http.Request) {
	resp := utils.Message(true, "hui")
	resp["data"] = "HUI"
	utils.Respond(w, resp)
}
