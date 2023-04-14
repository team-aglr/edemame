const NUM_VUS_PER_POD = 20000;
const POLL_FREQUENCY = 30000;
const DB_API_PORT = 4444;
const GRAF_PORT = 3000;
const DASHBOARD_PORT = 3001;
const PORT_FORWARD_DELAY = 3500;
const DB_API_SERVICE = "db-api-service";
const DB_API_INGRESS_NAME = "ingress-db-api";
const EXTERNAL_IP_REGEX = "amazonaws.com";
const GRAF = "grafana.yaml";
const GRAF_DS_FILE = "grafana_datasource.yaml";
const GRAF_DB_FILE = "grafana_dashboards.yaml";
const GRAF_DS = "grafana-datasources";
const GRAF_DBS = "grafana-dashboards";
const GRAF_JSON_DBS = "grafana_json_dbs";
const K6_CR_TEMPLATE = "k6_custom_resource_template.yaml";
const K6_CR_FILE = "load_test_crds/k6_crd.yaml";
const PG_SECRET_FILE = "postgres_secret.yaml";
const PG_CM = "psql-configmap";
const PG_CM_FILE = "postgres_configmap.yaml";
const PG_SS_FILE = "postgres_statefulset.yaml";
const STATSITE_FILE = "statsite_deployment.yaml";
const STATSITE_NODE_GRP = "ng-agg";
const NODE_GROUPS_TEMPLATE = "nodegroups_template.yaml";
const NODE_GROUPS_FILE = "load_test_crds/nodegroups.yaml";
const STATSITE_CM = "statsite-config";
const STATSITE_CM_FOLDER = "statsite-config";
const DB_API_FILE = "db_api_deployment.yaml";
const DB_API_ING_TEMPLATE = "db_api_ingress_template.yaml";
const DB_API_INGRESS = "db_api_ingress.yaml";
const CLUSTER_NAME = "edamame";
const LOAD_GEN_NODE_GRP = "ng-gen";
const K6_TEST_POD_REGEX = "k6-edamame-test-[0-9]{1,}";
const AWS_LBC_VERSION = "v2.4.1";
const AWS_LBC_CHART_VERSION = "1.4.1";
const EBS_CSI_DRIVER_REGEX =
  "ebs-csi-controller-sa.*AmazonEKS_EBS_CSI_DriverRole";
const AWS_LBC_CRD = `"github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"`;
const AWS_LBC_POLICY_REGEX = `arn:aws:iam::.*EdamameAWSLoadBalancerControllerIAMPolicy`;

export {
  NUM_VUS_PER_POD,
  POLL_FREQUENCY,
  PORT_FORWARD_DELAY,
  EXTERNAL_IP_REGEX,
  DB_API_SERVICE,
  DB_API_INGRESS,
  DB_API_ING_TEMPLATE,
  DB_API_INGRESS_NAME,
  PG_CM,
  GRAF,
  GRAF_DS,
  GRAF_DBS,
  GRAF_PORT,
  GRAF_DS_FILE,
  GRAF_DB_FILE,
  GRAF_JSON_DBS,
  DB_API_PORT,
  K6_CR_TEMPLATE,
  K6_CR_FILE,
  PG_SECRET_FILE,
  PG_CM_FILE,
  PG_SS_FILE,
  STATSITE_FILE,
  NODE_GROUPS_TEMPLATE,
  STATSITE_NODE_GRP,
  STATSITE_CM,
  STATSITE_CM_FOLDER,
  NODE_GROUPS_FILE,
  DB_API_FILE,
  CLUSTER_NAME,
  LOAD_GEN_NODE_GRP,
  K6_TEST_POD_REGEX,
  EBS_CSI_DRIVER_REGEX,
  AWS_LBC_CRD,
  AWS_LBC_VERSION,
  AWS_LBC_POLICY_REGEX,
  AWS_LBC_CHART_VERSION,
  DASHBOARD_PORT,
};
