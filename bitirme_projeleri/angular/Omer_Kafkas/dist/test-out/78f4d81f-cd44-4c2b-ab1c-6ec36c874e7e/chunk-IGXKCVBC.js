import {
  CommonModule,
  DomAdapter,
  PLATFORM_BROWSER_ID,
  getDOM,
  init_common,
  setRootDomAdapter
} from "./chunk-SXORY76G.js";
import {
  XhrFactory,
  parseCookieValue
} from "./chunk-2AU2PRRG.js";
import {
  ANIMATIONS_DISABLED,
  APP_ID,
  ApplicationModule,
  CSP_NONCE,
  DOCUMENT,
  ErrorHandler,
  FactoryTarget,
  INJECTOR_SCOPE,
  Inject,
  Injectable,
  InjectionToken,
  MAX_ANIMATION_TIMEOUT,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  PLATFORM_INITIALIZER,
  RendererFactory2,
  RendererStyleFlags2,
  RuntimeError,
  TESTABILITY,
  TESTABILITY_GETTER,
  Testability,
  TestabilityRegistry,
  TracingService,
  ViewEncapsulation,
  __esm,
  _global,
  core_exports,
  createPlatformFactory,
  getAnimationElementRemovalRegistry,
  init_core,
  inject,
  platformCore,
  setDocument,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-FTL7MPRH.js";

// node_modules/@angular/platform-browser/fesm2022/dom_renderer.mjs
function removeElements(elements) {
  for (const element of elements) {
    element.remove();
  }
}
function createStyleElement(style, doc) {
  const styleElement = doc.createElement("style");
  styleElement.textContent = style;
  return styleElement;
}
function addServerStyles(doc, appId, inline, external) {
  const elements = doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${appId}"],link[${APP_ID_ATTRIBUTE_NAME}="${appId}"]`);
  if (elements) {
    for (const styleElement of elements) {
      styleElement.removeAttribute(APP_ID_ATTRIBUTE_NAME);
      if (styleElement instanceof HTMLLinkElement) {
        external.set(styleElement.href.slice(styleElement.href.lastIndexOf("/") + 1), {
          usage: 0,
          elements: [styleElement]
        });
      } else if (styleElement.textContent) {
        inline.set(styleElement.textContent, { usage: 0, elements: [styleElement] });
      }
    }
  }
}
function createLinkElement(url, doc) {
  const linkElement = doc.createElement("link");
  linkElement.setAttribute("rel", "stylesheet");
  linkElement.setAttribute("href", url);
  return linkElement;
}
function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimStylesContent(compId, styles) {
  return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
function addBaseHrefToCssSourceMap(baseHref, styles) {
  if (!baseHref) {
    return styles;
  }
  const absoluteBaseHrefUrl = new URL(baseHref, "http://localhost");
  return styles.map((cssContent) => {
    if (!cssContent.includes("sourceMappingURL=")) {
      return cssContent;
    }
    return cssContent.replace(SOURCEMAP_URL_REGEXP, (_, sourceMapUrl) => {
      if (sourceMapUrl[0] === "/" || sourceMapUrl.startsWith("data:") || PROTOCOL_REGEXP.test(sourceMapUrl)) {
        return `/*# sourceMappingURL=${sourceMapUrl} */`;
      }
      const { pathname: resolvedSourceMapUrl } = new URL(sourceMapUrl, absoluteBaseHrefUrl);
      return `/*# sourceMappingURL=${resolvedSourceMapUrl} */`;
    });
  });
}
function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new RuntimeError(5105, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Make sure \`provideAnimationsAsync()\`, \`provideAnimations()\` or \`provideNoopAnimations()\` call was added to a list of providers used to bootstrap an application.
  - There is a corresponding animation configuration named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.dev/api/core/Component#animations).`);
  }
}
function isTemplateNode(node) {
  return node.tagName === "TEMPLATE" && node.content !== void 0;
}
var EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin, APP_ID_ATTRIBUTE_NAME, SharedStylesHost, NAMESPACE_URIS, COMPONENT_REGEX, SOURCEMAP_URL_REGEXP, PROTOCOL_REGEXP, COMPONENT_VARIABLE, HOST_ATTR, CONTENT_ATTR, REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT, REMOVE_STYLES_ON_COMPONENT_DESTROY, DomRendererFactory2, DefaultDomRenderer2, AT_CHARCODE, ShadowDomRenderer, NoneEncapsulationDomRenderer, EmulatedEncapsulationDomRenderer2;
var init_dom_renderer = __esm({
  "node_modules/@angular/platform-browser/fesm2022/dom_renderer.mjs"() {
    "use strict";
    init_common();
    init_core();
    init_core();
    EVENT_MANAGER_PLUGINS = new InjectionToken(ngDevMode ? "EventManagerPlugins" : "");
    EventManager = class _EventManager {
      _zone;
      _plugins;
      _eventNameToPlugin = /* @__PURE__ */ new Map();
      /**
       * Initializes an instance of the event-manager service.
       */
      constructor(plugins, _zone) {
        this._zone = _zone;
        plugins.forEach((plugin) => {
          plugin.manager = this;
        });
        this._plugins = plugins.slice().reverse();
      }
      /**
       * Registers a handler for a specific element and event.
       *
       * @param element The HTML element to receive event notifications.
       * @param eventName The name of the event to listen for.
       * @param handler A function to call when the notification occurs. Receives the
       * event object as an argument.
       * @param options Options that configure how the event listener is bound.
       * @returns  A callback function that can be used to remove the handler.
       */
      addEventListener(element, eventName, handler, options) {
        const plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler, options);
      }
      /**
       * Retrieves the compilation zone in which event listeners are registered.
       */
      getZone() {
        return this._zone;
      }
      /** @internal */
      _findPluginFor(eventName) {
        let plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
          return plugin;
        }
        const plugins = this._plugins;
        plugin = plugins.find((plugin2) => plugin2.supports(eventName));
        if (!plugin) {
          throw new RuntimeError(5101, (typeof ngDevMode === "undefined" || ngDevMode) && `No event manager plugin found for event ${eventName}`);
        }
        this._eventNameToPlugin.set(eventName, plugin);
        return plugin;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _EventManager, deps: [{ token: EVENT_MANAGER_PLUGINS }, { token: NgZone }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _EventManager });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: EventManager, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [EVENT_MANAGER_PLUGINS]
    }] }, { type: NgZone }] });
    EventManagerPlugin = class {
      _doc;
      // TODO: remove (has some usage in G3)
      constructor(_doc) {
        this._doc = _doc;
      }
      // Using non-null assertion because it's set by EventManager's constructor
      manager;
    };
    APP_ID_ATTRIBUTE_NAME = "ng-app-id";
    SharedStylesHost = class _SharedStylesHost {
      doc;
      appId;
      nonce;
      /**
       * Provides usage information for active inline style content and associated HTML <style> elements.
       * Embedded styles typically originate from the `styles` metadata of a rendered component.
       */
      inline = /* @__PURE__ */ new Map();
      /**
       * Provides usage information for active external style URLs and the associated HTML <link> elements.
       * External styles typically originate from the `ɵɵExternalStylesFeature` of a rendered component.
       */
      external = /* @__PURE__ */ new Map();
      /**
       * Set of host DOM nodes that will have styles attached.
       */
      hosts = /* @__PURE__ */ new Set();
      constructor(doc, appId, nonce, platformId = {}) {
        this.doc = doc;
        this.appId = appId;
        this.nonce = nonce;
        addServerStyles(doc, appId, this.inline, this.external);
        this.hosts.add(doc.head);
      }
      /**
       * Adds embedded styles to the DOM via HTML `style` elements.
       * @param styles An array of style content strings.
       */
      addStyles(styles, urls) {
        for (const value of styles) {
          this.addUsage(value, this.inline, createStyleElement);
        }
        urls?.forEach((value) => this.addUsage(value, this.external, createLinkElement));
      }
      /**
       * Removes embedded styles from the DOM that were added as HTML `style` elements.
       * @param styles An array of style content strings.
       */
      removeStyles(styles, urls) {
        for (const value of styles) {
          this.removeUsage(value, this.inline);
        }
        urls?.forEach((value) => this.removeUsage(value, this.external));
      }
      addUsage(value, usages, creator) {
        const record = usages.get(value);
        if (record) {
          if ((typeof ngDevMode === "undefined" || ngDevMode) && record.usage === 0) {
            record.elements.forEach((element) => element.setAttribute("ng-style-reused", ""));
          }
          record.usage++;
        } else {
          usages.set(value, {
            usage: 1,
            elements: [...this.hosts].map((host) => this.addElement(host, creator(value, this.doc)))
          });
        }
      }
      removeUsage(value, usages) {
        const record = usages.get(value);
        if (record) {
          record.usage--;
          if (record.usage <= 0) {
            removeElements(record.elements);
            usages.delete(value);
          }
        }
      }
      ngOnDestroy() {
        for (const [, { elements }] of [...this.inline, ...this.external]) {
          removeElements(elements);
        }
        this.hosts.clear();
      }
      /**
       * Adds a host node to the set of style hosts and adds all existing style usage to
       * the newly added host node.
       *
       * This is currently only used for Shadow DOM encapsulation mode.
       */
      addHost(hostNode) {
        this.hosts.add(hostNode);
        for (const [style, { elements }] of this.inline) {
          elements.push(this.addElement(hostNode, createStyleElement(style, this.doc)));
        }
        for (const [url, { elements }] of this.external) {
          elements.push(this.addElement(hostNode, createLinkElement(url, this.doc)));
        }
      }
      removeHost(hostNode) {
        this.hosts.delete(hostNode);
      }
      addElement(host, element) {
        if (this.nonce) {
          element.setAttribute("nonce", this.nonce);
        }
        if (false) {
          element.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
        }
        return host.appendChild(element);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _SharedStylesHost });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: SharedStylesHost, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: Document, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }, { type: void 0, decorators: [{
      type: Inject,
      args: [APP_ID]
    }] }, { type: void 0, decorators: [{
      type: Inject,
      args: [CSP_NONCE]
    }, {
      type: Optional
    }] }, { type: void 0, decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }] }] });
    NAMESPACE_URIS = {
      "svg": "http://www.w3.org/2000/svg",
      "xhtml": "http://www.w3.org/1999/xhtml",
      "xlink": "http://www.w3.org/1999/xlink",
      "xml": "http://www.w3.org/XML/1998/namespace",
      "xmlns": "http://www.w3.org/2000/xmlns/",
      "math": "http://www.w3.org/1998/Math/MathML"
    };
    COMPONENT_REGEX = /%COMP%/g;
    SOURCEMAP_URL_REGEXP = /\/\*#\s*sourceMappingURL=(.+?)\s*\*\//;
    PROTOCOL_REGEXP = /^https?:/;
    COMPONENT_VARIABLE = "%COMP%";
    HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
    CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
    REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
    REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken(ngDevMode ? "RemoveStylesOnCompDestroy" : "", {
      providedIn: "root",
      factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT
    });
    DomRendererFactory2 = class _DomRendererFactory2 {
      eventManager;
      sharedStylesHost;
      appId;
      removeStylesOnCompDestroy;
      doc;
      platformId;
      ngZone;
      nonce;
      animationDisabled;
      maxAnimationTimeout;
      tracingService;
      rendererByCompId = /* @__PURE__ */ new Map();
      defaultRenderer;
      platformIsServer;
      registry;
      constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, platformId, ngZone, nonce = null, animationDisabled, maxAnimationTimeout, tracingService = null) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        this.doc = doc;
        this.platformId = platformId;
        this.ngZone = ngZone;
        this.nonce = nonce;
        this.animationDisabled = animationDisabled;
        this.maxAnimationTimeout = maxAnimationTimeout;
        this.tracingService = tracingService;
        this.platformIsServer = false;
        this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.platformIsServer, this.tracingService, this.registry = getAnimationElementRemovalRegistry(), this.maxAnimationTimeout);
      }
      createRenderer(element, type) {
        if (!element || !type) {
          return this.defaultRenderer;
        }
        if (false) {
          type = __spreadProps(__spreadValues({}, type), { encapsulation: ViewEncapsulation.Emulated });
        }
        const renderer = this.getOrCreateRenderer(element, type);
        if (renderer instanceof EmulatedEncapsulationDomRenderer2) {
          renderer.applyToHost(element);
        } else if (renderer instanceof NoneEncapsulationDomRenderer) {
          renderer.applyStyles();
        }
        return renderer;
      }
      getOrCreateRenderer(element, type) {
        const rendererByCompId = this.rendererByCompId;
        let renderer = rendererByCompId.get(type.id);
        if (!renderer) {
          const doc = this.doc;
          const ngZone = this.ngZone;
          const eventManager = this.eventManager;
          const sharedStylesHost = this.sharedStylesHost;
          const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
          const platformIsServer = this.platformIsServer;
          const tracingService = this.tracingService;
          switch (type.encapsulation) {
            case ViewEncapsulation.Emulated:
              renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, this.registry, this.animationDisabled, this.maxAnimationTimeout);
              break;
            case ViewEncapsulation.ShadowDom:
              return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer, tracingService, this.registry, this.maxAnimationTimeout);
            default:
              renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, this.registry, this.animationDisabled, this.maxAnimationTimeout);
              break;
          }
          rendererByCompId.set(type.id, renderer);
        }
        return renderer;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      /**
       * Used during HMR to clear any cached data about a component.
       * @param componentId ID of the component that is being replaced.
       */
      componentReplaced(componentId) {
        this.rendererByCompId.delete(componentId);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomRendererFactory2, deps: [{ token: EventManager }, { token: SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: NgZone }, { token: CSP_NONCE }, { token: ANIMATIONS_DISABLED }, { token: MAX_ANIMATION_TIMEOUT }, { token: TracingService, optional: true }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomRendererFactory2 });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: DomRendererFactory2, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: EventManager }, { type: SharedStylesHost }, { type: void 0, decorators: [{
      type: Inject,
      args: [APP_ID]
    }] }, { type: void 0, decorators: [{
      type: Inject,
      args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
    }] }, { type: Document, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }, { type: Object, decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }] }, { type: NgZone }, { type: void 0, decorators: [{
      type: Inject,
      args: [CSP_NONCE]
    }] }, { type: void 0, decorators: [{
      type: Inject,
      args: [ANIMATIONS_DISABLED]
    }] }, { type: void 0, decorators: [{
      type: Inject,
      args: [MAX_ANIMATION_TIMEOUT]
    }] }, { type: TracingService, decorators: [{
      type: Inject,
      args: [TracingService]
    }, {
      type: Optional
    }] }] });
    DefaultDomRenderer2 = class {
      eventManager;
      doc;
      ngZone;
      platformIsServer;
      tracingService;
      registry;
      maxAnimationTimeout;
      data = /* @__PURE__ */ Object.create(null);
      /**
       * By default this renderer throws when encountering synthetic properties
       * This can be disabled for example by the AsyncAnimationRendererFactory
       */
      throwOnSyntheticProps = true;
      constructor(eventManager, doc, ngZone, platformIsServer, tracingService, registry, maxAnimationTimeout) {
        this.eventManager = eventManager;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platformIsServer = platformIsServer;
        this.tracingService = tracingService;
        this.registry = registry;
        this.maxAnimationTimeout = maxAnimationTimeout;
      }
      destroy() {
      }
      destroyNode = null;
      createElement(name, namespace) {
        if (namespace) {
          return this.doc.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
        }
        return this.doc.createElement(name);
      }
      createComment(value) {
        return this.doc.createComment(value);
      }
      createText(value) {
        return this.doc.createTextNode(value);
      }
      appendChild(parent, newChild) {
        const targetParent = isTemplateNode(parent) ? parent.content : parent;
        targetParent.appendChild(newChild);
      }
      insertBefore(parent, newChild, refChild) {
        if (parent) {
          const targetParent = isTemplateNode(parent) ? parent.content : parent;
          targetParent.insertBefore(newChild, refChild);
        }
      }
      removeChild(_parent, oldChild) {
        const { elements } = this.registry;
        if (elements) {
          elements.animate(oldChild, () => oldChild.remove(), this.maxAnimationTimeout);
          return;
        }
        oldChild.remove();
      }
      selectRootElement(selectorOrNode, preserveContent) {
        let el = typeof selectorOrNode === "string" ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
        if (!el) {
          throw new RuntimeError(-5104, (typeof ngDevMode === "undefined" || ngDevMode) && `The selector "${selectorOrNode}" did not match any elements`);
        }
        if (!preserveContent) {
          el.textContent = "";
        }
        return el;
      }
      parentNode(node) {
        return node.parentNode;
      }
      nextSibling(node) {
        return node.nextSibling;
      }
      setAttribute(el, name, value, namespace) {
        if (namespace) {
          name = namespace + ":" + name;
          const namespaceUri = NAMESPACE_URIS[namespace];
          if (namespaceUri) {
            el.setAttributeNS(namespaceUri, name, value);
          } else {
            el.setAttribute(name, value);
          }
        } else {
          el.setAttribute(name, value);
        }
      }
      removeAttribute(el, name, namespace) {
        if (namespace) {
          const namespaceUri = NAMESPACE_URIS[namespace];
          if (namespaceUri) {
            el.removeAttributeNS(namespaceUri, name);
          } else {
            el.removeAttribute(`${namespace}:${name}`);
          }
        } else {
          el.removeAttribute(name);
        }
      }
      addClass(el, name) {
        el.classList.add(name);
      }
      removeClass(el, name) {
        el.classList.remove(name);
      }
      setStyle(el, style, value, flags) {
        if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
          el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? "important" : "");
        } else {
          el.style[style] = value;
        }
      }
      removeStyle(el, style, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
          el.style.removeProperty(style);
        } else {
          el.style[style] = "";
        }
      }
      setProperty(el, name, value) {
        if (el == null) {
          return;
        }
        (typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(name, "property");
        el[name] = value;
      }
      setValue(node, value) {
        node.nodeValue = value;
      }
      listen(target, event, callback, options) {
        (typeof ngDevMode === "undefined" || ngDevMode) && this.throwOnSyntheticProps && checkNoSyntheticProp(event, "listener");
        if (typeof target === "string") {
          target = getDOM().getGlobalEventTarget(this.doc, target);
          if (!target) {
            throw new RuntimeError(5102, (typeof ngDevMode === "undefined" || ngDevMode) && `Unsupported event target ${target} for event ${event}`);
          }
        }
        let wrappedCallback = this.decoratePreventDefault(callback);
        if (this.tracingService?.wrapEventListener) {
          wrappedCallback = this.tracingService.wrapEventListener(target, event, wrappedCallback);
        }
        return this.eventManager.addEventListener(target, event, wrappedCallback, options);
      }
      decoratePreventDefault(eventHandler) {
        return (event) => {
          if (event === "__ngUnwrap__") {
            return eventHandler;
          }
          const allowDefaultBehavior = false ? this.ngZone.runGuarded(() => eventHandler(event)) : eventHandler(event);
          if (allowDefaultBehavior === false) {
            event.preventDefault();
          }
          return void 0;
        };
      }
    };
    AT_CHARCODE = (() => "@".charCodeAt(0))();
    ShadowDomRenderer = class extends DefaultDomRenderer2 {
      sharedStylesHost;
      hostEl;
      shadowRoot;
      constructor(eventManager, sharedStylesHost, hostEl, component, doc, ngZone, nonce, platformIsServer, tracingService, registry, maxAnimationTimeout) {
        super(eventManager, doc, ngZone, platformIsServer, tracingService, registry, maxAnimationTimeout);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.shadowRoot = hostEl.attachShadow({ mode: "open" });
        this.sharedStylesHost.addHost(this.shadowRoot);
        let styles = component.styles;
        if (ngDevMode) {
          const baseHref = getDOM().getBaseHref(doc) ?? "";
          styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        styles = shimStylesContent(component.id, styles);
        for (const style of styles) {
          const styleEl = document.createElement("style");
          if (nonce) {
            styleEl.setAttribute("nonce", nonce);
          }
          styleEl.textContent = style;
          this.shadowRoot.appendChild(styleEl);
        }
        const styleUrls = component.getExternalStyles?.();
        if (styleUrls) {
          for (const styleUrl of styleUrls) {
            const linkEl = createLinkElement(styleUrl, doc);
            if (nonce) {
              linkEl.setAttribute("nonce", nonce);
            }
            this.shadowRoot.appendChild(linkEl);
          }
        }
      }
      nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
      }
      appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
      }
      insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
      }
      removeChild(_parent, oldChild) {
        return super.removeChild(null, oldChild);
      }
      parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
      }
      destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
      }
    };
    NoneEncapsulationDomRenderer = class extends DefaultDomRenderer2 {
      sharedStylesHost;
      removeStylesOnCompDestroy;
      styles;
      styleUrls;
      _animationDisabled;
      constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, registry, animationDisabled, maxAnimationTimeout, compId) {
        super(eventManager, doc, ngZone, platformIsServer, tracingService, registry, maxAnimationTimeout);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        this._animationDisabled = animationDisabled;
        let styles = component.styles;
        if (ngDevMode) {
          const baseHref = getDOM().getBaseHref(doc) ?? "";
          styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        this.styles = compId ? shimStylesContent(compId, styles) : styles;
        this.styleUrls = component.getExternalStyles?.(compId);
      }
      applyStyles() {
        this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
      }
      destroy() {
        if (!this.removeStylesOnCompDestroy) {
          return;
        }
        if (!this._animationDisabled && this.registry.elements) {
          this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
            }, this.maxAnimationTimeout);
          });
          return;
        }
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
      }
    };
    EmulatedEncapsulationDomRenderer2 = class extends NoneEncapsulationDomRenderer {
      contentAttr;
      hostAttr;
      constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, registry, animationDisabled, maxAnimationTimeout) {
        const compId = appId + "-" + component.id;
        super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, registry, animationDisabled, maxAnimationTimeout, compId);
        this.contentAttr = shimContentAttribute(compId);
        this.hostAttr = shimHostAttribute(compId);
      }
      applyToHost(element) {
        this.applyStyles();
        this.setAttribute(element, this.hostAttr, "");
      }
      createElement(parent, name) {
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, "");
        return el;
      }
    };
  }
});

