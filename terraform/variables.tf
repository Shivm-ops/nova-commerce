# variables.tf - The Settings for our Infrastructure

variable "aws_region" {
  description = "The AWS region to deploy to"
  type        = string
  default     = "ap-south-1" # Mumbai
}

variable "instance_type" {
  description = "The size of the EC2 instance"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "The name of your SSH key in AWS"
  type        = string
  default     = "nova-key"
}

variable "ubuntu_ami" {
  description = "The AMI ID for Ubuntu 22.04 in Mumbai"
  type        = string
  default     = "ami-0824445bc4bd4e528"
}

variable "db_username" {
  description = "Database administrator username"
  type        = string
  default     = "dbadmin"
}

variable "db_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
  default     = "NovaCommerce2024!" # Change this for production
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "nova_commerce"
}
