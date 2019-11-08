// React
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Hooks
import { useInput, useRequest } from '../Hooks';

// Material-UI
import { Button, Container, CssBaseline, Grid, makeStyles, TextField, Tooltip, Typography } from '@material-ui/core';

// Utilities
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Styles
const useStyles = makeStyles({
  '@global': {
    body: {
      backgroundColor: '#ffffff'
    },
  },
  container: {
    alignItems: 'center',
    marginTop: '6rem'
  },
  submit: {
    margin: '1rem 0 1rem 0'
  }
});

export default function Signup(props: Props) 
{
  const classes = useStyles();

  //
  // State
  //

  const [isInputValid, setIsInputValid] = useState(true);

  // Custom hooks
  const { value: userName, bind: bindUserName, reset: resetUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword } = useInput('');

  const [{ responseData, isLoading, isError }, createUser] = useRequest('http://localhost:3001/api/createUser', 'POST');

  //
  // Refs
  //

  const firstUpdate = useRef(true);
  const isMounted = useRef(true);
  const userIsDuplicate = useRef(false);

  //
  // Vars
  //

  let allFormsFilled = !!(userName && password && confirmPassword);
  let doPasswordsMatch = allFormsFilled && password === confirmPassword;
  let isSignupReady = allFormsFilled && doPasswordsMatch;

  let history = useHistory();

  //
  // Helper Functions
  //

  const sendSignupRequest = function(event)
  {
    createUser({ 
      name: userName,
      password: password
    }); 

    event.preventDefault();
  };

  //
  // React Hooks
  //

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []);

  useEffect(() => {
    // Do not run error handling when we first mount
    if(firstUpdate.current)
    {
      firstUpdate.current = false;
      return;
    }

    if(isError)
      console.log(isError);
        // Handled Errors
    else if(responseData && responseData.success === false)
    {
      // If the user already exists reset the signup form
      if(responseData.message === 'DUPLICATE')
      {
        userIsDuplicate.current = true;

        resetUserName();
      }
    }
    else
    {
      history.push('/');
    }

    // Only run this effect when response data from a signup request has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [responseData, isError]);

  return (
    <Container 
      maxWidth='xs' 
      fixed={true}
      className={classes.container}>
      <CssBaseline />
      <Typography
        component='h1' 
        variant='h5' 
        align='center' 
        gutterBottom={true}>
        Sign Up
      </Typography>
      <form onSubmit={sendSignupRequest}>      
      <Tooltip
          title='Username entered already exists'
          placement='right'
          open={userIsDuplicate.current}>
        <TextField 
          id='username'
          name='username' 
          label='Username'
          margin='normal'
          variant='outlined'
          onFocus={() => userIsDuplicate.current = false} // Dismiss tooltip once user inputs new username
          autoFocus
          fullWidth
          required
          {...bindUserName}
        />
      </Tooltip>
        <Tooltip
          title='Passwords must match'
          placement='right'
          disableFocusListener={doPasswordsMatch}
          disableHoverListener
          disableTouchListener>
          <TextField 
            id='password'
            name='password'
            label='Password'
            type='password'
            margin='normal'
            variant='outlined'
            fullWidth
            required
            {...bindPassword}
          />
        </Tooltip>
        <Tooltip
          title='Type password above first'
          placement='right'
          disableHoverListener={!!password}
          disableFocusListener
          disableTouchListener>
          <TextField 
            id='confirmPassword'
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            margin='normal'
            variant='outlined'
            disabled={!password}
            fullWidth
            required
            {...bindConfirmPassword}
          />
        </Tooltip>
        <Tooltip
          title={!allFormsFilled ? 'Username and Password fields must be filled' : 'Passwords do not match'}
          disableHoverListener={isSignupReady}
          placement='bottom'>
          <span>
            <Button
              type='submit'
              variant='outlined'
              color='primary'
              className={classes.submit}
              disabled={!isSignupReady || isLoading}
              fullWidth>
              Create Account
            </Button>
          </span>
        </Tooltip>
      </form>
    </Container>
  );
};