// @flow

// React
import * as React from 'react';

function Signup() {
    return (
      <React.Fragment>
        <input
          type="text"
          onChange={(e) => null}
          placeholder="Username"
          style={{ width: '200px' }}
        />
        <input
          type="text"
          onChange={(e) => null}
          placeholder="Password"
          style={{ width: '200px' }}
        />
      </React.Fragment>
    );
}

export default Signup;