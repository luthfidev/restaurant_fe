import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import useStates from "../../states";

function AddModal() {
  const [state, actions] = useStates();

  const getValueName = (value) => {
    actions.setState("name", value);
  };

  const handleSend = () => {
    let dataSend = {
      name: state.name,
    };
    actions
      .post("/outlets/add", dataSend)
      .then((result) => {
        actions
          .get("/home")
          .then((result) => {
            let { data } = result.data;
            actions.setStateObject({ data });
          })
          .catch((error) => {
            actions.setState("isLoading", false);
          });
      })
      .catch((error) => {
        actions.setStateObject({
          isLoading: false,
        });
      });
  };

  return (
    <Modal
      onClose={() => actions.setStateObject({ openModal: false })}
      onOpen={() => actions.setStateObject({ openModal: true })}
      open={state.openModal}
    >
      <Modal.Content image>
        <Modal.Description>
          <Form onSubmit={handleSend}>
            <h3>Add Outlet</h3>
            <Form.Input
              label="Outlet Name"
              fluid
              iconPosition="left"
              placeholder="Outlet Name"
              name="name"
              onChange={(e) => getValueName(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => actions.setStateObject({ openModal: false })}
        >
          Close
        </Button>
        {/* <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => actions.setStateObject({ openModal: false })}
          positive
        /> */}
      </Modal.Actions>
    </Modal>
  );
}

export default AddModal;
