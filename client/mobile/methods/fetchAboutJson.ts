// Define the interface for function parameters
interface FetchAboutJsonParams {
  setServices: React.Dispatch<React.SetStateAction<any>>;
}

const fetchAboutJson = async ({ setServices }: FetchAboutJsonParams) => {
  const data = require('./about.json');  // Adjust the path to where about.json is located
  console.log(data);
  setServices(data.server.services);
}

export default fetchAboutJson;
