from dotenv import load_dotenv
from os import getenv

load_dotenv()
port = getenv('PORT')
mongodb_uri = getenv('MONGODB_URI')
mongodb_database = getenv('MONGODB_DATABASE')
productMsUrl = getenv('PRODUCT_MS_URL')
jwtSecret = getenv('JWT_SECRET')