import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { isValidElement } from 'react';
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

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress(title) {
    this.props.navigation.navigate(title);
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
              <TouchableOpacity onPress={() => this.props.setVisible(false)}>
                <Text style={styles.close}>X</Text>
              </TouchableOpacity>
            </View>
            <View><Text style={styles.title}>Settings</Text></View>
            <View></View>
          </View>
          <FlatList
            style={{ flex: 1, backgroundColor: '#e6e6e6', paddingTop: 20 }}
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
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
      { scaleX: 1.1 },
      { scaleY: 0.9 }
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
});

export default function SettingsNavigator({ visible, setVisible }) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false, 
          contentStyle: visible ? { position: 'relative', display: 'flex' } : { position: 'absolute', display: 'none' } 
        }} 
        initialRouteName="Settings">

        <Stack.Screen name="Settings">
          {({ navigation }) => <Settings visible={visible} setVisible={setVisible} navigation={navigation} />}
        </Stack.Screen>
        <Stack.Screen name="Account">
          {() => <Account />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Account() {
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}></View>
  );
}