from pymongo import MongoClient

client = MongoClient("mongodb+srv://firasmosbehi:firas@cluster0.br9usu1.mongodb.net")  # Replace with your connection URI
db = client["commerce"]  # Replace with your database name
collection = db["purchases"]  # Replace with your collection name
