<h2>A complete CI/CD pipeline for a microservices application</h2>
<h3>The application consists of :</h3>
<table>
<thead>
<td>Microservice</td>
<td>Role</td>
<td>Technologie</td>
</thead>
<tr>
<td>Auth-ms</td>
<td>Authentification</td>
<td>Gin , Golang</td>
</tr>
<tr>
<td>Products-ms</td>
<td>Lists the categories and products</td>
<td>Nest.js</td>
</tr>
<tr>
<td>purchase-ms</td>
<td>Make purchases</td>
<td>Flask.py</td>
</tr>
</table>
<img src="readme/img.png">
<br/><br/>
<h2>The CI/CD pipeline consists of :</h2>
<ul>
<li>CI workflow for each microservice</li>
<li>unified CD workflow</li>
</ul>
<br/>
<h2>Used Technologies</h2>
<table>
<thead>
<td>Technologie</td>
<td>Role</td>
</thead>
<tr>
<td>Git</td>
<td>Version Control</td>
</tr>
<tr>
<td>Github Actions</td>
<td>Workflows runner</td>
</tr>
<tr>
<td>GolangCI lint , npm , safety</td>
<td>Static tests</td>
</tr>
<tr>
<td>pyteest,gotest,jest</td>
<td>tests</td>
</tr>
<tr>
<td>Docker</td>
<td>Packaging</td>
</tr>
<tr>
<td>Trivy</td>
<td>Docker image scan</td>
</tr>
<tr>
<td>Azure container registry</td>
<td>Store docker images</td>
</tr>
<tr>
<td>Terraform</td>
<td>Provision infrastructure</td>
</tr>
<tr>
<td>Azure storage</td>
<td>Store terraform state</td>
</tr>
<tr>
<td>Kubernetes (AKS)</td>
<td>Containers orchestration</td>
</tr>
<tr>
<td>Helm</td>
<td>Kubernetes configuration</td>
</tr>
<tr>
<td>Prometheus</td>
<td>Monitoring (collecting indicators)</td>
<tr>
<td>Grafana</td>
<td>Graphic dashboards</td>
</tr>
</table>

<h2>Done with love and passion by :</h2>
<a href="https://github.com/FirasMosbahi">Mosbahi Firas</a><br/>
<a href="https://github.com/amineXguesmi">Guesmi Mohamed Amine</a><br/>
<a href="https://github.com/AzizKlai">Klai Mohamed Aziz</a><br/>