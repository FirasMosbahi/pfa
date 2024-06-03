provider "azurerm" {
  features {}
}

terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "~>2.0"
    }
  }
  backend "azurerm" {
        resource_group_name  = "tfstate"
        storage_account_name = "tfstate-storage-account"
        container_name       = "tfstate"
        key                  = "terraform.tfstate"
    }
}