package handlers

import (
	"awesomeProject/config"
	"awesomeProject/models"
	"awesomeProject/utils"
	"context"
	"errors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	//"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = string(hashedPassword)

	client, _ := utils.ConnectDb()

	db := client.Database(config.DBName)

	collection := db.Collection("users")

	searchedUser := models.User{}

	error := collection.FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&searchedUser)

	if searchedUser.Email != "" || (error != nil && !errors.Is(error, mongo.ErrNoDocuments)) {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		return
	}

	_, err = collection.InsertOne(context.Background(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error has occured"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func Login(c *gin.Context) {
	var loginInput models.LoginInput
	if err := c.BindJSON(&loginInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User

	client, _ := utils.ConnectDb()

	db := client.Database(config.DBName)

	collection := db.Collection("users")

	err := collection.FindOne(context.Background(), bson.M{"email": loginInput.Email}).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user"})
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginInput.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	access_token, jwt_err := utils.GenerateJWTToken(user.ID)

	if jwt_err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": jwt_err})
		return
	}

	c.JSON(http.StatusOK, gin.H{"access_token": access_token})
}
