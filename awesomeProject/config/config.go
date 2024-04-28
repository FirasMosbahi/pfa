package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

var (
	MongoDBURI string
	DBName     string
	JWTSecret  string
)

func init() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}
	
	MongoDBURI = os.Getenv("MONGODB_URI")
	JWTSecret = os.Getenv("JWT_SECRET")
	DBName = os.Getenv("DB_NAME")

}
