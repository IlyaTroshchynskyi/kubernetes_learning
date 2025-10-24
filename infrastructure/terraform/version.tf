terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      # The official EKS module requires version 5.x of the AWS provider.
      # This line ensures you use a compatible version.
      version = "~> 5.0"
    }
  }
}