#!/bin/bash

NAMESPACE="pfa"
TIMEOUT=3000
INTERVAL=10
START_TIME=$(date +%s)

while true; do
  ALL_READY=true

  # Check all LoadBalancer services in the specified namespace
  for svc in $(kubectl get services -n $NAMESPACE --field-selector spec.type=LoadBalancer -o jsonpath='{.items[*].metadata.name}'); do
    EXTERNAL_IP=$(kubectl get service $svc -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

    # If any service does not have an external IP, set ALL_READY to false
    if [ -z "$EXTERNAL_IP" ]; then
      ALL_READY=false
      break
    fi
  done

  # Check if all services have external IPs
  if [ "$ALL_READY" = true ]; then
    echo "All LoadBalancer services have external IPs."
    exit 0
  fi

  # Check if the timeout has been reached
  CURRENT_TIME=$(date +%s)
  ELAPSED_TIME=$((CURRENT_TIME - START_TIME))
  if [ $ELAPSED_TIME -ge $TIMEOUT ]; then
    echo "Timeout reached. Not all LoadBalancer services have external IPs."
    exit 1
  fi

  # Wait for the specified interval before checking again
  sleep $INTERVAL
done
