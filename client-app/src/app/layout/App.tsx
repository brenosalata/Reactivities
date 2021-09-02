import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/Activity";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import { v4 as uuid } from "uuid";
import { act } from "react-dom/test-utils";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  function handleSelectAcitivity(id: string) {
    setSelectedActivity(activities.find((e) => e.id === id));
  }

  function handleCancelSelectAcitivty() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectAcitivity(id) : handleCancelSelectAcitivty();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectAcitivity}
          cancelSelectActivity={handleCancelSelectAcitivty}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
