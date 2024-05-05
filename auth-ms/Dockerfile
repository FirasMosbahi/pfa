FROM golang:1.22.2-bookworm

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN ["go" , "mod" , "tidy"]

COPY . .

RUN ["sh", "-c", "echo", "$MONGODB_URI" ,">", ".env" ,"&&", "echo", "$JWT_SECRET", ">>", ".env" ,"&&" ,"echo" ,"$DB_NAME", ">>" ,".env"]

RUN ["go", "build", "."]

EXPOSE 8080

CMD ["go" , "run" , "."]