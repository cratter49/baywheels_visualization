// Built using examples:
//  Async Button Hook - https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-
//  Login Page Layout - https://material-ui.com/getting-started/templates/

// React
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Hooks
import { useInput, useRequest } from '../Hooks';

// Utilities
import axios from 'axios';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Material-UI
import { Button, Container, CssBaseline, Grid, makeStyles, TextField, Tooltip, Typography } from '@material-ui/core';

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

export default function Login()
{
  const classes = useStyles();

  //
  // State
  //

  // Custom hooks
  const { value: userName, bind: bindUserName, reset: resetUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const [{ responseData, isLoading, isError }, getUser] = useRequest('http://localhost:3001/api/getUser', 'GET');

  //
  // Refs
  //

  const firstUpdate = useRef(true);
  const isMounted = useRef(true);
  const incorrectPassword = useRef(false);
  const userMissing = useRef(false);

  //
  // Vars
  //

  let history = useHistory();

  // The login is ready if t he username and password are populated
  let isLoginReady = !!(userName && password)

  //
  // Helper Functions
  //

  const sendLoginRequest = function(event)
  {
    getUser({ 
      params: {
        name: userName,
        password: password
      } 
    }); 

    event.preventDefault();
  };

  //
  // React Hooks
  //

  // Mark that the component has unmounted
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []);

  
  // Login Request Error Handling
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
      // If the user was not found reset the login form
      if(responseData.message === 'MISSING')
      {
        userMissing.current = true;

        resetUserName();
        resetPassword();
      }
      // If the password was incorrect reset the password field
      else if(responseData.message === 'INCORRECT_PASSWORD')
      {
        incorrectPassword.current = true;

        resetPassword();
      }
    }
    // Login was successful
    else
    {
      history.push('/baywheels');
    }

    // Only run this effect when response data from a login request has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [responseData, isError])

  return (
    <Container 
      maxWidth='xs' 
      fixed={true}
      className={classes.container}>
      <CssBaseline/>
      <Typography
        component='h1' 
        variant='h5' 
        align='center' 
        gutterBottom={true}>
        Login
      </Typography>
      <form onSubmit={sendLoginRequest}>
        <Tooltip 
          title='User could not be found'
          placement='right'
          open={userMissing.current}>
          <TextField 
            id='username'
            name='username' 
            label='Username'
            margin='normal'
            variant='filled'
            autoFocus
            fullWidth
            required
            onFocus={() => userMissing.current = false}
            {...bindUserName}
          />
        </Tooltip>
        <Tooltip 
          title='Password entered is incorrect'
          placement='right'
          open={incorrectPassword.current}>
          <TextField 
            id='password'
            name='password'
            label='Password'
            type='password'
            margin='normal'
            variant='filled'
            fullWidth
            required
            onFocus={() => incorrectPassword.current = false}
            {...bindPassword}
          />
        </Tooltip>
        <Tooltip 
          title='Username and Password fields must be filled'
          placement='right'
          disableHoverListener={isLoginReady}>
          <span>
            <Button
              type='submit'
              variant='outlined'
              color='primary'
              className={classes.submit}
              disabled={!isLoginReady || isLoading}
              fullWidth>
              Login
            </Button>
          </span>
        </Tooltip>
        <Grid container alignItems='center'>
          <Grid xs={9} item>
            <Link to='/forgot'>
              Forgot password?
            </Link>
          </Grid>
          <Grid xs={3} item>
            <Link to='/signup'>
              Need an account? Create one!
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};