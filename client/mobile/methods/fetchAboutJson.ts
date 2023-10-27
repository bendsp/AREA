interface FetchAboutJsonParams {
    setServices: React.Dispatch<React.SetStateAction<never[]>>;
  }

const fetchAboutJson = async ({ setServices }: FetchAboutJsonParams) => {
    const response = await fetch('http://localhost:8080/about.json');
    const data = await response.json();

    setServices(data.server.services);
}

export default fetchAboutJson
