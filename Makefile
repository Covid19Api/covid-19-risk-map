.PHONY: build deploy

build:
	rm -rf ./build
	npm run-script build

deploy: build
	aws s3 sync ./build s3://covid-19-risk-map --profile covid-19-admin
