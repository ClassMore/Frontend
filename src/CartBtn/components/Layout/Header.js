import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <HeaderCartButton onClick={props.onShowCart} />
    </Fragment>
  );
};

export default Header;
