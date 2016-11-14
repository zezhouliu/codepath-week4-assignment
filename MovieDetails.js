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
  ScrollView,
  View,
} from 'react-native';

import convertHtmlToPlainText from './convertHtmlToPlainText';

const propTypes = {
  movie: PropTypes.object,
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

const defaultProps = {
}

const { width, height } = Dimensions.get('window');

export default class MovieDetails extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      layout: height > width ? 'portrait' : 'landscape',
      width,
      height,
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(e) {
    const { width, height } = e.nativeEvent.layout;
    if (height > width) {
      this.setState({ layout: 'portrait', width, height });
    } else {
      this.setState({ layout: 'landscape', width, height });
    }
  }

  render() {
    return(
      <ScrollView
        style={[
          styles.container
        ]}
        onLayout={this.onLayoutChange}
      >
        {this.state.layout === 'landscape' &&
          <View style={styles.landscape}>
            <Image
              source={{ uri: this.props.imageUrl }}
              style={[{ height: this.state.height, width: 150 }]}
            />
            <View style={{ height: this.state.height, flex: 1 }}>
              <Text
                style={[styles.text, { fontSize: 24 }]}
              >
                {convertHtmlToPlainText(this.props.movie.title)}
              </Text>
              <Text
                style={[styles.text]}
              >
                {convertHtmlToPlainText(this.props.caption)}
              </Text>
            </View>
          </View>
        }
        {this.state.layout === 'portrait' &&
          <Image
            source={{ uri: this.props.imageUrl }}
            style={[{ height: this.state.height, width: this.state.width }]}
          >
            <ScrollView style={styles.textContainer}>
              <View style={styles.fakeBuffer} />
              <Text
                style={[styles.text, { fontSize: 24 }]}
              >
                {convertHtmlToPlainText(this.props.movie.title)}
              </Text>
              <Text
                style={styles.text}
              >
                {convertHtmlToPlainText(this.props.caption)}
              </Text>
            </ScrollView>
          </Image>
        }
      </ScrollView>
    );
  }
}

MovieDetails.propTypes = propTypes;
MovieDetails.defaultProps = defaultProps;

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  landscape: {
    flex: 1,
    flexDirection: 'row',
  },
  fakeBuffer: {
    height: 100
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,

    padding: 8,
    flex: 1,
  }
});
