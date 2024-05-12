resource_group_name = "aks_terraform_rg"
location            = "West Europe"
cluster_name        = "pfaaks"
kubernetes_version  = "1.28.3"
system_node_count   = 1
node_resource_group = "aks_pfa_resources_rg"