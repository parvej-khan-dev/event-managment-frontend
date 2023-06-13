import { useParams } from "react-router-dom";
import { Image, Card, Icon, Button, Popup } from "semantic-ui-react";
import { getEventByID } from "../../Redux/Slice/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { Breadcrumb } from "semantic-ui-react";
const EventDetails = () => {
  const event = useSelector((state) => state.event.post);
  const error = useSelector((state) => state.event.error);
  const loading = useSelector((state) => state.event.loading);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(id, "id from event");
  console.log(event, "event");

  useEffect(() => {
    if (id) {
      dispatch(getEventByID(id))
        .unwrap()
        .then((res) => {
          console.log(res);
          setData(res);
        })
        .catch((err) => {
          console.log(err, "Err");
        });
    }
  }, [id]);

  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Event Page", path: `/eventDetails/${id}` },
  ];

  const breadcrumbLinks = breadcrumbs.map((breadcrumb, index) => (
    <span key={index}>
      {/* <Link to={breadcrumb.path}>{breadcrumb.label}</Link> */}
      {/* {index < breadcrumbs.length - 1 && " > "} */}
      <Breadcrumb>
        <Link to={breadcrumb.path}>
          <Breadcrumb.Section link>{breadcrumb.label}</Breadcrumb.Section>

          {index < breadcrumbs.length - 1 && <Breadcrumb.Divider />}
        </Link>
      </Breadcrumb>
    </span>
  ));

  return (
    <div>
      {loading ? (
        <Loader active size="big" />
      ) : (
        <div>
          <div
            style={{ margin: "10px", float: "right", backgroundColor: "white" }}
          >
            {/* Breadcrumbs */}
            {breadcrumbLinks}
          </div>{" "}
          <div>
            <Image
              src="https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-gem-of-a-person-by-devesh-dixit-0-2022-8-16-t-6-21-8.jpg"
              fluid
            />
          </div>
          <Card
            style={{
              width: "95vw",
              justifyContent: "center",

              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Card.Content>
              <section
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Card.Header
                    style={{ fontSize: "1.7rem", lineHeight: "2.3rem" }}
                  >
                    {data.title}
                  </Card.Header>
                  <Card.Meta
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      lineHeight: "3.5rem",
                      color: "black",
                    }}
                  >
                   {data?.category?.name} | Hindi | 16+ | 1.5 Hours
                  </Card.Meta>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Popup
                    content="Edit & Delete Event"
                    position='left center'
                    trigger={
                      <Icon
                        name="ellipsis vertical"
                        style={{
                          marginBottom: 10,
                        
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                       
                      />
                    }
                  />

                  {/* <Button
                    style={{
                      fontSize: "1.5rem",
                      backgroundColor: "red",
                      color: "white",
                      width: 150,
                      height: 50,
                    }}
                  >
                    Book
                  </Button> */}
                </div>
              </section>
              <Card.Description
                style={{
                  width: "80%",
                }}
              >
                {data.description}
              </Card.Description>
            </Card.Content>
            <Card.Content
              extra
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <a style={{ marginRight: 20 }}>
                <Icon name="calendar alternate" />
                {data.eventDate}
              </a>

              <a style={{ marginRight: 20 }}>
                <Icon name="osi" />
                Organized by : {data.organiserContact}
              </a>
              <a style={{ marginRight: 20 }}>
                <Icon name="location arrow" />
                {data.Address}
              </a>
            </Card.Content>
          </Card>
          <section className="host" style={{ marginLeft: 10 }}>
            <Card style={{ maxWidth: 180 }}>
              <h3 style={{ margin: 10 }}>Artist</h3>

              <Image
                size="small"
                style={{ margin: "0 auto" }}
                src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
              />

              <Card.Content>
                <Card.Header>Daniel</Card.Header>
                <Card.Meta>Joined in 2016</Card.Meta>
                <Card.Description>
                  Daniel is a comedian living in Nashville.
                </Card.Description>
              </Card.Content>
            </Card>
          </section>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
