import Spinner from "../utilities/spinner.js";
import dbApi from "../utilities/dbApi.js";

const getTest = (name) => {
  const spinner = new Spinner(`Retrieving details about the test named: '${name}'...`);
  dbApi
    .getTest(name)
    .then(test => {
      if (test) {
        spinner.succeed(`Successfully retrieved data about the test named: '${name}.'`);
        dbApi.printTestDataTable([test]);
        console.log(`${" ".repeat(30)} Test script content: ${" ".repeat(30)}`);
        console.log(`${"-".repeat(83)}`);
        test.script.split("\\n").forEach(line => {
          console.log(line);
        });
      } else {
        spinner.fail(`Couldn't find data associated with the test named: '${name}'`);
      }
    })
    .catch((err) => {
      spinner.fail(`Error retrieving test details: ${err}`);
    });
};

export { getTest };