from pymongo import MongoClient
from load_env import mongodb_uri,mongodb_database

client = MongoClient(mongodb_uri)  # Replace with your connection URI
db = client[mongodb_database]  # Replace with your database name
collection = db["purchases"]  # Replace with your collection name
