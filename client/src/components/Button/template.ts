export default `
<button
  {{#if id}}
    id="{{ id }}"
  {{/if}}
  type="{{ htmlType }}"
  class="button {{ className }}"
  onclick="{{ onClick }}"
  {{#if disabled}}disabled{{/if}}
>
  {{{ children }}}
</button>
`;
