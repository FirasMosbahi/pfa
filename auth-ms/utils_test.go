package main

import (
	"awesomeProject/models"
	"awesomeProject/utils"
	"github.com/golang-jwt/jwt/v4"
	"testing"

	"awesomeProject/config"
)

func TestGenerateJWTToken(t *testing.T) {
	// Define a mock secret key
	mockSecretKey := "secret"
	config.JWTSecret = mockSecretKey
	
	// Define a test user ID
	testUserID := "user123"

	// Call the function to generate the token
	tokenString, _ := utils.GenerateJWTToken(testUserID)

	jwtClaim := models.JWTToken{}

	_, _ = jwt.ParseWithClaims(tokenString, &jwtClaim, func(token *jwt.Token) (interface{}, error) {
		return "secret", nil
	})

	if jwtClaim.ID != "user123" {
		t.Errorf("token mismatch")
	}

}