// node_modules/@angular/platform-browser/fesm2022/browser.mjs
function getBaseElementHref() {
  baseElement = baseElement || document.head.querySelector("base");
  return baseElement ? baseElement.getAttribute("href") : null;
}
function relativePath(url) {
  return new URL(url, document.baseURI).pathname;
}
function initDomAdapter() {
  BrowserDomAdapter.makeCurrent();
}
function errorHandler() {
  return new ErrorHandler();
}
function _document() {
  setDocument(document);
  return document;
}
var BrowserDomAdapter, baseElement, BrowserGetTestability, BrowserXhr, DomEventsPlugin, MODIFIER_KEYS, _keyMap, MODIFIER_KEY_GETTERS, KeyEventsPlugin, INTERNAL_BROWSER_PLATFORM_PROVIDERS, platformBrowser, BROWSER_MODULE_PROVIDERS_MARKER, TESTABILITY_PROVIDERS, BROWSER_MODULE_PROVIDERS, BrowserModule;
var init_browser = __esm({
  "node_modules/@angular/platform-browser/fesm2022/browser.mjs"() {
    "use strict";
    init_common();
    init_core();
    init_core();
    init_dom_renderer();
    BrowserDomAdapter = class _BrowserDomAdapter extends DomAdapter {
      supportsDOMEvents = true;
      static makeCurrent() {
        setRootDomAdapter(new _BrowserDomAdapter());
      }
      onAndCancel(el, evt, listener, options) {
        el.addEventListener(evt, listener, options);
        return () => {
          el.removeEventListener(evt, listener, options);
        };
      }
      dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
      }
      remove(node) {
        node.remove();
      }
      createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
      }
      createHtmlDocument() {
        return document.implementation.createHTMLDocument("fakeTitle");
      }
      getDefaultDocument() {
        return document;
      }
      isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
      }
      isShadowRoot(node) {
        return node instanceof DocumentFragment;
      }
      /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
      getGlobalEventTarget(doc, target) {
        if (target === "window") {
          return window;
        }
        if (target === "document") {
          return doc;
        }
        if (target === "body") {
          return doc.body;
        }
        return null;
      }
      getBaseHref(doc) {
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
      }
      resetBaseElement() {
        baseElement = null;
      }
      getUserAgent() {
        return window.navigator.userAgent;
      }
      getCookie(name) {
        return parseCookieValue(document.cookie, name);
      }
    };
    baseElement = null;
    BrowserGetTestability = class {
      addToWindow(registry) {
        _global["getAngularTestability"] = (elem, findInAncestors = true) => {
          const testability = registry.findTestabilityInTree(elem, findInAncestors);
          if (testability == null) {
            throw new RuntimeError(5103, (typeof ngDevMode === "undefined" || ngDevMode) && "Could not find testability for element.");
          }
          return testability;
        };
        _global["getAllAngularTestabilities"] = () => registry.getAllTestabilities();
        _global["getAllAngularRootElements"] = () => registry.getAllRootElements();
        const whenAllStable = (callback) => {
          const testabilities = _global["getAllAngularTestabilities"]();
          let count = testabilities.length;
          const decrement = function() {
            count--;
            if (count == 0) {
              callback();
            }
          };
          testabilities.forEach((testability) => {
            testability.whenStable(decrement);
          });
        };
        if (!_global["frameworkStabilizers"]) {
          _global["frameworkStabilizers"] = [];
        }
        _global["frameworkStabilizers"].push(whenAllStable);
      }
      findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
          return null;
        }
        const t = registry.getTestability(elem);
        if (t != null) {
          return t;
        } else if (!findInAncestors) {
          return null;
        }
        if (getDOM().isShadowRoot(elem)) {
          return this.findTestabilityInTree(registry, elem.host, true);
        }
        return this.findTestabilityInTree(registry, elem.parentElement, true);
      }
    };
    BrowserXhr = class _BrowserXhr {
      build() {
        return new XMLHttpRequest();
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _BrowserXhr, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _BrowserXhr });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: BrowserXhr, decorators: [{
      type: Injectable
    }] });
    DomEventsPlugin = class _DomEventsPlugin extends EventManagerPlugin {
      constructor(doc) {
        super(doc);
      }
      // This plugin should come last in the list of plugins, because it accepts all
      // events.
      supports(eventName) {
        return true;
      }
      addEventListener(element, eventName, handler, options) {
        element.addEventListener(eventName, handler, options);
        return () => this.removeEventListener(element, eventName, handler, options);
      }
      removeEventListener(target, eventName, callback, options) {
        return target.removeEventListener(eventName, callback, options);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomEventsPlugin, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _DomEventsPlugin });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: DomEventsPlugin, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    MODIFIER_KEYS = ["alt", "control", "meta", "shift"];
    _keyMap = {
      "\b": "Backspace",
      "	": "Tab",
      "\x7F": "Delete",
      "\x1B": "Escape",
      "Del": "Delete",
      "Esc": "Escape",
      "Left": "ArrowLeft",
      "Right": "ArrowRight",
      "Up": "ArrowUp",
      "Down": "ArrowDown",
      "Menu": "ContextMenu",
      "Scroll": "ScrollLock",
      "Win": "OS"
    };
    MODIFIER_KEY_GETTERS = {
      "alt": (event) => event.altKey,
      "control": (event) => event.ctrlKey,
      "meta": (event) => event.metaKey,
      "shift": (event) => event.shiftKey
    };
    KeyEventsPlugin = class _KeyEventsPlugin extends EventManagerPlugin {
      /**
       * Initializes an instance of the browser plug-in.
       * @param doc The document in which key events will be detected.
       */
      constructor(doc) {
        super(doc);
      }
      /**
       * Reports whether a named key event is supported.
       * @param eventName The event name to query.
       * @return True if the named key event is supported.
       */
      supports(eventName) {
        return _KeyEventsPlugin.parseEventName(eventName) != null;
      }
      /**
       * Registers a handler for a specific element and key event.
       * @param element The HTML element to receive event notifications.
       * @param eventName The name of the key event to listen for.
       * @param handler A function to call when the notification occurs. Receives the
       * event object as an argument.
       * @returns The key event that was registered.
       */
      addEventListener(element, eventName, handler, options) {
        const parsedEvent = _KeyEventsPlugin.parseEventName(eventName);
        const outsideHandler = _KeyEventsPlugin.eventCallback(parsedEvent["fullKey"], handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(() => {
          return getDOM().onAndCancel(element, parsedEvent["domEventName"], outsideHandler, options);
        });
      }
      /**
       * Parses the user provided full keyboard event definition and normalizes it for
       * later internal use. It ensures the string is all lowercase, converts special
       * characters to a standard spelling, and orders all the values consistently.
       *
       * @param eventName The name of the key event to listen for.
       * @returns an object with the full, normalized string, and the dom event name
       * or null in the case when the event doesn't match a keyboard event.
       */
      static parseEventName(eventName) {
        const parts = eventName.toLowerCase().split(".");
        const domEventName = parts.shift();
        if (parts.length === 0 || !(domEventName === "keydown" || domEventName === "keyup")) {
          return null;
        }
        const key = _KeyEventsPlugin._normalizeKey(parts.pop());
        let fullKey = "";
        let codeIX = parts.indexOf("code");
        if (codeIX > -1) {
          parts.splice(codeIX, 1);
          fullKey = "code.";
        }
        MODIFIER_KEYS.forEach((modifierName) => {
          const index = parts.indexOf(modifierName);
          if (index > -1) {
            parts.splice(index, 1);
            fullKey += modifierName + ".";
          }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
          return null;
        }
        const result = {};
        result["domEventName"] = domEventName;
        result["fullKey"] = fullKey;
        return result;
      }
      /**
       * Determines whether the actual keys pressed match the configured key code string.
       * The `fullKeyCode` event is normalized in the `parseEventName` method when the
       * event is attached to the DOM during the `addEventListener` call. This is unseen
       * by the end user and is normalized for internal consistency and parsing.
       *
       * @param event The keyboard event.
       * @param fullKeyCode The normalized user defined expected key event string
       * @returns boolean.
       */
      static matchEventFullKeyCode(event, fullKeyCode) {
        let keycode = _keyMap[event.key] || event.key;
        let key = "";
        if (fullKeyCode.indexOf("code.") > -1) {
          keycode = event.code;
          key = "code.";
        }
        if (keycode == null || !keycode)
          return false;
        keycode = keycode.toLowerCase();
        if (keycode === " ") {
          keycode = "space";
        } else if (keycode === ".") {
          keycode = "dot";
        }
        MODIFIER_KEYS.forEach((modifierName) => {
          if (modifierName !== keycode) {
            const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
            if (modifierGetter(event)) {
              key += modifierName + ".";
            }
          }
        });
        key += keycode;
        return key === fullKeyCode;
      }
      /**
       * Configures a handler callback for a key event.
       * @param fullKey The event name that combines all simultaneous keystrokes.
       * @param handler The function that responds to the key event.
       * @param zone The zone in which the event occurred.
       * @returns A callback function.
       */
      static eventCallback(fullKey, handler, zone) {
        return (event) => {
          if (_KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) {
            zone.runGuarded(() => handler(event));
          }
        };
      }
      /** @internal */
      static _normalizeKey(keyName) {
        return keyName === "esc" ? "escape" : keyName;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _KeyEventsPlugin, deps: [{ token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _KeyEventsPlugin });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: KeyEventsPlugin, decorators: [{
      type: Injectable
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
      { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID },
      { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
      { provide: DOCUMENT, useFactory: _document }
    ];
    platformBrowser = createPlatformFactory(platformCore, "browser", INTERNAL_BROWSER_PLATFORM_PROVIDERS);
    BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "BrowserModule Providers Marker" : "");
    TESTABILITY_PROVIDERS = [
      {
        provide: TESTABILITY_GETTER,
        useClass: BrowserGetTestability
      },
      {
        provide: TESTABILITY,
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
      },
      {
        provide: Testability,
        // Also provide as `Testability` for backwards-compatibility.
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
      }
    ];
    BROWSER_MODULE_PROVIDERS = [
      { provide: INJECTOR_SCOPE, useValue: "root" },
      { provide: ErrorHandler, useFactory: errorHandler },
      {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT]
      },
      { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
      DomRendererFactory2,
      SharedStylesHost,
      EventManager,
      { provide: RendererFactory2, useExisting: DomRendererFactory2 },
      { provide: XhrFactory, useClass: BrowserXhr },
      typeof ngDevMode === "undefined" || ngDevMode ? { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true } : []
    ];
    BrowserModule = class _BrowserModule {
      constructor() {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          const providersAlreadyPresent = inject(BROWSER_MODULE_PROVIDERS_MARKER, {
            optional: true,
            skipSelf: true
          });
          if (providersAlreadyPresent) {
            throw new RuntimeError(5100, `Providers from the \`BrowserModule\` have already been loaded. If you need access to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
          }
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _BrowserModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _BrowserModule, exports: [CommonModule, ApplicationModule] });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: _BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-next.2", ngImport: core_exports, type: BrowserModule, decorators: [{
      type: NgModule,
      args: [{
        providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
        exports: [CommonModule, ApplicationModule]
      }]
    }], ctorParameters: () => [] });
  }
});

export {
  EVENT_MANAGER_PLUGINS,
  EventManagerPlugin,
  init_dom_renderer,
  platformBrowser,
  BrowserModule,
  init_browser
};
/*! Bundled license information:

@angular/platform-browser/fesm2022/dom_renderer.mjs:
@angular/platform-browser/fesm2022/browser.mjs:
  (**
   * @license Angular v20.2.1
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-IGXKCVBC.js.map
