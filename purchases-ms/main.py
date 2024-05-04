import requests
from flask import Flask, request, jsonify
from functools import wraps
import jwt  # Assuming you have PyJWT installed
from bson import ObjectId

import load_env
from purchases_collection import collection

app = Flask(__name__)


# Replace with a strong, random secret key

def decode_token(auth_token):
    try:
        payload = jwt.decode(auth_token, load_env.jwtSecret, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header is None:
            return jsonify({'message': 'Missing authorization header'}), 401

        if not auth_header.startswith('Bearer '):
            return jsonify({'message': 'Invalid token format'}), 401

        token = auth_header.split(' ')[1]
        payload = decode_token(token)
        if not payload:
            return payload  # Return the error response from decode_token

        # Add the decoded payload to the request context for access in routes
        request.user = payload
        return f(*args, **kwargs)

    return decorated


@app.route('/buy', methods=['POST'])
@token_required
def buy():
    user_id = request.user['id']  # Access user ID from decoded payload
    data = request.get_json()  # Get data from the request body (should be JSON)
    if not (data['productId'] and data['quantity']):
        return jsonify({'message': 'Missing data'}), 400

    response = requests.patch(f"{load_env.productMsUrl}/products/buy/{data['productId']}",
                          json={'quantity': data['quantity']})

    if response.status_code > 299:
        return jsonify({'message': 'Internal server error'}), 500

    data['userId'] = ObjectId(user_id)
    data['productId'] = ObjectId(data['productId'])
    collection.insert_one(data)
    return jsonify({"message": "purchase done successfully"})


# Other application routes (without token protection)
@app.route('/getPurchases')
@token_required
def get_purchases():
    user_id = request.user['id']

    aggregation = [
        {
            '$match': {'userId': ObjectId(user_id)}
        },
        {
            '$lookup': {
                'from': 'products', 'localField': 'productId', 'foreignField': '_id', 'as': 'productId'
            }
        },
        {
            '$addFields': {
                'productId': {'$arrayElemAt': ['$productId', 0]}
            }
        }
    ]
    cursor = collection.aggregate(aggregation)
    specific_purchase = list(cursor)

    for purchase in specific_purchase:
        purchase['_id'] = str(purchase['_id'])
        purchase['userId'] = str(purchase['userId'])
        purchase['productId']['_id'] = str(purchase['productId']['_id'])
        purchase['productId']['categoryId'] = str(purchase['productId']['categoryId'])
        purchase['userId'] = str(purchase['userId'])

    return jsonify({"messagee": specific_purchase})


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=load_env.port)  # Set debug=False for production use
