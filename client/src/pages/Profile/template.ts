export default `
  <div class="profile-view {{#if loading}}busy{{/if}}">

  <div class="go-back-section">
    {{{ goBackButton }}}
  </div>

  <main>
    <div class="profile-data-wrapper">
      <div class="profile-data">
        <div
          class="profile-data__avatar"
          {{ addAvatar avatarUrl }}
        >
          {{{ changeAvatarButton }}}
        </div>

        {{{ changeDataForm }}}
        {{{ changePasswordForm }}}

        <div class="profile-data__control-buttons">
          {{{ changeDataButton }}}

          <div class="divider"></div>

          {{{ changePasswordButton }}}

          <div class="divider"></div>

          {{{ logoutButton }}}
        </div>

      </div>
    </div>
  </main>

  <div id="uploadAvatarModal" class="modal-wrapper">
    <div class="modal-body">
      <h4 class="modal-body__name">Upload a picture</h4>

      <form id="avatarForm" class="form" enctype="multipart/form-data">
        <div class="file-container">
          <div class="upload-control">
            <label for="avatar" class="file-upload-label">Choose file</label>
            <span class="file-upload__extra">(max 5 MB)</span>
            <input id="avatar" class="file-upload-input" name="image" type="file" accept=".jpg, .jpeg, .png">
          </div>
          <p class="file-name"></p>
        </div>

        <button type="submit" class="button button_main">
          Confirm
        </button>
      </form>

      <p class="modal-body__error-msg">File is not selected</p>
    </div>
  </div>

  </div>
`;
