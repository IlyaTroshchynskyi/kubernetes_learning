build_app:
	docker build -t app2:latest .


run_app_docker:
	docker run -p 8020:8020 app2:latest

tag:
	docker tag app2:latest ilya0108/app2:latest

push:
	docker push ilya0108/app2:latest