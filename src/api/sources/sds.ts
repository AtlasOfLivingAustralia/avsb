interface SDSInstance {
  generalisation: {
    generalisation: string;
  };
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

async function getInstances(guid: string, state: string) {
  const URL = `${
    import.meta.env.VITE_API_ALA
  }/sensitive/api/report?taxonId=${guid}&stateProvince=${state}&country=AUS`;
  const { sensitive, valid, report } = await (await fetch(URL)).json();

  return valid && sensitive ? report.taxon.instances : [];
}

async function get(guid?: string): Promise<SDSInstance[]> {
  if (!guid) return [];

  // Wrap in a try-catch to handle
  try {
    return (
      await Promise.all(
        ['QLD', 'NT', 'NSW', 'WA', 'SA', 'ACT'].map((state) => getInstances(guid, state)),
      )
    ).flat();
  } catch (error) {
    return [];
  }
}

export default {
  get,
};

export type { SDSInstance };
