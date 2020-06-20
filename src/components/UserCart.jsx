import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import {
  IconButton,
  Typography,
  Grid,
  ListItem,
  List,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  addtoCart,
  fetchDashboardData,
  productList,
} from "../containers/actions/userActions";
function UserBox(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }
  function deleteFromCart(product) {
    console.log("d");
    let usercart = props.user.user_cart;
    let productlist = props.user.not_add_into_cart;
    //removing cart item
    let index = usercart.indexOf(product);
    usercart.splice(index, 1);
    let tmp = parseFloat(props.user.total_cost);
    tmp = tmp - product.price;
    tmp = tmp.toFixed(2);

    props.addtoCart([usercart, tmp]);

    //add back to list

    productlist.push(product);
    props.fetchDashboardData(productlist);
    let updatedList = props.user.product_list;
    updatedList.push(product);
    props.productList(updatedList);
  }

  return (
    <div style={{ marginLeft: "auto" }}>
      <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClickOpen("paper")}>
        {" "}
        <Badge
          badgeContent={props.user.user_cart && props.user.user_cart.length}
          color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title">
        <DialogTitle id="scroll-dialog-title">
          <Grid
            style={{
              display: "flex",
              margiTop: "inherit",
              justifyContent: "center",
            }}>
            <Badge
              badgeContent={props.user.user_cart && props.user.user_cart.length}
              color="secondary">
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="h6"> CART</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {props.user.user_cart && props.user.user_cart.length ? (
            <List>
              {" "}
              {props.user.user_cart.map((lsItem, key) => (
                <div key={key}>
                  <ListItem key={key} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        alt="Remy Sharp"
                        src={require("../assets" + lsItem.src_2)}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={lsItem.title}
                      secondary={
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          style={{ display: "flex", flexDirection: "row" }}>
                          $ {lsItem.price}
                        </Typography>
                      }
                    />
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => deleteFromCart(lsItem)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))}
            </List>
          ) : (
            <Card style={{ maxWidth: 345, textAlign: "center" }}>
              <CardActionArea>
                <CardMedia
                  style={{ height: 250 }}
                  image={require("../assets/Images/cart.png")}
                  title="Contemplative Reptile"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Your cart is empty!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    It's a good day to buy the items you saved for later!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Typography>SubTotal: </Typography>
          <Typography>$ {props.user.total_cost}</Typography>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  addtoCart,
  fetchDashboardData,
  productList,
})(withRouter(UserBox));
