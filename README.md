# Kubernetes learning

## Description

This service responsible for:

- Reading commands
- 
## Main Tools

- Kubernetes

## Setup

1. Copy dist.env to .env
4. Run `docker-compose -f docker-compose.prod.yaml up --build`
5. Go to page http://127.0.0.1:9001/login
   Default credentials are:  
    `username: access_key`  
    `password: secret_key`

- Run command for local development
  ```shell
  source $(poetry env info --path)/bin/activate
  python ./scripts/fill_parameters_command.py
  ```

# Running in Minikube

## Steps

1. Start Minikube:
   ```
   minikube start
   ```

2. Check existing Helm releases:
   ```
   helm list
   ```

3. If you see `INSTALLATION FAILED: cannot re-use a name that is still in use`, uninstall the existing release:
   ```
   helm uninstall my-testa-app
   ```

4. Install the Helm chart:
   ```
   helm install my-testa-app ./my-testa-app -f ./my-testa-app/dev_values.yaml
   ```

   Or, to upgrade an existing release:
   ```
   helm upgrade my-testa-app ./my-testa-app -f ./my-testa-app/dev_values.yaml
   ```

5. Verify deployment:
   ```
   kubectl get pods
   kubectl get svc
   ```

## Troubleshooting

- If you get the error about re-using a name, always check for existing releases and uninstall or upgrade as needed.
