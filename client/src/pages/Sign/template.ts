const githubLink = 'https://github.com/artemplv/QuickChat-AI';
const linkedinLink = 'https://www.linkedin.com/in/artemplv';

export default `
<div class="sign-view {{#if isLoading}} busy {{/if}}">
    {{{ form }}}

    <div class="footer">
        <div class="footer__public-links">
            <a class="button-link" href=${githubLink} target="_blank">
                <img src="static/assets/images/github-icon.svg" alt="Github logo" />
                GitHub
            </a>
            <a class="button-link" href=${linkedinLink} target="_blank">
                <img src="static/assets/images/linkedin-icon.svg" alt="LinkedIn logo" />
                LinkedIn
            </a>
        </div>

        <span class="footer__creator">@artemplv</span>
    </div>
</div>
`;
