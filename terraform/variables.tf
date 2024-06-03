variable "resource_group_name" {
  type        = string
  description = "RG name in Azure"
}

variable "location" {
  type        = string
  description = "Resources location in Azure"
}

variable "cluster_name" {
  type        = string
  description = "AKS name in Azure"
}

variable "kubernetes_version" {
  type        = string
  description = "Kubernetes version"
}

variable "system_node_count" {
  type        = number
  description = "Number of AKS worker nodes"
}

variable "node_resource_group" {
  type        = string
  description = "RG name for cluster resources in Azure"
  default     = "pfa-node"
}

variable "terraform_storage_name" {
  type        = string
  description = "Terraform backend storage account name"
  default     = "pfatf"
}

variable "terraform_storage_account_name" {
  type        = string
  description = "Storage account name for Terraform state"
}

variable "terraform_container_name" {
  type        = string
  description = "Container name for Terraform state"
}
