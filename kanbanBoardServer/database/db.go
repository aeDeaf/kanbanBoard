package database

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func Open() *sql.DB {
	conn, err := sql.Open("sqlite3", "./database.db")

	if err != nil {
		panic(err)
	}

	db = conn
	return db
}

func Close() {
	err := db.Close()
	if err != nil {
		panic(err)
	}
}
