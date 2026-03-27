export default `
  <div class="chat-block {{#if loading}}busy{{/if}}">
    <div class="chat-block__info-row">
      <div class="avatar-with-name">
        <div
          class="avatar chat-avatar"
          {{ addAvatar avatarUrl }}
        >
        </div>
        <h4 class="chat-list-item__name">{{ chatName }}</h4>
      </div>

      <div style="display: flex;">
        <div class="dropdown">
          {{{ chatMembersDropdownButton }}}

          <div class="dropdown-content dropdown-content_bottom dropdown-content_wide">
            <ul class="base-list">
              {{#each chatMembers}}
                <li style="padding: 5px 10px;">
                  <div class="avatar-with-name">
                    <div
                      class="avatar user-avatar"
                      {{ addAvatar this.avatar }}
                    >
                    </div>
                    <h4 class="chat-list-item__name">
                      {{ this.firstName }}
                      {{ this.lastName }}
                      ({{ this.username }})
                      {{#if (areEqual ../loggedUserId this.id) }}
                        <span class="self-user-tag">you</span>
                      {{/if}}
                    </h4>
                  </div>
                </li>
              {{/each}}
            </ul>
          </div>
        </div>

        <div class="dropdown">
          {{{ chatOptionsDropdownButton }}}

          <div class="dropdown-content dropdown-content_bottom">
            <ul class="base-list">
              <li>
                {{{ addUserButton }}}
              </li>
              <li>
                {{{ deleteUserButton }}}
              </li>
              <li>
                {{{ deleteChatButton }}}
              </li>
              {{#if (areEqual chatType 'ai') }}
                <li>
                  {{{ resetPromptButton }}}
                </li>
              {{/if}}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-block__messages">
      {{#each messages}}
        <div
          class="
            message
            {{#if (areEqual ../loggedUserId this.userId)}}
              message__outgoing
            {{else}}
              message__incoming
            {{/if}}
          "
        >
          {{#if (areEqual this.contentType 'image')}}
            <img src={{ this.content }} class="message__image-content" />
          {{else}}
            <p class="message__content">{{ this.content }}</p>
          {{/if}}
          <p class="message__timestamp">{{ formatTime this.createdAt }}</p>
        </div>
      {{/each}}
    </div>

    <div class="chat-block__create-message-row">
      <div class="dropdown {{#if disabled}}disabled{{/if}}">
        {{{ messageOptionsButton }}}

        <div class="dropdown-content dropdown-content_top">
          <ul class="base-list">
            <li>
              {{{ addMediaButton }}}
            </li>
            <li>
              {{{ addFileButton }}}
            </li>
            <li>
              {{{ addLocationButton }}}
            </li>
          </ul>
        </div>
      </div>
      {{{ newMessageForm }}}
    </div>

    <div id="add-user-modal" class="modal-wrapper">
      <form id="addUser" class="modal-body">
        <h4 class="modal-body__name">Add user</h4>

        <div class="form-field">
          <div class="form-field__control">
            <input id="login-add" name="username" type="text" class="form-field__input" placeholder=" "  />
            <label for="login-add" class="form-field__label">Username</label>
            <div class="form-field__bar"></div>
          </div>
        </div>

        <button type="submit" class="button button_main">
          Confirm
        </button>
      </form>
    </div>

    <div id="remove-user-modal" class="modal-wrapper">
      <form id="removeUser" class="modal-body">
        <h4 class="modal-body__name">Remove user</h4>

        <div class="form-field">
          <div class="form-field__control">
            <input id="login-remove" name="username" type="text" class="form-field__input" placeholder=" " />
            <label for="login-remove" class="form-field__label">Username</label>
            <div class="form-field__bar"></div>
          </div>
        </div>

        <button type="submit" class="button button_main">
          Confirm
        </button>
      </form>
    </div>

    <div id="delete-chat-modal" class="modal-wrapper">
      <div class="modal-body">
        <h4 class="modal-body__name">Delete this chat?</h4>

        <button type="submit" class="button button_main">
          Confirm
        </button>
      </div>
    </div>

    <div id="upload-image-to-chat-modal" class="modal-wrapper">
      <div class="modal-body">
        <h4 class="modal-body__name">Send an image</h4>

        <form id="message-image-form" class="form" enctype="multipart/form-data">
          <div class="file-container">
            <div class="upload-control">
              <label for="message-file" class="file-upload-label">Choose file</label>
              <span class="file-upload__extra">(max 5 MB)</span>
              <input id="message-file" class="file-upload-input" name="image" type="file" accept=".jpg, .jpeg, .png">
            </div>
            <p class="file-name"></p>
          </div>

          <button type="submit" class="button button_main">
            Send
          </button>
        </form>

        <p class="modal-body__error-msg">File is not selected</p>
      </div>
    </div>

  </div>
`;
