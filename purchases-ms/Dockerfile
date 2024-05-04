FROM python:3.9-alpine

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=5001 \
    MONGODB_URI=mongodb+srv://firasmosbehi:firas@cluster0.br9usu1.mongodb.net/commerce \
    MONGODB_DATABASE=commerce \
    JWT_SECRET=secret \
    PRODUCT_MS_URL=localhost:5000

EXPOSE 5001

CMD ["python", "main.py"]