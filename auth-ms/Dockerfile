FROM golang:latest

WORKDIR /app

COPY . .

RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o main .
EXPOSE 8080

CMD ["./main"]
