export default `
  <div class="chats-view">
    {{{ chats }}}

    {{#if selectedChatId}}
      {{{ feed }}}
    {{else}}
      <div class="chat-feed-empty">
        <p>Select chat to send a message</p>
      </div>
    {{/if}}
  </div>
`;
