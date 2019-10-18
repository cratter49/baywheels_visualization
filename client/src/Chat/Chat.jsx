// @flow

// React
import * as React from 'react';

type Props = {
    user: string
};

type State = {
    messages: ?Array<string>
};

class Chat extends React.Component<Props, State> {

    constructor(props: Props) 
    {
        super(props);
    }

    render() {
        return (
            <div>Chat</div>
        );
    }
}

export default Chat;