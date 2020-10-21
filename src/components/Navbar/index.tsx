import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Logo from '../../assets/logo.png';
import { fetchPokemonRequested } from '../../features/Pokemon/redux/actions';
import Settings from '../../features/Settings';
import { RootState } from '../../redux/reducers';
import Loader from '../Loader';
import './index.scss';

type PropsFromRedux = ConnectedProps<typeof connector>;
interface INavbarState {
  query: string;
}

class Navbar extends Component<PropsFromRedux, INavbarState> {
  constructor(props: PropsFromRedux) {
    super(props);

    this.state = {
      query: '',
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      query: e.target.value,
    });
  }

  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { fetchPokemonRequested } = this.props;
    const { query } = this.state;
    // update history
    fetchPokemonRequested({ slug: query, saveToHistory: true });
  }

  render() {
    const { darkMode, loading, loadingSpecies, loadingLocations, loadingEvolutionChain } = this.props;
    const { query } = this.state;
    return (
      <>
        {(loading || loadingSpecies || loadingLocations || loadingEvolutionChain) && <Loader />}
        <nav className={`navbar-wrapper ${darkMode ? '' : 'navbar-wrapper--light'}`}>
          <div className="navbar d-flex align-center justify-between">
            <div className="navbar__left d-flex align-center">
              <img className="logo" src={Logo} alt="logo" />
              <h1>Josh's Pokédex</h1>

              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  required
                  className={`navbar__search ${darkMode ? '' : 'navbar__search--white'}`}
                  placeholder="Type Name or ID ..."
                  value={query}
                  onChange={this.onQueryChange}
                />
                <button type="submit" className="navbar__search-btn">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
            <div className="navbar__right d-flex align-center">
              <Settings />
            </div>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  darkMode: state.settings.darkMode,
  loading: state.pokemon.loading,
  loadingSpecies: state.pokemon.loadingSpecies,
  loadingLocations: state.pokemon.loadingLocations,
  loadingEvolutionChain: state.pokemon.loadingEvolutionChain,
});

const mapDispatchToProps = {
  fetchPokemonRequested,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Navbar);
