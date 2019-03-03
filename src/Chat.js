import React, { Component } from 'react';
import Typing from 'react-typing-animation';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const styles = {
  input: {
    color: '#286efa',
    margin: '0px',
    padding: '0px',
    height: '100%',
    width: '100%',
    border: '0px',
    fontSize: '1em'
  },
  container: {
    width: '100%',
    display: 'flex'
  },
  chatsronautChat: {
    width: '400px',
    fontSize: '.9em',
    lineHeight: '1.2',
    fontFamily: '\'Roboto\', Helvetica, sans-serif',
    display: 'inline-block'
  },
  chatsronautOption: {
    color: '#286efa',
    border: '1px solid #286efa',
    backgroundColor: '#fff',
    marginLeft: 'auto',
    margin: '1px'
  },
  activeSelection: {
    color: '#fff',
    backgroundColor: '#286efa',
  },
  chatsronautPage: {
    color: 'black',
    backgroundColor: '#f5f5f5',
  },
  chatsronautUser: {
    marginLeft: 'auto'
  },
  chatsronautBubble: {
    maxWidth: '200px',
    backgroundColor: '#286efa',
    borderRadius: '5px',
    color: 'white',
    padding: '15px',
    margin: '5px'
  }
};

class OptionMessage extends Component {
  state = { active: false };
  hoverIn = () => this.setState({ active: true });
  hoverOut = () => this.setState({ active: false });

  render() {
    const style = Object.assign({}, styles.chatsronautBubble, styles.chatsronautOption, this.state.active ? styles.activeSelection : {});
    return (<div className="chatsronaut-message-container" style={styles.container} onClick={this.props.onClick}>
      <p className="chatsronaut-option" style={style} onMouseOver={this.hoverIn} onMouseOut={this.hoverOut}>
        {this.props.text}
      </p>
    </div>);
  }
}

class InputMessage extends Component {
  state = { input: '' };
  handleChange = event => this.setState({input: event.target.value});
  handleSubmit = event => {
    event.preventDefault();
    this.props.submit(this.state.input);
  };

  render() {
    const style = Object.assign({}, styles.chatsronautBubble, styles.chatsronautOption);
    return (<div className="chatsronaut-message-container" style={styles.container}>
      <form className="chatsronaut-option" style={style} onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} autoFocus={true} style={styles.input} />
        <input style={{display:'none'}} type="submit" value="Submit" />
      </form>
    </div>);
  }
}

class PageMessage extends Component {
  render() {
    const style = Object.assign({}, styles.chatsronautBubble, styles.chatsronautPage);
    const message = <div className="chatsronaut-message-container" style={styles.container}>
      <p className="chatsronaut-page" style={style}>
        {this.props.text}
      </p>
    </div>;

    if (this.props.rendered) {
      return message;
    }

    return <Typing hideCursor={true} speed={1}>{message}</Typing>;
  }
}

class UserMessage extends Component {
  render() {
    const style = Object.assign({}, styles.chatsronautBubble, styles.chatsronautUser);
    const message = <div className="chatsronaut-message-container" style={styles.container}>
      <p className="chatsronaut-user" style={style}>
        {this.props.text}
      </p>
    </div>;

    if (this.props.rendered) {
      return message;
    }

    return <Typing hideCursor={true} speed={1}>{message}</Typing>;
  }
}

class Chat extends Component {
  constructor(props) {
    super(props);
    const storageId = `chatsronaut:${props.chatId}`;
    const state = window.localStorage.getItem(storageId);
    this.submit = this.submit.bind(this);
    if (state) {
      this.state = JSON.parse(state);
      this.state.messages = this.state.messages
        .map(message => Object.assign(message, { rendered: true }));
    }

    if (!state) {
      this.state = {
        messages: [],
        queue: props.messages,
        branch: undefined,
        input: '',
        show: true
      };

      window.localStorage.setItem(storageId, JSON.stringify(this.state));
    }
  }

  componentDidMount() {
    if (this.state.messages.length === 0) this.addMessages();
  }

  componentWillUpdate(nextProps, nextState) {
    const storageId = `chatsronaut:${this.props.chatId}`;
    window.localStorage.setItem(storageId, JSON.stringify(nextState));
  }

  componentWillUnmount() {
    const storageId = `chatsronaut:${this.props.chatId}`;
    const messages = this.state.messages.map(m => Object.assign(m, { rendered: true }));
    const state = Object.assign({}, this.state, { messages });
    window.localStorage.setItem(storageId, JSON.stringify(state));
  }

  select(message) {
    this.addMessages([message]);
  }

  submit(input) {
    const message = this.state.messages[this.state.messages.length - 1];
    message.input = undefined;
    message.text = input;
    this.addMessages([message]);
  }

  async addMessages(messages) {
    const dequeue = !messages;
    messages = messages || this.state.queue
    .map((message, index) => Object.assign(message, {index}))
    .filter(message => !this.state.branch || message.branch === this.state.branch)
    .slice(0, 1);

    for (let message of messages) {
      if (message.delegate) message = await message.delegate(message);
      let branch = message.branch || this.state.branch;
      let queue = this.state.queue;
      if (dequeue) queue.splice(message.index, 1);
      let messages = this.state.messages;
      if (!dequeue) messages = this.state.messages.slice(0, -1);
      messages = messages.concat([message]);
      await new Promise(resolve => this.setState({ messages, queue, branch }, resolve));
      if (message.next) {
        if (!message.input && !message.options) {
          await delay(1600);
        }
        await this.addMessages();
      }
    }
  }

  render() {
    const messages = this.state.messages.map((data, i) => {
      if (data.options) return data.options.map((data, j) => <OptionMessage
        key={`${i}-${j}`}
        text={data.text}
        onClick={() => this.select(data)}
      />);

      if (data.input) return <InputMessage key={i} submit={this.submit} />;
      if (data.role === 'page') return <PageMessage rendered={data.rendered} key={i} text={data.text} />;
      if (data.role === 'user') return <UserMessage rendered={data.rendered} key={i} text={data.text} />;
      return <div></div>;
    });

    const style = Object.assign({}, styles.chatsronautChat, { width: this.props.width });
    return <div className="chatsronaut-chat" style={style}>{messages}</div>;
  }
}

export default Chat;
