import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();

  const { deleteActivity, activitiesByDate, loading } = activityStore;

  function handleActivityDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group dividide="">
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">
                {activity.title}
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                    loading={loading && target === activity.id}
                    name={activity.id}
                    floated="right"
                    content="delete"
                    color="red"
                  />
                  <Button
                    as={Link}
                    to={`activities/${activity.id}`}
                    floated="right"
                    content="view"
                    color="blue"
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Header>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
