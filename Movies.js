import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  ActivityIndicator,
  BackAndroid,
  Navigator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Movie from './Movie';
import MovieDetails from './MovieDetails';

const propTypes = {
  sortingType: PropTypes.oneOf([
    'now',
    'top',
  ]),
};

function getPhotoUrl(tail) {
  return `https://image.tmdb.org/t/p/w300${tail}`;
}

const routes = [
  { component: 'List', title: 'Movies', id: 0 },
  { component: 'Detail', title: 'Details', id: 1 },
];

const routeMapper = {
  LeftButton: (route, navigator) => {
    if (navigator.getCurrentRoutes().length > 1) {
      return (
        <TouchableOpacity
          style={styles.navText}
          onPress={() => navigator.pop()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      );
    }
    return null;
  },
  RightButton: () => null,
  Title: (route) => <Text style={styles.navText}>{route.title}</Text>,
};

export default class Movies extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      movies: null,
      refreshing: false,
      selectedMovie: null,
    };

    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    this.onRefresh();
  }

  onRefresh() {
    const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed';
    const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed';

    let queryUrl = null;

    switch(this.props.sortingType) {
      case 'now':
        queryUrl = nowPlayingUrl;
        break;
      case 'top':
        queryUrl = topRatedUrl;
        break;
      default:
        break;
    }

    this.setState({ refreshing: true });

    fetch(queryUrl)
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.setState({ movies: response.results, refreshing: false, error: false })
      })
      .catch(() => this.setState({ refreshing: false, error: true })
      );
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid() {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    }

    // exit app
    return false;
  }

  onPress(movie) {

    console.log("Selected", movie.poster_path);
    this.setState({ selectedMovie: movie }, () => {

      this.navigator.push(routes[1]);
    });
  }

  navigator = null;

  renderScene(route, navigator) {
    this.navigator = navigator;

    switch (route.component) {
      case 'List':
        if (this.state.refreshing) {
          return (
            <ActivityIndicator
              animating
              size={'large'}
              style={{ flex: 1 }}
            />
          );
        }
        return (
          <ScrollView
            style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            {this.state.error &&
              <View style={styles.error}>
                <Text>Network error</Text>
              </View>
            }
            {this.state.movies && this.state.movies.map(movie =>
              <Movie
                key={movie.title}
                movie={movie}
                imageUrl={getPhotoUrl(movie.poster_path)}
                caption={movie.overview}
                onPress={this.onPress}
              />
            )}
          </ScrollView>
        );
        break;
      case 'Detail':
        return (
          <MovieDetails
            key={this.state.selectedMovie.title}
            imageUrl={getPhotoUrl(this.state.selectedMovie.poster_path)}
            caption={this.state.selectedMovie.overview}
            movie={this.state.selectedMovie}
          />
        );
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={routeMapper}
          />
        }
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: -50,
    marginTop: 64,
  },
  error: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    margin: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

