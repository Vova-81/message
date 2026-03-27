const githubLink = 'https://github.com/artemplv/QuickChat-AI';
const linkedinLink = 'https://www.linkedin.com/in/artemplv';

export default `
  <div class="chats {{#if selectedChatId}}mobile-hidden{{/if}}">
    
    <div class="chats_header">
      <div class="chats_header__links">

        <div class="chats_header__public-links">
          <a class="button-link" href=${githubLink} target="_blank">
            <img src="static/assets/images/github-icon.svg" alt="github logo" />
          </a>
          <a class="button-link" href=${linkedinLink} target="_blank">
            <img src="static/assets/images/linkedin-icon.svg" alt="linkedIn logo" />
          </a>
        </div>

        {{{ profileButton }}}
      </div>

      <form id="searchForm" class="search-form">
        <input name="search" type="text" class="search__input" placeholder="Search" />
      </form>
    </div>

    <nav class="chats-container">

      <div style="text-align: center; margin-bottom: 10px;">
        {{{ createChatButton }}}
      </div>

      <ul class="chats-container__list">
        {{#each chatsList}}
          <li class="chat-list-item {{#if (areEqual this.id ../selectedChatId)}}selected{{/if}}"
            key={{ this.id }}
            onclick="navigate('/chats/{{ this.id }}')"
          >
            <div class="avatar" {{ addAvatar this.avatar }}></div>
            
            <div class="chat-list-item__info">
              <div class="chat-list-item__name-container">
                <h4 class="chat-list-item__name">{{ this.name }}</h4>
                <p class="chat-list-item__last-message-time">
                  {{ formatDateTime this.lastMessage.createdAt }}
                </p>
              </div>

              <div class="chat-list-item__last-message-container">
                <p class="chat-list-item__last-message-text">
                  {{#if (areEqual ../loggedUserId this.lastMessage.userId) }}
                    <span class="last-message-from-user-label">
                      You:&nbsp;
                    </span>
                  {{/if}}

                  {{#if (areEqual this.lastMessage.contentType 'image')}}
                    <i>Photo</i>
                  {{else}}
                    {{ this.lastMessage.content }}
                  {{/if}}
                </p>
                
                {{#unless (isLessThanOne this.unreadMessagesCount)}}
                  <div class="chat-list-item__unread-message-count">
                    <span class="chat-list-item__unread-message-count-number">{{ this.unreadMessagesCount }}</span>
                  </div>
                {{/unless}}
              </div>
            </div>
          </li>
        {{/each}}
      </ul>
    </nav>

    <div id="create-chat-modal" class="modal-wrapper">
      <form id="newChat" class="modal-body">
        <h4 class="modal-body__name">Create new chat</h4>

        <div class="form-field">
          <div class="form-field__control">
            <input id="chat-add-title" name="name" type="text" class="form-field__input" placeholder=" "  />
            <label for="chat-add-title" class="form-field__label">Chat name</label>
            <div class="form-field__bar"></div>
          </div>
        </div>

        <button type="submit" class="button button_main">
          Create
        </button>
      </form>
    </div>
  </div>
`;
