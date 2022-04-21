/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import useStates from "../../states";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const LoginForm = () => {
  const cookies = new Cookies();
  const [state, actions] = useStates();
  const history = useNavigate();

  useEffect(() => {
    actions.setStateObject({
      username: "",
      login: false,
      isLoadingPage: false,
      isLoading: false,
    });
  }, []);

  // expire cookies 3 day
  const timestamp = new Date().getTime();
  const expire = timestamp + 60 * 60 * 24 * 1000 * 3;
  const expireDate = new Date(expire);

  const getValueName = (value) => {
    actions.setState("username", value);
  };

  const submit = () => {
    if (state.email === "" || state.password === "") {
      return false;
    } else {
      actions.setStateObject({
        isLoading: true,
      });
      actions
        .login({
          username: state.username,
        })
        .then((result) => {
          let {
            token,
            data: {
              payload: {
                username,
                isAdmin,
                priviledges,
                user_id,
                user_name,
                access_level_id,
              },
            },
          } = result.data;
          actions.setStateObject({
            login: true,
            username,
            token,
            isAdmin,
            priviledges,
            user_id,
            user_name,
            access_level_id,
            isLoadingPage: true,
          });
          cookies.set("jwt", token, { path: "/" }, { expires: expireDate });
          if (isAdmin) {
            return history("/admin");
          }
          if (!isAdmin) {
            return history("/home");
          }
          
        })
    }
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={submit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="username"
                name="username"
                onChange={(e) => getValueName(e.target.value)}
              />
              <Button color="teal" fluid size="large" loading={state.isLoading}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message warning>
            <Message.Header>Note.</Message.Header>
            <p>username : user (user not admin)</p>
            <p>username : admin (admin)</p>
          </Message>
          <Message>
            New to us? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginForm;
