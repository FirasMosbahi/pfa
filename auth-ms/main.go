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

	router.GET("/healthCheck" , func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Auth microservice is up and running"})
	})

	log.Fatal(router.Run(":8080")) // Replace with your desired port
}
