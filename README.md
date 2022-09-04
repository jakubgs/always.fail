# Description

A silly app for http://always.fail/ domain.

# Application

Build with:
```
yarn install
yarn build
```

# Infrastruture

Defined using [Terraform](https://www.terraform.io/) in [`infra.tf`](./infra.tf).

Create with:
```
export AWS_ACCESS_KEY_ID="ABCD1234XYZ7890"
export AWS_SECRET_ACCESS_KEY="qwer1234asdf5678zxcv7890hjlk"
terraform plan infra.tf
terraform apply infra.tf
```
