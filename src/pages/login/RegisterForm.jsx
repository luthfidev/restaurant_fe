import React from "react";
import { useNavigate, Link } from "react-router-dom";

import useStates from "../../states";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const RegisterForm = () => {
  const [state, actions] = useStates();
  const history = useNavigate();

  const getValueName = (value) => {
    actions.setState("username", value);
  };

  const getValueLevel = (value) => {
    actions.setState("access_level_id", value);
  };

  const handleSend = () => {
    let dataSend = {
      username: state.username,
      access_level_id: state.access_level_id,
    };
    actions.setStateObject({
      isLoading: true,
    });
    actions
      .register("/auth/register", dataSend)
      .then(() => {
        history("/");
      })
      .catch((error) => {
        actions.setStateObject({
          isLoading: false,
        });
      });
  };

  const options = [
    { text: "Admin", value: 1 },
    { text: "User", value: 2 },
  ];

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Register account
          </Header>
          <Form size="large" onSubmit={handleSend}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="username"
                name="username"
                onChange={(e) => getValueName(e.target.value)}
              />
              <Form.Select
                options={options}
                placeholder="Access"
                name="access_level_id"
                onChange={(e, { value }) => getValueLevel(value)}
              />
              <Button color="teal" fluid size="large" loading={state.isLoading}>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already account? <Link to="/">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default RegisterForm;
