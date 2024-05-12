FROM python:3.9-alpine

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN ["touch" , ".env"]

RUN ["echo", "PORT=$PORT" ,">>", ".env"]

RUN ["echo", "MONGODB_DATABASE=$MONGODB_DATABASE", ">>", ".env"]

RUN ["echo", "MONGODB_URI=$MONGODB_URI", ">>", ".env"]

RUN ["echo" ,"JWT_SECRET=$JWT_SECRET", ">>" ,".env"]

RUN ["echo" ,"PRODUCT_MS_URL=$PRODUCT_MS_URL", ">>" ,".env"]

EXPOSE 5001

CMD ["python", "main.py"]