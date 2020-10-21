import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { BASE_URL, getCachedResponse } from '../../utils/api';
import { formatDate } from '../../utils/date';
import { fetchPokemonRequested } from '../Pokemon/redux/actions';
import './index.scss';

type PropsFromRedux = ConnectedProps<typeof connector>;

class History extends PureComponent<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.onCardClick = this.onCardClick.bind(this);
  }

  onCardClick(slug: string) {
    const { fetchPokemonRequested } = this.props;
    fetchPokemonRequested({ slug, saveToHistory: false });
  }

  render() {
    const { savedSlugs, darkMode } = this.props;
    return (
      <div className={`history-container ${darkMode ? '' : 'history-container--white'}`}>
        <div className="history-title d-flex align-center justify-center">
          <i className="fa fa-history" />
          History
        </div>

        <div className="history-content">
          <div className="history-cards">
            {savedSlugs.map((savedSlug) => {
              const { slug, timestamp } = savedSlug;
              const cachedResponse = getCachedResponse(`${BASE_URL}/pokemon/${slug}`);
              const pokemonData = cachedResponse ? cachedResponse.data : null;
              return (
                <div key={`${timestamp} ${slug}`} className="history-card" onClick={() => this.onCardClick(slug)}>
                  {pokemonData && (
                    <div className="d-flex justify-between">
                      <h5 className="history-card__title">{pokemonData.name}</h5>
                      <h5 className="history-card__title">{pokemonData.id}</h5>
                    </div>
                  )}
                  {!pokemonData && <h5 className="history-card__title">{slug}</h5>}
                  <div className="history-card__image">
                    {pokemonData?.sprites?.front_default ? (
                      <img src={pokemonData.sprites.front_default} alt="front" />
                    ) : (
                      <i className="fa fa-ban" />
                    )}
                  </div>
                  <h6 className="history-card__timestamp">{formatDate(timestamp)}</h6>
                </div>
              );
            })}
          </div>
          {savedSlugs.length === 0 && (
            <div className="history-no-content d-flex align-center justify-center">
              <i className="fa fa-ban" style={{ fontSize: 36 }} />
              <h4>No History</h4>
              Please search for a Pokémon by name or ID
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  savedSlugs: state.history.savedSlugs,
  darkMode: state.settings.darkMode,
});

const mapDispatchToProps = {
  fetchPokemonRequested,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(History);
