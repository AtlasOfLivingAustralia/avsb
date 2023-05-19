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

async function dataResource(id: string): Promise<DataResource> {
  return (await fetch(`${import.meta.env.VITE_API_COLLECTORY}/dataResource/${id}`)).json();
}

export default {
  dataResource,
};

export type { DataResource };
