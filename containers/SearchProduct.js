import React, { Component } from "react";
import {ActivityIndicator,FlatList,View,Tex} from "react-native";
import { SearchBar } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import ProductListItem from "../components/ProductListItem";
import * as productActionCreators from "../actionCreators/product";

let URI = "http://10.110.60.106:4000";

class SearchProduct extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }
  _getProducts = (page = 1, limit = 40) => {
    this.props.actions.getProducts(page, limit);
  };
  _renderItem = ({ index, item }) => {
    return (
      <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price} 
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onSearch = (itemName) => {
    console.log('--' + itemName);
    this.props.actions.searchProductList(this.props.products, itemName);
  }

  render() {
    this.props.products.sort(function(a,b){
      return a.rating - b.rating;
    })

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchBar
          lightTheme
          onChangeText={this._onSearch.bind(this)}
          onClearText={this._onSearch.bind(this)}
          placeholder='Products Search' />

        {
          this.props.isLoading ? (
            <ActivityIndicator size="large" color="#00fff0" />
          ) : (
              this.props.filteredProducts.length > 0 ?
                <FlatList
                  data={this.props.filteredProducts}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
                  onEndReachedThreshold={0.5}
                  onEndReached={this._getMore}
                 />
                :
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ justifyContent: 'center', alignItems: 'center' }}>No Products found  </Text>
                </View>
            )}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.productState.products,
    limit: state.productState.limit,
    filteredProducts: state.productState.filteredProducts,
    isLoading: state.productState.isLoading,
    page: state.productState.page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchProduct
);
  
  