export interface ISprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface IPokemonSpecies {
  name: string;

  color: {
    name: string;
  };

  evolution_chain: {
    url: string;
  };

  evolves_from_species: {
    name: string;
    url: string;
  };

  gender_rate: number; // e.g: 4 out of 8

  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export interface IEvolutionChainLink {
  is_baby: boolean;
  species: {
    name: string;
  };
  evolves_to: IEvolutionChainLink[];
}
export interface IEvolutionChain {
  chain: IEvolutionChainLink;
}

export interface IPokemon {
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  sprites: ISprites;
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
  speciesData: IPokemonSpecies;
  location_area_encounters: string;
  locations: string[];
}
