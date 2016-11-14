import Movies, { MoviesSortingType } from './Movies'

import React, {
  PropTypes,
  PureComponent,
} from 'react';

import {
  Navigator,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'now',
    };

    this.renderScene = this.renderScene.bind(this);
    this.renderTabBar = this.renderTabBar.bind(this);
  }

  renderTabBar() {
    return (
      <View style={styles.tabBar}>
        <TouchableWithoutFeedback onPress={() => this.setState({ currentTab: 'now' })}>
          <View>
            <Text
              style={[
                styles.tabBarText,
                this.state.currentTab == 'now' && styles.selected
              ]}
            >
              Now Playing
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.setState({ currentTab: 'top' })}>
          <View>
            <Text
              style={[
                styles.tabBarText,
                this.state.currentTab == 'top' && styles.selected
              ]}
            >
              Top Rated
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderScene() {
    return (
      <View style={styles.container}>
        {this.state.currentTab === 'now' &&
          <Movies sortingType={this.state.currentTab} />
        }
        {this.state.currentTab === 'top' &&
          <Movies sortingType={this.state.currentTab} />
        }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScene()}
        {this.renderTabBar()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBarText: {
    color: 'gray',
    fontSize: 20,
  },
  selected: {
    color: 'black',
  },
});
