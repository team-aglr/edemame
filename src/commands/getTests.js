import Spinner from "../utilities/spinner.js";
import dbApi from "../utilities/dbApi.js";

const getTests = () => {
  const spinner = new Spinner("Retrieving information about historical tests...");
  dbApi
    .getAllTests()
    .then(tests => {
      if (tests.length > 0) {
        spinner.succeed("Successfully retrieved historical test data. Test names are listed under (index).");
        dbApi.printTestDataTable(tests);
      } else {
        spinner.succeed("There is no historical test data.");
      }
    })
    .catch((err) => {
      spinner.fail(`Error retrieving historical test information: ${err}`);
    });
};

export { getTests };