provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name   = var.resource_group_name
    storage_account_name  = azurerm_storage_account.tfstate.name
    container_name        = azurerm_storage_container.tfstate.name
    key                   = "terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.54.0"
    }
  }
}