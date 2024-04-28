package utils

import (
	"awesomeProject/config"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDb() (*mongo.Client, error) {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(config.MongoDBURI).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.Background(), opts)
	if err != nil {
		panic(err)
	}
	//defer func() {
	//	if err = client.Disconnect(context.Background()); err != nil {
	//		panic(err)
	//	}
	//}()
	return client, err
}
