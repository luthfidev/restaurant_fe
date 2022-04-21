import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import Cookies from "universal-cookie";

const _401 = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const handleLogout = () => {
    cookies.remove("jwt");
    history("/");
  };
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1>Not Authorized</h1>
          <Button color="black" onClick={handleLogout}>
            Logout
          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default _401;
