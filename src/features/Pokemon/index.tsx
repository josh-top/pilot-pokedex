import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';
import History from '../History';
import Sprites from './components/Sprites';
import { IEvolutionChainLink, IPokemonSpecies } from './pokemonDto';
import { fetchEvolutionChainRequested } from './redux/actions';
import './index.scss';

type PropsFromRedux = ConnectedProps<typeof connector>;
interface IState {
  evolutionExpanded: boolean;
}

class Pokemon extends Component<PropsFromRedux, IState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      evolutionExpanded: false,
    };
    this.setEvolutionExpanded = this.setEvolutionExpanded.bind(this);
  }

  componentDidUpdate(prevProps: PropsFromRedux) {
    if (this.props.pokemon !== prevProps.pokemon) {
      this.setState({
        evolutionExpanded: false,
      });
    }
  }
  setEvolutionExpanded() {
    const { evolutionExpanded } = this.state;
    const { fetchEvolutionChainRequested, pokemon } = this.props;

    if (evolutionExpanded) {
      return;
    }

    this.setState({ evolutionExpanded: true });
    if (pokemon?.speciesData.evolution_chain.url) {
      fetchEvolutionChainRequested({ url: pokemon.speciesData.evolution_chain.url });
    }
  }

  evolutionTreeView(evolutionChain: IEvolutionChainLink) {
    const { is_baby, evolves_to, species } = evolutionChain;
    return (
      <div key={species.name} className="d-flex d-flex--column mt-2 m-1">
        <div className="d-flex">{species.name}</div>
        {!is_baby &&
          evolves_to.map((childEvolution) => {
            return this.evolutionTreeView(childEvolution);
          })}
      </div>
    );
  }

  detailsFromSpecies(speciesData: IPokemonSpecies) {
    const { evolutionChain, loadingEvolutionChain } = this.props;
    const { color, gender_rate, name, evolves_from_species } = speciesData;
    const { evolutionExpanded } = this.state;
    return (
      <>
        <div className="pokemon-card__row mt-3">
          <strong>Color:</strong>
          <h3 className="pokemon-title">{color.name}</h3>
        </div>

        {gender_rate === -1 ? (
          <div className="pokemon-card__row mt-3">
            <strong>Genderless</strong>
          </div>
        ) : (
          <>
            <div className="pokemon-card__row mt-3">
              <strong>Male:</strong>
              <h3 className="pokemon-title">{(((8 - gender_rate) / 8.0) * 100).toFixed(2)}%</h3>
            </div>

            <div className="pokemon-card__row mt-3">
              <strong>Female:</strong>
              <h3 className="pokemon-title">{((gender_rate / 8.0) * 100).toFixed(2)}%</h3>
            </div>
          </>
        )}

        <div className="pokemon-card__row mt-3">
          <strong>Species:</strong>
          <h3 className="pokemon-title">{name}</h3>
          {!evolutionExpanded && (
            <i className="fa fa-info-circle pokemon-evolution-info" onClick={this.setEvolutionExpanded} />
          )}
        </div>
        {evolutionExpanded && !loadingEvolutionChain && evolutionChain && this.evolutionTreeView(evolutionChain.chain)}

        {evolves_from_species?.name && (
          <div className="pokemon-card__row mt-3">
            <strong>Evolves From:</strong>
            <h3 className="pokemon-title mr-2">{evolves_from_species.name}</h3>
          </div>
        )}
      </>
    );
  }

  pokemonCard() {
    const { pokemon, darkMode } = this.props;
    if (!pokemon) {
      return null;
    }
    const { id, name, abilities, sprites, moves, types, speciesData, locations } = pokemon;
    const spriteUrls = Object.values(sprites).filter((value) => typeof value === 'string');
    return (
      <div className={`pokemon-card ${darkMode ? '' : 'pokemon-card--white'}`}>
        {spriteUrls.length && <Sprites sprites={spriteUrls} />}

        <div className="pokemon-card__column">
          <div className="pokemon-card__row">
            <strong>Name:</strong>
            <h2 className="pokemon-title">{name}</h2>
          </div>

          <div className="pokemon-card__row mt-3">
            <strong>ID:</strong>
            <h3 className="pokemon-title">{id}</h3>
          </div>

          {speciesData && this.detailsFromSpecies(speciesData)}
        </div>

        <div className="d-flex d-flex--column mt-3">
          <strong>Abilities:</strong>
          <div className="pokemon-abilities d-flex mt-1">
            {abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className={`pokemon-card__ability mr-1 mt-1 ${ability.is_hidden ? '' : 'active'}`}
              >
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex d-flex--column mt-3">
          <strong>Locations:</strong>
          <div className="pokemon-moves d-flex mt-1">
            {(locations || []).map((location) => (
              <div key={location} className="pokemon-card__ability mr-1 mt-1">
                {location}
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex d-flex--column mt-3">
          <strong>Moves:</strong>
          <div className="pokemon-moves d-flex mt-1">
            {moves.map((move) => (
              <div key={move.move.name} className="pokemon-card__ability mr-1 mt-1">
                {move.move.name}
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex d-flex--column mt-3">
          <strong>Types:</strong>
          <div className="pokemon-types d-flex mt-1">
            {types.map((pokeMonType) => (
              <div key={pokeMonType.type.name} className="pokemon-card__ability mr-1">
                {pokeMonType.type.name}
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex d-flex--column mt-3 mb-3">
          <strong>Varieties:</strong>
          <div className="pokemon-types d-flex mt-1">
            {(speciesData?.varieties || []).map((variety) => (
              <div key={variety.pokemon.name} className="pokemon-card__ability text-uppercase mr-1">
                {variety.pokemon.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="pokemon-container">
        <History />
        {this.pokemonCard()}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  darkMode: state.settings.darkMode,
  pokemon: state.pokemon.pokemon,
  evolutionChain: state.pokemon.evolutionChain,
  loadingEvolutionChain: state.pokemon.loadingEvolutionChain,
});

const mapDispatchToProps = {
  fetchEvolutionChainRequested,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Pokemon);
