package controller

import (
	"kanboard/auth"
	"kanboard/database"
	"kanboard/utils"
	"net/http"
)

var GetColumns = func(w http.ResponseWriter, r *http.Request) {
	utils.Cors(w, r)
	if r.Method == http.MethodOptions {
		return
	}
	err := auth.VerifyRequest(w, r)
	if err == nil {
		columns := database.GetColumns()
		resp := utils.Message(true, "Get columns")
		resp["columns"] = columns
		utils.Respond(w, resp)
	}
}
