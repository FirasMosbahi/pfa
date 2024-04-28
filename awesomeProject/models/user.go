package models

type User struct {
	ID       string `bson:"_id,omitempty"`
	Email    string `bson:"email" json:"email" binding:"required"`
	Password string `bson:"password" json:"password"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
