import React, {
  PureComponent,
  PropTypes,
} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import convertHtmlToPlainText from './convertHtmlToPlainText';

const propTypes = {
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

const { width, height } = Dimensions.get('window');

export default class PostDetails extends PureComponent {

  render() {
    return(
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
    );
  }
}

Post.propTypes = propTypes;

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width,
    height: (height * 3 / 4),
  },
  text: {
    margin: 4,
  },
});
