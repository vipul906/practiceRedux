import React, { Component } from "react";
import {
  fetchDashboardData,
  backToHome,
  productList,
} from "../containers/actions/userActions";
import Fab from "@material-ui/core/Fab";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class FabIcon extends Component {
  handleClick(size, name) {
    console.log(name);
    let newProductList = this.props.user.not_add_into_cart;
    let tmp = [];
    for (var i = 0; i < newProductList.length; i++) {
      for (var j = 0; j < newProductList[i].availableSizes.length; j++) {
        if (name === newProductList[i].availableSizes[j]) {
          tmp.push(newProductList[i]);
        }
      }
    }
    //this.props.user.product_list = this.state.newProductList;
    this.props.productList(tmp);
  }
  render() {
    return (
      <Fab
        size="small"
        // style={{ marginTop: "-102px" }}
        onClick={(size) => this.handleClick(size, this.props.value)}>
        {this.props.value}
      </Fab>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchDashboardData,
  productList,
  backToHome,
})(withRouter(FabIcon));
