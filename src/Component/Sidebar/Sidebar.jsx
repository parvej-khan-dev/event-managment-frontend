import { useEffect, useState } from "react";
import { Dropdown, Input, Menu, Modal, Button, Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCatagories,
  createCatagories,
} from "../../Redux/Slice/categorySlice";
import { postActions } from "../../Redux/Slice/eventSlice";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [catgoryname, setCategoryName] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("home");
  const categories = useSelector((state) => state.category.categories);
  // const events = useSelector((state) => state.event.events);
  // handle model
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // create category
  const createCategory = (data) => {
    dispatch(createCatagories(data)).then((res) => {
      console.log(res, "res");
      if (res.meta.requestStatus === "fulfilled") {
        window.alert("Category Created Successfully");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    dispatch(getCatagories());
  }, [dispatch]);

  const handleCategoryChange = (selectedCategories) => {
    console.log(selectedCategories, "selectCatries");
    dispatch(postActions.setEvents(selectedCategories));
  };

  const handleSearchQueryChange = (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    dispatch(postActions.setSearchQuery(searchQuery));
  };

  console.log;

  const CategoriesFilter = categories.map((category) => {
    return { key: category._id, text: category.name, value: category.name };
  });

  console.log(CategoriesFilter, "CategoriesFilter ");

  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <div>
      {" "}
      <Menu vertical style={{ height: "86vh" }}>
        <Menu.Item>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              handleSearchQueryChange(e);
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            clearable
            fluid
            // multiple
            search
            selection
            options={CategoriesFilter}
            placeholder="Filter By Category"
            onChange={(e, m) => handleCategoryChange(m.value)}
          />
        </Menu.Item>

        <Menu.Item>
          <Dropdown item text="Category">
            <Dropdown.Menu>
              <Dropdown.Header>Category</Dropdown.Header>
              <Dropdown.Item onClick={() => handleOpen()}>
                Create Category
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu>
            <Menu.Item
              name="search"
              active={activeItem === "search"}
              onClick={handleItemClick}
            >
              Search
            </Menu.Item>
            <Menu.Item
              name="add"
              active={activeItem === "add"}
              onClick={handleItemClick}
            >
              Add
            </Menu.Item>
            <Menu.Item
              name="about"
              active={activeItem === "about"}
              onClick={handleItemClick}
            >
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={handleItemClick}
        ></Menu.Item>

        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      {/* Model  */}
      <Modal
        size="tiny"
        open={open}
        onClose={() => handleClose()}
        onOpen={() => handleOpen()}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Category Name</label>
              <input
                placeholder="Category Name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            positive
            onClick={() => {
              let data = {
                name: catgoryname,
              };
              createCategory(data);
              handleClose();
            }}
          >
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Sidebar;
