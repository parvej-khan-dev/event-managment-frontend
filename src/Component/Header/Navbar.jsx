import {
  Input,
  Menu,
  Button,
  Form,
  TextArea,
  Select,
  Modal,
  
} from "semantic-ui-react";
import { getCatagories } from "../../Redux/Slice/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvents } from "../../Redux/Slice/eventSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  // const eventCreated = useSelector((state) => state.event.post);
  const categories = useSelector((state) => state.category.categories);
  // const error = useSelector((state) => state.event.error);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [reload, setReload] = useState(false);
  const [value, setValue] = useState({
    title: "",
    description: "",
    eventDate: "",
    Address: "",
    organiserContact: "",
    image: "",
    category: "",
  });

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  function createEventModelOpen() {
    setOpen((prev) => !prev);
  }

  const handleCreateEvent = () => {
    try {
      let formData = new FormData();

      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("eventDate", value.eventDate);
      formData.append("Address", value.Address);
      formData.append("organiserContact", value.organiserContact);
      // formData.append("image", selectedImage);
      formData.append("category", value.category);
      console.log(formData, "formdata");
      dispatch(createEvents(value)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res, "event created");
          window.alert("Event Created Sucessfully");
          window.location.reload();
        }
      });
      setReload((value) => !value);
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
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
  }, [reload]);

  const categoryOptions = categories.map((category) => {
    return { key: category._id, text: category.name, value: category._id };
  });
  return (
    <div>
      <Menu
        secondary
        style={{
          padding: 5,
          display: "flex",
          jusitfyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Link to={"/"}>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
        </Link>
        <Menu.Item
          name="Events"
          active={activeItem === "Events"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <div style={{display:'flex'}}>
          <Menu.Item>
            <Button color="red" onClick={() => createEventModelOpen()}>
              Create Event
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleItemClick}
          />
          </div>
       
        </Menu.Menu>
      </Menu>
  


      <Modal
        size="small"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>Create Events</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="Event Name"
                placeholder="Event name"
                value={value.title}
                onChange={(e) => setValue({ ...value, title: e.target.value })}
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="Address"
                placeholder="Address"
                value={value.Address}
                onChange={(e) =>
                  setValue({ ...value, Address: e.target.value })
                }
              />

              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                type="date"
                label="Event Date"
                placeholder="Date"
                value={value.eventDate}
                onChange={(e) =>
                  setValue({ ...value, eventDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              label="Description"
              placeholder="description"
              value={value.description}
              onChange={(e) =>
                setValue({ ...value, description: e.target.value })
              }
            />
            {/* <Form.Field
              id="form-input-control-last-name"
              control={Input}
              type="file"
              label="Images"
              placeholder="Images"
              name="image"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            /> */}
            <Form.Field
              control={Select}
              options={categoryOptions}
              label={{
                children: "Category",
                htmlFor: "form-select-control-gender",
              }}
              placeholder="Category"
              value={value.category}
              search
              searchInput={{ id: "form-select-control-gender" }}
              onChange={(e, m) => {
                setValue({ ...value, category: m.value });
                console.log("---------m--------", m);
              }}
            />
            <Form.Field
              id="form-input-control-error-email"
              control={Input}
              label="Email"
              placeholder="joe@schmoe.com"
              value={value.organiserContact}
              onChange={(e) =>
                setValue({ ...value, organiserContact: e.target.value })
              }
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            onClick={() => {
              handleCreateEvent();
              setOpen(false);
            }}
          >
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Navbar;
