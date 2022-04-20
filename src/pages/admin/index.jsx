import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Dropdown,
  Header,
  Menu,
  Image,
  Item,
  Label,
} from "semantic-ui-react";
import useStates from "../../states";
import Cookies from "universal-cookie";

const paragraph = (
  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
);

const Dashboard = () => {
  const cookies = new Cookies();
  const history = useNavigate()
  const [state, actions] = useStates();
  useEffect(() => {
    actions.setStateObject({ isLoading: true });
    actions
      .get(`/admin`)
      .then((result) => {
        let { data } = result.data;
        actions.setStateObject({ data });
      })
      .finally(() => {
        actions.setStateObject({ isLoading: false });
      });
  }, []);

  const handleLogout = () => {
    cookies.remove("jwt");
    history("/");
  };

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Dashboard Admin
          </Menu.Item>
          <Dropdown item simple text="Profile">
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>

      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">All Outlets</Header>

        <Item.Group divided>
          {state.data
            ? state.data.map((item, index) => {
                return (
                  <>
                    <Item key={index}>
                      <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />

                      <Item.Content>
                        <Item.Header as="a">{item.outlet_name}</Item.Header>
                        <Item.Description>{paragraph}</Item.Description>
                        <Item.Extra>
                          <Label>username : {item.username}</Label>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </>
                );
              })
            : "No Data"}
        </Item.Group>
      </Container>
    </div>
  );
};

export default Dashboard;
