package main

import (
	"awesomeProject/handlers"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {

	router := gin.Default()

	router.POST("/signup", handlers.Signup)

	router.POST("/login", handlers.Login)

	router.GET("/healthCheck" , handlers.HealthCheck)

	log.Fatal(router.Run(":8080")) // Replace with your desired port
}
