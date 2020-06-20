import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { backToHome, productList } from "../../containers/actions/userActions";
import HomeIcon from "@material-ui/icons/Home";

import {
  AppBar,
  Toolbar,
  ListItem,
  IconButton,
  ListItemText,
  Avatar,
  List,
  Grid,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";

import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 350,
    background: "grey",
    height: "100%",
    padding: "4px 4px 4px 4px",
  },
  avatar: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    height: "50%",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

function PrimarySearchAppBar(props) {
  const classes = useStyles();

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const [state, setState] = useState({
    right: false,
  });

  const slideList = (slider) => (
    <Box
      // style={{ padding: "10px 20px 30px 4px" }}

      className={classes.menuSliderContainer}
      component="div"
      onClick={toggleSlider(slider, false)}>
      <ListItem>
        <Badge
          badgeContent={props.user.user_cart && props.user.user_cart.length}
          color="secondary">
          <AddShoppingCartIcon style={{ color: "white" }} />
        </Badge>
        <Typography variant="h6"> CART</Typography>
      </ListItem>
      <List>
        {props.user.user_cart.map((lsItem, key) => (
          <>
            <ListItem key={key} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  src={require("../../assets" + lsItem.src_2)}
                />
              </ListItemAvatar>
              <ListItemText
                primary={lsItem.title}
                secondary={
                  <React.Fragment>
                    <Typography variant="subtitle1" color="textSecondary">
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Typography variant="body1">
                          $ {lsItem.price}
                        </Typography>
                      </div>
                    </Typography>
                  </React.Fragment>
                }
              />

              <IconButton edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
      <Grid style={{ marginTop: "" }}>
        <Typography onClick={handleClick}>SubTotal :$ {totalPrice}</Typography>

        <Button
          variant="contained"
          style={{
            color: "#FFFFFF",
            backgroundColor: "black",
            borderRadius: 0,
            width: 250,
          }}>
          CheckOut
        </Button>
      </Grid>
    </Box>
  );
  var totalPrice = 0;
  function handleClick() {
    //var totalPrice = 0
    for (var i = 0; i < props.user.user_cart.length; i++) {
      console.log(props.user.user_cart);
      const price = props.user.user_cart[i].price;
      totalPrice = totalPrice + parseFloat(price);
      console.log(price);
    }
    return totalPrice;
  }

  return (
    <div className={classes.grow}>
      <AppBar style={{ position: "fixed", backgroundColor: "#000000" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <HomeIcon onClick={props.backToHome} />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Shopper's Cart
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={toggleSlider("right", true)}>
              <Badge
                badgeContent={
                  props.user.user_cart && props.user.user_cart.length
                }
                color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
          <SwipeableDrawer
            anchor="right"
            open={state.right}
            onClose={toggleSlider("right", false)}>
            {slideList("right")}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  productList,
  backToHome,
})(withRouter(PrimarySearchAppBar));
////
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import appReducer from "./containers/reducers";

const initialState = {};

const middleware = [thunk];

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(...middleware),
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      )
    : createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
      );

export default store;
