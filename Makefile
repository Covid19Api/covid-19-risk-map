.PHONY: build deploy

export AWS_PROFILE=ying.wang
# Change S3 bucket URI to match the one set up in stack-params.json.
export AWS_S3_BUCKET_URI=covid19-risk-map-yingw787

check:
	echo $$(git --version)
	echo $$(aws --version)
	echo $$(make --version)

dev: check
	npm install
	npm start

build:
	rm -rf ./build
	npm run-script build

deploy: build
	aws s3 sync ./build s3://$(AWS_S3_BUCKET_URI) --profile $(AWS_PROFILE)

# Copy stack-params.example.json to stack-params.json and populate with params
# as needed.
aws-create:
	aws cloudformation create-stack --stack-name covid19-api-risk-map --template-body file://stack.yml --parameters file://stack-params.json --capabilities CAPABILITY_NAMED_IAM

aws-deploy:
	aws cloudformation deploy --stack-name covid19-api-risk-map --template-file stack.yml --capabilities CAPABILITY_NAMED_IAM

aws-terminate:
	aws cloudformation delete-stack --stack-name covid19-api-risk-map
