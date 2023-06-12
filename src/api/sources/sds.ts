interface SDSInstance {
  locationGeneralisation: string;
  zone: {
    name: string;
    type: string;
  };
  authority: string;
  dataResourceId: string;
  category: {
    value: string;
    type: string;
  };
}

interface SDSResult {
  acceptedName: string | null;
  commonName: string | null;
  instances: SDSInstance[];
  scientificName: string;
  status: string[];
}

async function get(scientificName: string, latitude = 0, longitude = 0): Promise<SDSResult> {
  return (
    await fetch(
      `${
        import.meta.env.VITE_API_ALA
      }/sds-webapp/ws/${scientificName}/location/${latitude}/${longitude}/date/0`,
    )
  ).json();
}

export default {
  get,
};

export type { SDSInstance, SDSResult };
