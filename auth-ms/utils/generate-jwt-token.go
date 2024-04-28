package utils

import (
	"awesomeProject/config"
	"awesomeProject/models"
	"github.com/golang-jwt/jwt/v4"
)

func GenerateJWTToken(id string) (string, error) {
	claims := models.JWTToken{
		ID: id,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(config.JWTSecret))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}
