backend "azurerm" {
  resource_group_name  = "pfa"
  storage_account_name = "tfstatepfa"
  container_name       = "tfstate"
  key                  = "terraform.tfstate"
}