import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ margimBottom: 12 }}
          />
          Reactivities
        </Header>
        <Header as="h2" inverted content="Welcome to Reactivities" />
        <Button as={Link} to="/activities" size="huge" inverted>
          Take me to Activities!
        </Button>
      </Container>
    </Segment>
  );
}
