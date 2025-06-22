lint:
	ruff format
	ruff check --fix

build_app:
	docker build -t my-app:latest .


run_app_docker:
	docker run -p 8010:8010 my-app:latest

run_app:
	uvicorn app.main:app --reload --port=8000


tag:
	docker tag my-app:latest ilya0108/my-app:latest

push:
	docker push ilya0108/my-app:latest


helm_install:
	helm install $(name) infrastructure/ -f dev_values.yaml