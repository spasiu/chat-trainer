class ChatContainer extends HTMLUListElement {
  constructor() {
    super();
  }
}

customElements.define('chat-container', ChatContainer, {
  extends: 'ul'
});
