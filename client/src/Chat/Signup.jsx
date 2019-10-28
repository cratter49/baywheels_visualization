// React
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Hooks
import { useInput } from '../Hooks';

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

export default function Signup(props: Props) 
{
  const classes = useStyles();

  // State with custom input hooks
  const { value: userName, bind: bindUserName, reset: resetUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword, reset: resetConfirmPassword } = useInput('');

  const [isSending, setIsSending] = useState(false);
  const [isInputValid, setIsInputValid] = useState(true);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []);

  const sendSignupRequest = useCallback(async () => {
    let response;

    if(password !== confirmPassword)
    {
      resetPassword();
      resetConfirmPassword();

      setIsInputValid(false);
    }

    // If the request is still sending don't send another request
    if(isSending)
      return;

    setIsSending(true);

    try {
      response = await axios.post('http://localhost:3001/api/createUser', {
        params: {
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
      console.log(response.data.err);
      resetUserName();
      resetPassword();
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
        <Tooltip>
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
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          className={classes.submit}
          disabled={!(userName && password && confirmPassword) || isSending}
          fullWidth
          onClick={sendSignupRequest}>
          Create Account
        </Button>
      </form>
    </Container>
  );
};