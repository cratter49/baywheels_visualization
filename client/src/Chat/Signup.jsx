// React
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Hooks
import { useInput } from '../Hooks';

// Material-UI
import { Button, Container, CssBaseline, Grid, makeStyles, TextField, Tooltip, Typography } from '@material-ui/core';

// Utilities
import axios from 'axios';

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

  // Custom input hooks
  const { value: userName, bind: bindUserName, reset: resetUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword } = useInput('');

  const [isSending, setIsSending] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true);

  //
  // Refs
  //

  const isMounted = useRef(true);

  //
  // Vars
  //

  let isSignupReady = !!(userName && password && confirmPassword)

  //
  // React Hooks
  //

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []);

  const sendSignupRequest = useCallback(async () => {
    let response;

    // If the request is still sending don't send another request
    if(isSending)
      return;

    if(password !== confirmPassword)
    {
      resetPassword();
      resetConfirmPassword();

      setIsInputValid(false);
    }

    setIsSending(true);

    try {
      response = await axios.post('http://localhost:3001/api/createUser', {
        body: {
          name: userName,
          password: password 
        }
      });
    }
    catch(err) {
      console.error(err)
    }

    // If the user already exists reset the signup form
    if(response.data.err)
    {
      resetUserName();
      resetPassword();
      resetConfirmPassword();
    }

    // Only allow another request to go through if the component is still mounted
    if(isMounted.current)
      setIsSending(false);
  }, [userName, password, confirmPassword, isSending, resetUserName, resetPassword, resetConfirmPassword]);

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
      <form noValidate>
        <TextField 
          id='username'
          name='username' 
          label='Username'
          margin='normal'
          variant='outlined'
          autoFocus
          fullWidth
          required
          {...bindUserName}
        />
        <Tooltip
          title='Passwords must match'
          placement='right'
          open={false}>
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
          title='Username and Password fields must be filled'
          disableHoverListener={isSignupReady}
          placement='bottom'>
          <span>
            <Button
              type='submit'
              variant='outlined'
              color='primary'
              className={classes.submit}
              disabled={!isSignupReady || isSending}
              fullWidth
              onClick={sendSignupRequest}>
              Create Account
            </Button>
          </span>
        </Tooltip>
      </form>
    </Container>
  );
};