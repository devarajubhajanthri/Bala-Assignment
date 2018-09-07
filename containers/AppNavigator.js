import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import {createReduxBoundAddListener,createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import React from "react";

import ProductDetail from "./ProductDetail";
import { Ionicons} from "@expo/vector-icons"
import ProductListWithFlatList from "./ProductListWithFlatList";
import SeachProduct from "./SearchProduct";

const ListStack = createStackNavigator(
  {
    List: {
      screen: ProductListWithFlatList
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "List",
    navigationOptions: {
      title: "Product List",
      headerStyle: {
        backgroundColor: "#f551df"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SeachProduct
    },
    Detail: {
      screen: ProductDetail
    }
  },
  {
    initialRouteName: "Search",
    navigationOptions: {
      title: "Search",
      headerStyle: {
        backgroundColor: "#00f1ff"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

export const AppNavigator = createBottomTabNavigator(
  {
    List: ListStack,
    Search:SearchStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "List") {
          iconName = `ios-list-box${focused ? "" : "-outline"}`;
        } else if (routeName === "Search") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        } 
        return <Ionicons name={iconName} size={24} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#00f2ff",
      inactiveTintColor: "blue"
    }
  }
);

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.navState,
          addListener
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
