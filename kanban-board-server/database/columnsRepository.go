package database

func GetColumns() []string {
	db = Open()
	res, err := db.Query(`SELECT name FROM main.columns`)
	if err != nil {
		panic(err)
	}

	var columns []string

	for res.Next() {
		var column string
		err := res.Scan(&column)
		if err != nil {
			panic(err)
		}
		columns = append(columns, column)
	}
	return columns
}
