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


