import { Card, Icon, Image } from "semantic-ui-react";

const EventCard = ({ name, des, date, organizer, image, index }) => {
  //   console.log(image, "imagess -----");
  //   let data = image;
  //   console.log(data.data, "data -----------");
  //   const base64Image = data?.data;
  return (
    <div style={{ maxWidth: "230px" }}>
      <Card
        onClick={{
          curser: "pointer",
          opacity: 1,
          transition: "all 0.5s ease0 ",
        }}
        style={{ width: "100%" }}
      >
        <div
          style={{ maxHeight: "200px", overflow: "hidden", borderRadius: 20 }}
        >
          <Image
            src={`https://picsum.photos/200/300?random=${index}`}
            // src={`data:image/png;base64, ${data.data}`}
            wrapped
            ui={false}
            style={{ objectFit: "cover", height: "100%", width: "100%" }} // Apply custom styles to the Image component
          />
        </div>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>Joined {date}</Card.Meta>
          <Card.Meta>Manage By {organizer}</Card.Meta>
          <Card.Description>{des?.substring(0, 50)} .....</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            10 Attendees
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default EventCard;
