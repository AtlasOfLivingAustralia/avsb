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

async function get(
  scientificName: string,
  latitude?: number,
  longitude?: number,
  date?: string,
): Promise<SDSResult> {
  let URL = `${import.meta.env.VITE_API_ALA}/sds-webapp/ws/${scientificName}`;

  // Append optional lat/lng parameters
  if (latitude !== undefined && longitude !== undefined)
    URL += `/location/${latitude}/${longitude}`;

  // Append optional date parameters
  if (date !== undefined) URL += `/date/${date}`;

  // Wrap in a try-catch to handle
  try {
    const data = await (await fetch(URL)).json();
    if (!data.instances) throw new Error('Invalid request');
    return data;
  } catch (error) {
    return { acceptedName: null, commonName: null, scientificName: '', status: [], instances: [] };
  }
}

export default {
  get,
};

export type { SDSInstance, SDSResult };
