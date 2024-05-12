FROM golang:1.22.3-bookworm

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN ["go" , "mod" , "tidy"]

COPY . .

RUN ["touch" , ".env"]

RUN ["echo", "MONGODB_URI=$MONGODB_URI" ,">>", ".env"]

RUN ["echo", "JWT_SECRET=$JWT_SECRET", ">>", ".env"]

RUN ["echo" ,"DB_NAME=$DB_NAME", ">>" ,".env"]

RUN ["go", "build", "."]

EXPOSE 8080

CMD ["go" , "run" , "."]