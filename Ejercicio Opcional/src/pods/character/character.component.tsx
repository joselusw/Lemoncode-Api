import React from 'react';
import { Formik, Form } from 'formik';
import { TextFieldComponent } from 'common/components';
import { Button } from '@material-ui/core';
import { Character } from './character.vm';
import * as classes from './character.styles';

interface Props {
  character: Character;
  onSave: (character: Character) => void;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character, onSave } = props;

  return (
    <Formik
      onSubmit={onSave}
      initialValues={character}
      enableReinitialize={true}
    >
      {() => (
        <Form className={classes.root}>
          <TextFieldComponent name="name" label="Name" disabled={true} />
          <TextFieldComponent name="status" label="Status" disabled={true} />
          <TextFieldComponent name="species" label="Species" disabled={true} />
          <TextFieldComponent name="type" label="Type" disabled={true} />
          <TextFieldComponent name="gender" label="Gender" disabled={true} />
          <TextFieldComponent name="image" label="Image" disabled={true} />
          <TextFieldComponent name="episode" label="Episode" disabled={true} />

          <Button type="submit" variant="contained" color="primary">
            Return
          </Button>
        </Form>
      )}
    </Formik>
  );
};
