backend "azurerm" {
  account_name     = azurerm_storage_account.tfstate.name
  container_name   = "tfstate"
  resource_group_name = azurerm_storage_account.tfstate.resource_group_name
}
