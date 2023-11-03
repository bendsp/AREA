interface FetchAboutJsonParams {
    setServices: React.Dispatch<React.SetStateAction<never[]>>;
  }

const fetchAboutJson = async ({ setServices }: FetchAboutJsonParams) => {
    const response = await fetch('http://10.116.120.163:8080/about.json');

    const data = await response.json();

    setServices(data.server.services);
}

export default fetchAboutJson
