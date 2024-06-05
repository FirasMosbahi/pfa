package handlers

import (
	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Auth microservice is up and running for demo"})
}
