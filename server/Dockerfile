# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install git and ca-certificates
RUN apk add --no-cache git ca-certificates tzdata

# Copy all source code first
COPY . .

# Initialize and download dependencies
RUN go mod tidy

# Build the application binaries
RUN CGO_ENABLED=0 GOOS=linux go build -o api ./cmd/api
RUN CGO_ENABLED=0 GOOS=linux go build -o migrate ./cmd/migrate

# Final stage
FROM alpine:latest

WORKDIR /root/

# Copy certificates
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo

# Copy binaries and migration files
COPY --from=builder /app/api .
COPY --from=builder /app/migrate .
COPY --from=builder /app/migrations ./migrations

# Expose port
EXPOSE 8080

# Run the application
CMD ["./api"]
