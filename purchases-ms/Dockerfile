# Stage 1: Build environment
FROM python:3.8-slim-buster as builder

WORKDIR /app

COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt --target=/app/.local

# Stage 2: Production environment
FROM python:3.8-slim-buster

WORKDIR /app

# Copy installed dependencies from the builder stage
COPY --from=builder /app/.local /app/.local

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PATH=/app/.local/bin:$PATH \
    PORT=5001 \
    MONGODB_URI=mongodb+srv://firasmosbehi:firas@cluster0.br9usu1.mongodb.net/commerce \
    MONGODB_DATABASE=commerce \
    JWT_SECRET=secret

EXPOSE 5001

# Run the Flask application using python main.py
CMD ["python", "main.py"]
