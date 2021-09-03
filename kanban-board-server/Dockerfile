FROM golang:latest
RUN mkdir /app
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev
ADD . /app/
WORKDIR /app
RUN go build -o main
RUN cat data.sql
RUN cat data.sql | sqlite3 database.db
EXPOSE 8080
CMD ["/app/main"]