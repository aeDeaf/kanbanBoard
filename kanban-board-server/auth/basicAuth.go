package auth

import (
	"fmt"
	"kanboard/database"
	"net/http"
)
import "golang.org/x/crypto/bcrypt"

func Verify(login string, password string) bool {
	user := database.GetUserByLogin(login)
	if user.Login != "" {
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
		return err == nil
	} else {
		return false
	}
}

func VerifyRequest(w http.ResponseWriter, r *http.Request) error {
	login, password, ok := r.BasicAuth()
	if ok && Verify(login, password) {
		fmt.Println("Successful auth for user: " + login)
		return nil
	} else {
		w.Header().Set("WWW-Authenticate", `Basic realm="api"`)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Returning error")
		return fmt.Errorf("authentication failed")
	}
}
