import React from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";

//for icons
import { Ionicons, FontAwesome } from "@expo/vector-icons";

// component
class ProductListItem extends React.PureComponent {
  
  render() {
    let {
      id,
      image,
      title,
      price,
      rating,
      navigation
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          console.log("Navigating to detail for id ", id);
          navigation.navigate("Detail", { id });
        }}
      >
        <View style={styles.container}>
          <Image
            source={image = { uri: image } }
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <View style={styles.infoContainer}>
              <Text
                style={[styles.title, { flexShrink: 1, overflow: "hidden" }]}
              >
                {title}
              </Text>

             
            </View>
            <View style={styles.rating}>
              <Text style={{ color: "#fff", marginRight: 4 }}>{rating || "NA"}</Text>
              <Ionicons name="md-star" size={11} color="#ffff" />
            </View>
            <View style={styles.price}>
              <FontAwesome name="rupee" size={14} color="#111" />
              <Text style={{  fontWeight: "bold",fontSize: 15, marginLeft: 5 }}>
                {price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginRight: 15,
    borderBottomColor: "grey",
    marginLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 150
  },
  image: {
    width: 105,
    height: 105
  },
  title: {
    color: "black",
    marginRight: 9,
    marginLeft: 9,
    fontSize: 10
  },
  infoContainer: {
    justifyContent:'space-between',
    flexDirection: "row",
    paddingTop: 11
  },
  rating: {
    borderRadius: 5,
    paddingRight: 5,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 5,
    marginLeft: 10,
    backgroundColor: "#0050ff",
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 10
  }
});
export default ProductListItem;
