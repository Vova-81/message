import EventBus from '../event-bus';

interface MetaType {
  tagName: string;
  props: Record<string, any>;
}

interface ProxyConstructor {
  revocable<T extends Record<string, any>>(target: T, handler: any):
  { proxy: T; revoke: () => void; };

  new <T extends Record<string, any>>(target: T, handler: any): T;
}
declare const Proxy: ProxyConstructor;

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CDR: 'flow:component-did-render',
  };

  private _element: HTMLElement;

  private _meta: MetaType;

  props: Record<string, any>;

  eventBus: () => EventBus;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDR, this._componentDidRender.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  public init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {}

  private _componentDidRender(): void {
    this.componentDidRender();
  }

  componentDidRender(): void {}

  _componentDidUpdate(): void {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(): boolean {
    return true;
  }

  setProps = (nextProps: Record<string, any>): void => {
    if (!nextProps) {
      return;
    }

    (<any>Object).assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    const block = this.render();
    this.element.innerHTML = block;
    this.eventBus().emit(Block.EVENTS.FLOW_CDR);
  }

  render(): any {}

  getContent(): HTMLElement {
    return this._element;
  }

  _makePropsProxy(props: Record<string, any>) {
    const self = this;

    const proxyProps = new Proxy(props, {
      set(target: any, prop: any, value: any): boolean {
        target[prop] = value; // eslint-disable-line no-param-reassign

        self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });

    return proxyProps;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.className = 'fragment';
    return element;
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
