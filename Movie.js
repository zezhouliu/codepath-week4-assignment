import React, {
  PureComponent,
  PropTypes,
} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import convertHtmlToPlainText from './convertHtmlToPlainText';

const propTypes = {
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  movie: PropTypes.object,
  onPress: PropTypes.func,
};

const defaultProps = {
  onPress: () => {},
}

const { width, height } = Dimensions.get('window');

export default class Movie extends PureComponent {

  render() {
    return(
      <TouchableOpacity
        onPress={() => this.props.onPress(this.props.movie)}
      >
        <View style={styles.container}>
          <Image
              source={{ uri: this.props.imageUrl }}
              style={styles.image}
          />
          <Text
            style={styles.text}
          >
            {convertHtmlToPlainText(this.props.caption)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Movie.propTypes = propTypes;
Movie.defaultProps = defaultProps;

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    height: 150,
  },
  image: {
    height: 150,
    width: 100,
    resizeMode: 'contain',
  },
  text: {
    padding: 8,
    flex: 1,
  },
});
