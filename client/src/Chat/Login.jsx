// React
import React, { useState } from 'react';

// Hooks
import { useInput } from '../Hooks';

// Utilities
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Material-UI
import { Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from '@material-ui/core';

type Props = {
  cookie: ?string
}

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

export default function Login(props: Props)
{
  const classes = useStyles();

  // State with custom input hooks
  const { value: userName, bind: bindUserName, reset: resetUserName } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

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
        Login
      </Typography>
      <form method='get'>
        <TextField 
          id='username'
          name='username' 
          label='Username'
          margin='normal'
          variant='filled'
          autoFocus
          fullWidth
          required
          {...bindUserName}
        />
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
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          className={classes.submit}
          disabled={!(userName && password)}
          fullWidth>
          Login
        </Button>
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