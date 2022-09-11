import React from 'react';
import {
  Modal,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList
} from 'react-native';
import Account from './Settings/Account';
import Pomodoro from './Settings/Pomodoro';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Settings'
    };

    this.renderItem = this.renderItem.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    if (this.state.currentPage === 'Settings')
      this.props.setVisible(false);
    else this.setState({ currentPage: 'Settings' });
  }

  onItemPress(title) {
    this.setState({
      currentPage: title
    });
  }

  renderItem({ item }) {
    if (item.title === '__SEPARATOR__') {
      return (
        <View key={item.id} style={{ backgroundColor: '#fff' }}>
          <View style={styles.separator}></View>
        </View>
      );
    }

    return (
      <TouchableOpacity key={item.title} onPress={() => this.onItemPress(item.title)}>
        <View style={styles.item}>
          <Image style={styles.itemIcon} source={item.icon} />
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const data = [
      {
        id: 0,
        title: 'Account',
        icon: { uri: 'https://cdn-icons-png.flaticon.com/512/3033/3033143.png' }
      },
      {
        id: -1,
        title: '__SEPARATOR__'
      },
      {
        id: 1,
        title: 'Pomodoro',
        icon: { uri: 'https://cdn-icons-png.flaticon.com/512/7152/7152804.png' }
      }
    ];

    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={() => this.props.setVisible(false)}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={"#fff"} hidden={false} barStyle={"dark-content"} />
          <View style={styles.navbar}>
            <View>
              <TouchableOpacity onPress={this.onBackPress}>
                <Text style={styles.close}>
                  { this.state.currentPage === 'Settings' ? 'X' : '<' }
                </Text>
              </TouchableOpacity>
            </View>
            <View><Text style={styles.title}>{this.state.currentPage}</Text></View>
            <View><Text style={styles.close}>   </Text></View>
          </View>
          {(() => {
            if (this.state.currentPage === 'Settings') {
              return (
              <FlatList
                  style={{ flex: 1, backgroundColor: '#e6e6e6', paddingTop: 20 }}
                  data={data}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                />);
            } else if (this.state.currentPage === 'Account') {
              return (
                <Account/>
              );
            } else if (this.state.currentPage === 'Pomodoro') {
              return (
                <Pomodoro />
              );
            }
          })()}
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center'
  },
  navbar: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 20,
    justifyContent: 'space-between'
  },
  close: {
    fontSize: 28,
    color: '#8c8c8c',
    transform: [
      { scaleX: 1 },
      { scaleY: 0.9}
    ],
  },
  title: {
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  itemIcon: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  itemTitle: {
    fontSize: 17
  },
  separator: {
    width: Dimensions.get('window').width - 60,
    marginLeft: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#1a1a1a',
    opacity: 0.1
  }
})