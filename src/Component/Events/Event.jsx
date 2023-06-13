// import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  updateEvents,
  getEventByID,
  deleteEvent,
} from "../../Redux/Slice/eventSlice";
import { getCatagories } from "../../Redux/Slice/categorySlice";

import {
  Image,
  Button,
  Card,
  Placeholder,
  Form,
  Input,
  TextArea,
  Select,
  Modal,
  Icon,
  Label,
  Pagination,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
const Event = () => {
  let events = useSelector((state) => state.event.events);
  const updateData = useSelector((state) => state.event.post);
  const categories = useSelector((state) => state.category.categories);
  const updateEvent = useSelector((state) => state.event.updateEvent);
  const loading = useSelector((state) => state.event.loading);
  const searchQuery = useSelector((state) => state.event.searchQuery);
  const currentPage = useSelector((state) => state.event.currentPage);
  const totalPages = useSelector((state) => state.event.totalPages);

  const [updateContentID, setUpdateContent] = useState("");

  const [value, setValue] = useState({
    title: updateData?.title,
    description: updateData?.description,
    eventDate: updateData?.eventDate,
    Address: updateData?.Address,
    organiserContact: updateData?.organiserContact,
    // image: "",
    category: updateData?.category?.name,
  });

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  console.log(loading, "loading");
  // console.log(events, "events");
  const [deleteModelOpen, setDeleteOpen] = useState(false);
  const openDeleteModel = () => {
    setDeleteOpen(true);
    console.log(deleteModelOpen, "OPEN ");
  };
  const closeDeleteModel = () => {
    setDeleteOpen(false);
    console.log(deleteModelOpen, "Closed ");
  };

  useEffect(() => {
    if (updateContentID) {
      dispatch(getEventByID(updateContentID))
        .unwrap()
        .then((res) => {
          console.log(res);
          // setData(res);
        })
        .catch((err) => {
          console.log(err, "Err");
        });
    }
  }, [updateContentID]);

  // pagination

  useEffect(() => {
    dispatch(getEvents({ page: currentPage, limit: 3 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (pageNumber) => {
    dispatch(getEvents({ page: pageNumber, limit: 3 }));
  };

  const updateEventDate = (id) => {
    // try {
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("eventDate", value.eventDate);
    formData.append("Address", value.Address);
    formData.append("organiserContact", value.organiserContact);
    formData.append("category", value.category);
    console.log(value, "value");
    console.log(formData, "formdata");
    dispatch(updateEvents(id, value))
      .unwrap()
      .then((res) => {
        console.log(res);
        // setData(res);
      })
      .catch((err) => {
        console.log(err, "from events");
      });
    console.log(updateEvent, "update event");
    setOpen(false);
  };

  // delete Event

  const deleteEventByAPI = (id) => {
    dispatch(deleteEvent(id))
      .unwrap()
      .then((res) => {
        console.log(res);
        // setData(res);
      })
      .catch((err) => {
        console.log(err, "from events");
      });
  };

  useEffect(() => {
    dispatch(getCatagories())
      .unwrap()
      .then((res) => {
        console.log("catgory", res);
        // setData(res);
      })
      .catch((err) => {
        console.log(err, "from category");
      });

    // console.log(data, "data");
  }, []);

  // filterSearch
  // events = events[2];
  const filteredEvents =
    searchQuery && events && events.documents
      ? events.documents.filter(
          (event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase())
          // || event.description.includes(searchQuery)
        )
      : events && events.documents // Check if events and events.documents exist
      ? events.documents // If they exist, return all the documents
      : [];

  console.log(events, "events");
  console.log(events[0]?.totalPages, "total page");

  const categoryOptions = categories.map((category) => {
    return { key: category._id, text: category.name, value: category._id };
  });

  return (
    <>
      <div style={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}>
        <Card.Group doubling itemsPerRow={3} stackable>
          {filteredEvents.map((card, index) => (
            <Card key={card?.id}>
              {loading ? (
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    borderRadius: 20,
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Image
                      src={`https://picsum.photos/200/300?random=${index}`}
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                    <Label
                      as="a"
                      color="orange"
                      ribbon="right"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "calc(100% - 0px)",
                        zIndex: 1,
                        // opacity: 0.8,
                      }}
                    >
                      {card.category.name}
                    </Label>
                  </div>
                </div>
              )}

              <Card.Content>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="very short" />
                      <Placeholder.Line length="medium" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                ) : (
                  <>
                    <Card.Header>{card?.title}</Card.Header>
                    <Card.Meta>{card?.eventDate}</Card.Meta>
                    <Card.Description>
                      {card.description?.substring(0, 100)}
                    </Card.Description>
                  </>
                )}
              </Card.Content>

              <Card.Content extra>
                <Button
                  disabled={loading}
                  color="red"
                  onClick={() => {
                    setOpen(true);
                    setUpdateContent(card.id);
                  }}
                >
                  Edit
                </Button>
                <Link to={`/eventDetails/${card.id}`}>
                  <Button disabled={loading}>View</Button>
                </Link>
                <Button
                  disabled={loading}
                  onClick={() => openDeleteModel(card.id)}
                >
                  Delete
                </Button>
                {/* delete Model */}
                <Modal
                  closeIcon
                  open={deleteModelOpen}
                  // trigger={<Button>Show Modal</Button>}
                  onClose={() => closeDeleteModel()}
                  onOpen={() => openDeleteModel()}
                >
                  {/* <Header icon='archive' content='Archive Old Messages' /> */}
                  <Modal.Content>
                    <h3>Are Your Sure You Want Delete Event</h3>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={() => closeDeleteModel()}>
                      <Icon name="remove" /> No
                    </Button>
                    <Button
                      color="green"
                      onClick={() => {
                        deleteEventByAPI(card.id);
                        closeDeleteModel();
                      }}
                    >
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>

        {/* Edit Events */}
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
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
                  defaultValue={updateData?.title}
                  onChange={(e) =>
                    setValue((prevValue) => ({
                      ...prevValue,
                      title: e.target.value,
                    }))
                  }
                />

                <Form.Field
                  id="form-input-control-error-email"
                  control={Input}
                  label="Event Date"
                  placeholder="Event Date"
                  type="Date"
                  defaultValue={updateData?.eventDate}
                  onChange={(e) =>
                    setValue((prevValue) => ({
                      ...prevValue,
                      eventDate: e.target.value,
                    }))
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
                  defaultValue={updateData?.category?._id || ""}
                  search
                  searchInput={{ id: "form-select-control-gender" }}
                  onChange={(e, m) => {
                    setValue((prevValue) => ({
                      ...prevValue,
                      category: m.value,
                    }));
                  }}
                />
              </Form.Group>
              <Form.Field
                id="form-textarea-control-opinion"
                control={TextArea}
                label="Opinion"
                placeholder="Opinion"
                defaultValue={updateData?.description}
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    description: e.target.value,
                  }))
                }
              />
              <Form.Field
                id="form-input-control-error-email"
                control={Input}
                label="Email"
                placeholder="joe@schmoe.com"
                defaultValue={updateData?.organiserContact}
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    organiserContact: e.target.value,
                  }))
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
                defaultValue={updateData?.Address}
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    Address: e.target.value,
                  }))
                }
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Nope
            </Button>
            <Button
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                updateEventDate(updateData.id);
                // setOpen(false);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
        {/* <Pagination defaultActivePage={5} totalPages={10} style={{margin: "20px auto"}} /> */}
        {/* Render the pagination */}

        {events && events.documents && (
          <div style={{ margin: "30px auto", textAlign: "center" }}>
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            )}

            <Pagination
              defaultActivePage={currentPage}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={events && events.totalPages}
              onPageChange={(e, { activePage }) => handlePageChange(activePage)}
              style={{
                // display:"inline-block",
                margin: 10,
                fontSize: 15,
              }}
            />

            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
