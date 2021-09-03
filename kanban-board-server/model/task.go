package model

type Task struct {
	Name               string
	Description        string
	CreatorUserName    string
	CreatorUserLogin   string
	PerformerUserName  string
	PerformerUserLogin string
	ProjectId          int
	ColumnName         string
	Due                string
}
