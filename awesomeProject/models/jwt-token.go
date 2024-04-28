package models

import (
	"github.com/golang-jwt/jwt/v4"
)

type JWTToken struct {
	jwt.StandardClaims

	ID string `json:"id"`
}
