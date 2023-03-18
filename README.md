# Edamame

## Prerequisites

In order to run `edamame`, you will need the following:

- An [AWS Account](https://docs.aws.amazon.com/SetUp/latest/UserGuide/setup-prereqs-instructions.html).
- The [AWS CLI tool](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) should be installed and configured.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), a command line tool for working with Kubernetes clusters, should be installed (ensure you have v. 1.14 or greater which supports Kustomization files).
- [`eksctl`](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html), a command line tool for working with EKS clusters, should be installed.
- [`Make`](https://www.gnu.org/software/make/), a build automation tool used to build executable programs and libraries from source code
- [`Go`](https://go.dev/doc/install),the programming language used by K6.

## Installation

- Clone the repository
- In the root directory, run the command `npm install` followed by the command `npm link`.

## Commands

### edamame init

Usage: `edamame init`
Outputs:

```
[06:57:41:533] ℹ Creating Edamame cluster... (this may take up to 20 minutes)
[07:17:37:273] ✔ Successfully created Edamame cluster.
[07:17:37:273] ℹ Configuring EBS credentials...
[07:18:17:884] ✔ Successfully configured EBS credentials.
Please enter a password to associate with your Edamame Grafana dashboard & Postgres database account.
Password: {password}
Password for PG & Grafana has been set as:
{password}
[07:18:23:735] ℹ Deploying Grafana, Postgres, & K6 Operator...
[07:19:13:287] ℹ Please find your Grafana dashboard at: a0423fc7c84b24a7696178bc915f9fb0-1778855885.us-west-2.elb.amazonaws.com:3000
[07:19:13:287] ✔ Cluster configured. Welcome to Edamame!
```

- Creates an EKS cluster using the associated AWS account (~15 mins)
- Configures the permissions and credentials needed to manage that cluster.
- Sets up the k6 operator that will manage the distributed load test
- Sets up the database
- Sets up Grafana, which will be used to visualize load test metrics.
- Provides an external link the user can use to access the Grafana dashboard via the browser.

**Notes**:

- It can as long as _20 minutes_ to create the cluster and apply the necessary permissions.
- To access the Grafana dashboards, use the provided link. For now, the default Grafana username and password are used (`admin` and `admin`). In Grafana, navigate to the Dashboards, and select the `testid` for the data you wish to view. If no tests have been run, you may see an error, until there are test ids in the database to display.

### edamame run

Usage: `edamame run {/path/to/test.js}`
Outputs:

```
[07:24:33:021] ℹ Reading test script...
[07:24:33:027] ✔ Successfully read test script.
[07:24:33:027] ℹ Initializing load test with 3 nodes...
[07:25:11:079] ✔ Successfully initialized load test.
[07:25:11:080] ℹ Running load test...
[07:28:12:527] ✔ Load test completed.
[07:28:12:527] ℹ Tearing down load generating resources.
[07:28:48:630] ✔ Successfully removed load generating resources from cluster.
```

- Automatically scales cluster nodes to handle the amount of VUs specified in the test file
- Runs the test
- Automatically removes load generating nodes and scales down the cluster once test is completed.

**Notes**:

- The command takes the relative path of the test script you want to run. This should be written in JavaScript, and follow conventions of k6 testing scripts. See [here](https://k6.io/docs/examples/) for examples and tutorials on how to write a k6 test script.
- `edamame` will read the max number of VUs directly from the provided test script, there is no need to provide this as additional argument to `edamame run`. To see how to specify number of VUs in the test script, see the [k6 documentation](https://k6.io/docs/get-started/running-k6/#using-options).
- To run a sample test, use one of the sample test files provided in the `k6_tests` directory. For example, `./k6_tests/test1.js` (relative path specified from the root project directory).
- To see data displayed in real time, select an "auto-refresh" rate of `5s` in the Grafana dashboard, and select the `testid` for the currently running test.

### edamame stop

Usage: `edamame stop`
Outputs:

```
[03:34:20:399] ℹ Stopping current test...
[03:34:53:785] ✔ Stopped current test.
```

- Immediately stops the currently running test
- Removes load generating nodes

### edamame get

Usage: `edamame get`
Outputs:

```
[08:44:25:886] ℹ Retrieving all test ids...
[08:44:31:016] ✔ successfully retrieved all test ids!
[{"id":1},{"id":2},{"id":3}]
```

- Retrieves all the ids for tests that have been run in JSON format.

**Note**: In the future, the availability of this command and the format of the return value may change. We'd like to have tests identifiable by some user-specified custom name.

### edamame grafana

Usage: `edamame grafana`
Outputs:

```
[07:31:01:842] ℹ Configuring local access to grafana dashboard...
[07:31:34:711] ✔ Please find your Grafana dashboard at: http://localhost:3000

```

- Provides local access to the grafana dashboard.

**Note**: If you enter `CTRL+C` in the terminal after running edamame grafana, that will end your local access to the dashboard. To run a test while maintaining access to the grafana dashboard, please open a new terminal and execute `edamame run {/path/to/test.js}`

### edamame teardown

Usage: `edamame teardown`
Outputs:

```
[07:58:47:060] ℹ Tearing Down Edamame Cluster...
[08:10:11:675] ✔ Deleted Edamame Cluster
```

- Removes database, Grafana, and k6 operator from EKS cluster.
- Deletes EKS cluster.
- Deletes associated EBS volumes requisitioned by EKS cluster.

**Notes**:

- Because this command will delete the entire cluster, it will also _delete all data_. In order to maintain historical data, the cluster must remain up. In the future, we will be providing an additional command to export data, so that it is not lost when the cluster is deleted.
- The process of deleting a cluster can take 10-15 mins.
- If you try to create a new cluster directly after deleting a cluster, you may run into errors. This is because AWS continues to remove resources associated with the EKS cluster for up to 10 minutes after the command completes. Try waiting for a little while, and seeing if that fixes the problem.
