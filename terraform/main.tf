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
#    type                = "VirtualMachineScaleSets"
#    enable_auto_scaling = false
  }

  identity {
    type = "SystemAssigned"
  }


  network_profile {
    load_balancer_sku = "basic"
    network_plugin    = "kubenet"
  }
}