package model

import "database/sql"

type TaskDB struct {
	Name               string
	Description        string
	CreatorUserName    string
	CreatorUserLogin   string
	PerformerUserName  sql.NullString
	PerformerUserLogin sql.NullString
	ProjectId          int
	ColumnName         string
	Due                sql.NullString
}
