resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.cluster_name
  kubernetes_version  = var.kubernetes_version
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = var.cluster_name
  node_resource_group = var.node_resource_group

  default_node_pool {
    name                = "default"
    node_count          = var.system_node_count
    vm_size             = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    load_balancer_sku = "basic"
    network_plugin    = "kubenet"
  }
}

resource "azurerm_resource_group" "tfstate" {
  name     = "${var.terraform_storage_name}-rg"
  location = var.location
}

resource "azurerm_storage_account" "tfstate" {
  name                     = "${var.terraform_storage_name}sa"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  allow_blob_public_access = false

  tags = {
    environment = "staging"
  }
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.tfstate.name
  resource_group_name   = var.resource_group_name
  container_access_type = "private"
}
