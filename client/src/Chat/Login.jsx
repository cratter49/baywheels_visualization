// Built using examples:
//  Async Button Hook - https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-
//  Login Page Layout - https://material-ui.com/getting-started/templates/

// React
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Hooks
import { useInput } from '../Hooks';

// Utilities
import axios from 'axios';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

  // Custom input hooks
  const { value: userName, bind: bindUserName, reset: resetUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  //
  // Refs
  //

  const isMounted = useRef(true);
  const incorrectPassword = useRef(false);
  const userMissing = useRef(false);

  //
  // Vars
  //

  // The login is ready if t he username and password are populated
  let isLoginReady = !!(userName && password)

  //
  // React Hooks
  //

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []);

  const sendLoginRequest = useCallback(async () => {
    let response;

    // If the request is still sending don't send another request
    if(isSending)
      return;

    setIsSending(true);

    try 
    {
      response = await axios.get('http://localhost:3001/api/getUser', {
        params: {
          name: userName,
          password: password 
        }
      });
    }
    catch(err) 
    { 
      console.error(err)
    }
    finally 
    {
      // Only allow another request to go through if the component is still mounted
      if(isMounted.current)
        setIsSending(false);
    }

    // Handled Errors
    if(!response.data.success)
    {
      if(response.data.message === 'MISSING')
      {
        userMissing.current = true;

        // If the user was not found reset the login form
        resetUserName();
        resetPassword();
      }
      else if(response.data.message === 'INCORRECT_PASSWORD')
      {
        incorrectPassword.current = true;

        resetPassword();
      }
    }
  }, [userName, password, isSending, resetUserName, resetPassword]);

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
      <form noValidate>
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
              disabled={!isLoginReady || isSending}
              fullWidth
              onClick={sendLoginRequest}>
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