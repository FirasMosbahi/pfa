func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{"message": "Auth microservice is up and running"})
}