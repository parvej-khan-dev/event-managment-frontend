import React from "react";
import {
  Form,
  Input,
  TextArea,
  Select,
  Modal,
  Button,
} from "semantic-ui-react";
import { updateEvents, postActions } from "../../Redux/Slice/eventSlice";
import { getCatagories } from "../../Redux/Slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const UpdateEvent = () => {
  const updateEvent = useSelector((state) => state.event.updateEvent);
  const error = useSelector((state) => state.event.error);
  const categories = useSelector((state) => state.category.categories);
  const open = useSelector((state) => state.event.updateModelOpen);
  //   const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    title: "",
    description: "",
    eventDate: "",
    Address: "",
    organiserContact: "",
    category: "",
    // image: "",
  });

  const closeModal = () => {
    dispatch(postActions.closeModal());
  };

  useEffect(() => {
    // get All Categories

    dispatch(getCatagories())
      .unwrap()
      .then((res) => {
        console.log("catgory", res);
        // setData(res);
      })
      .catch((err) => {
        console.log(err, "from category");
      });


      console.log(open, "OPEN MODEL TRUE")

    // console.log(data, "data");
  }, []);

  //categores
  const categoryOptions = categories.map((category) => {
    return { key: category._id, text: category.name, value: category._id };
  });

  const updateEventDate = (id) => {
    try {
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("eventDate", value.eventDate);
      formData.append("Address", value.Address);
      formData.append("organiserContact", value.organiserContact);
      formData.append("category", value.category);

      console.log(formData, "formData");
      dispatch(updateEvents(id, formData));

      if (updateEvent) {
        window.alert("Update Event Successfully");
      }
      if (error) {
        window.alert("Update Event failed");
      }
    } catch (error) {
      window.alert("Error On Update Event");
      console.error("Error creating event:", error.message);
    }
  };

  console.log(open, "open");
  return (
    <div>
      {" "}
      <Modal
        open={open}
        // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="Event Name"
                placeholder="Event name"
                value={`card?.title`}
                onChange={(e) => setValue({ ...value, title: e.target.value })}
              />

              <Form.Field
                id="form-input-control-error-email"
                control={Input}
                label="Event Date"
                placeholder="Event Date"
                type="Date"
                value={"card?.eventDate"}
                onChange={(e) =>
                  setValue({
                    ...value,
                    eventDate: e.target.value,
                  })
                }
              />
              <Form.Field
                control={Select}
                options={categoryOptions}
                label={{
                  children: "Category",
                  htmlFor: "form-select-control-gender",
                }}
                // placeholder="Category"
                value={`card?.category?._id || ""`}
                search
                searchInput={{ id: "form-select-control-gender" }}
                onChange={(e, m) => {
                  setValue({ ...value, category: m.value });
                  console.log("---------m--------", m);
                }}
              />
            </Form.Group>
            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              label="Opinion"
              placeholder="Opinion"
              value={`card?.description`}
              onChange={(e) =>
                setValue({
                  ...value,
                  description: e.target.value,
                })
              }
            />
            <Form.Field
              id="form-input-control-error-email"
              control={Input}
              label="Email"
              placeholder="joe@schmoe.com"
              value={`card?.organiserContact`}
              onChange={(e) =>
                setValue({
                  ...value,
                  organiserContact: e.target.value,
                })
              }
              // error={{
              //   content: "Please enter a valid email address",
              //   pointing: "below",
              // }}
            />

            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Address"
              placeholder="Addresses"
              value={`card?.Address`}
              onChange={(e) => setValue({ ...value, Address: e.target.value })}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="black"
            onClick={() => dispatch(postActions.closeModal())}
          >
            Close
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              updateEventDate(1234);
              dispatch(postActions.closeModal());
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default UpdateEvent;
