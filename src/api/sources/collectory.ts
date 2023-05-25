interface DataResource {
  name: string | null;
  acronym: string | null;
  pubShortDescription: string | null;
  pubDescription: string | null;
  websiteUrl: string | null;
  alaPublicUrl: string | null;
  logoRef: {
    uri: string | null;
  };
  institution: {
    name: string | null;
    uri: string | null;
    uid: string | null;
  };
  dateCreated: string | null;
  lastUpdated: string | null;
  licenseType: string | null;
  licenseVersion: string | null;
  citation: string | null;
}

interface DataResourceSummary {
  name: string;
  uid: string;
}

async function dataResource(id: string): Promise<DataResource> {
  return (await fetch(`${import.meta.env.VITE_API_COLLECTORY}/dataResource/${id}`)).json();
}

async function dataResourceList(): Promise<DataResourceSummary[]> {
  // Return locally stored fetch results first
  const dataResources = sessionStorage.getItem('collectory-resources');
  if (dataResources) return JSON.parse(dataResources);

  // If we don't have any results stored locally, fetch & store them
  const data = await (await fetch(`${import.meta.env.VITE_API_COLLECTORY}/dataResource`)).json();
  sessionStorage.setItem('collectory-resources', JSON.stringify(data));

  return data;
}

export default {
  dataResource,
  dataResourceList,
};

export type { DataResource };
