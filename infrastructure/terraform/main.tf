# main.tf

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1" # You can change this to your preferred region
  access_key = ""
  secret_key = ""
}

# Data source to get available Availability Zones in the region
data "aws_availability_zones" "available" {}

# Define a new VPC for our EKS cluster for proper isolation
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.2"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs             = data.aws_availability_zones.available.names
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  enable_dns_hostnames = true

  tags = {
    "Terraform" = "true"
    "Environment" = "dev"
  }
}

# Define the EKS cluster using the official AWS module
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.35.0"

  cluster_name    = "my-app-dev"
  cluster_version = "1.33"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true


  # Define the worker nodes
  eks_managed_node_groups = {
    general = {
      name           = "general-purpose"
      instance_types = ["t2.micro"] # A cost-effective instance type
      min_size       = 2
      max_size       = 3
      desired_size   = 2
    }
  }

  tags = {
    "Terraform" = "true"
    "Environment" = "dev"
  }
}

