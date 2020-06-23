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
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";

class Dashboard extends Component {
  state = {
    newProductList: ProductStub,
    anchorEl: null,
  };
  ITEM_HEIGHT = 48;

  //const [anchorEl, setAnchorEl] = React.useState(null);

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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
    this.setState({ anchorEl: null });
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
    this.setState({ anchorEl: null });
  };
  render() {
    let open = Boolean(this.state.anchorEl);

    return (
      <div>
        <div style={{ height: "5rem" }}>
          <Appbar />
        </div>
        <Grid container spacing={1}>
          <div style={{ width: "100%", display: "flex" }}>
            <Grid item>Sizes:&nbsp;&nbsp;</Grid>

            <Grid item xs={6}>
              {/* <Grid>Sizes:&nbsp;&nbsp;</Grid> */}
              <FabIcon value={"S"} />
              <FabIcon value={"M"} />
              <FabIcon value={"L"} />
              <FabIcon value={"ML"} />
              <FabIcon value={"XS"} />
              <FabIcon value={"XL"} />
              <FabIcon value={"XXl"} />
            </Grid>
            <Grid
              item
              xs={6}
              // sm={3}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                // alignItems: "center",
              }}>
              {" "}
              <IconButton onClick={this.handleClick}>
                <SortIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: this.ITEM_HEIGHT * 4.5,
                    width: "25ch",
                  },
                }}>
                <MenuItem onClick={this.sortByPriceDes}>
                  Highest to Lowest
                </MenuItem>
                <MenuItem onClick={this.sortByPriceAsc}>
                  Lowest to Highest
                </MenuItem>
              </Menu>
            </Grid>
          </div>
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
