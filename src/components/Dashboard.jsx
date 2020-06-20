import React, { Component } from "react";
import Appbar from "./Appbar";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "./Card";
import ProductStub from "../assets/StubJson";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FabIcon from "./FabIcon";
import { addtoCart, productList } from "../containers/actions/userActions";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

class Dashboard extends Component {
  state = {
    newProductList: ProductStub,
  };

  handleChange = (event) => {
    event.target.value === "D" ? this.sortByPriceDes() : this.sortByPriceAsc();
  };

  sortByPriceDes = () => {
    let newProductList = this.props.user.product_list;
    for (var i = 0; i < newProductList.length; i++) {
      let p1 = parseFloat(newProductList[i].price);
      for (var j = 0; j < newProductList.length; j++) {
        let p2 = parseFloat(newProductList[j].price);

        if (p1 > p2) {
          let tmp = newProductList[i];
          newProductList[i] = newProductList[j];
          newProductList[j] = tmp;
        }
      }
    }
    this.props.productList(newProductList);
  };
  sortByPriceAsc = () => {
    let newProductList = this.props.user.product_list;
    for (var i = 0; i < newProductList.length; i++) {
      let p1 = parseFloat(newProductList[i].price);
      for (var j = 0; j < newProductList.length; j++) {
        let p2 = parseFloat(newProductList[j].price);

        if (p1 < p2) {
          let tmp = newProductList[i];
          newProductList[i] = newProductList[j];
          newProductList[j] = tmp;
        }
      }
    }
    this.props.productList(newProductList);
  };
  render() {
    return (
      <div>
        <Appbar />
        <Grid
          container
          spacing={2}
          style={{
            marginTop: 80,
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div style={{ width: "auto%", marginBottom: "10px" }}>
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
              }}>
              <Grid>Sizes:&nbsp;&nbsp;</Grid>
              <Grid item xs={6}>
                <FabIcon value={"XS"} />
                <FabIcon value={"S"} />
                <FabIcon value={"M"} />
                <FabIcon value={"ML"} />
              </Grid>
              <Grid item xs={6} style={{ textAlign: "end" }}>
                <FabIcon value={"L"} />
                <FabIcon value={"XL"} />
                <FabIcon value={"XXL"} />
              </Grid>
            </Grid>
          </div>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              // alignItems: "center",
            }}>
            <FormControl>
              <InputLabel htmlFor="demo-customized-select-native">
                Filter
              </InputLabel>
              <NativeSelect onChange={this.handleChange}>
                <option aria-label="None" value="" />
                <option value="D">Highest to Lowest</option>
                <option value="A">Lowest to Highest</option>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid container spacing={1}>
            {this.props.user.product_list.map((product, index) =>
              product ? (
                <Grid key={index} xs={3} item>
                  <Card product={product} />
                </Grid>
              ) : null
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  productList,
  addtoCart,
})(withRouter(Dashboard));
