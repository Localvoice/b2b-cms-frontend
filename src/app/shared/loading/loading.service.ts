import { createApp, nextTick } from 'vue';
import SysLoadingComponent from './loading.vue';
import { getStyle } from '../helpers/dom';
import { SPINNER_BASE_SIZE, SPINNER_BASE_SIZE_REDUCED, SPINNER_SIZE_HOST_REDUCE_RATIO } from '../spinner';
import { SYS_LOADING_MAIN, SysLoadingConfig, SysLoadingNamespace, SysLoadingStyle } from './types';

interface SysLoadingProps {
  visible: boolean;
  spinnerDiameter: number;
  fullscreen: boolean;
}

interface SysLoadingRef {
  app: ReturnType<typeof createApp>;
  componentRef: SysLoadingProps;
  style: SysLoadingStyle | undefined;
  target: HTMLElement;
  times: number;
  el: HTMLElement;
}

export class LoadingService {
  private _context: Record<string, SysLoadingRef | undefined> = {};

  constructor() {
    this.create({
      name: SYS_LOADING_MAIN,
      style: SysLoadingStyle.FullScreen
    });
  }

  create(config: SysLoadingConfig): SysLoadingNamespace {
    const cfg = new SysLoadingConfig(config);

    this.remove(cfg.name);

    const el = document.createElement('div');
    // const app = createApp(SysLoadingComponent, {
    //   visible: false,
    //   spinnerDiameter: SPINNER_BASE_SIZE,
    //   fullscreen: cfg.style === SysLoadingStyle.FullScreen
    // });

    // const instance = app.mount(el) as SysLoadingRef['componentRef'];

    // this._context[cfg.name] = {
    //   times: 0,
    //   style: cfg.style,
    //   target: cfg.target as HTMLElement,
    //   componentRef: instance,
    //   app,
    //   el
    // };

    return this._createNamespace(cfg.name);
  }

  register(name = SYS_LOADING_MAIN, times = 1): number {
    const context = this._context[name];
    if (!context) throw Error(`No loader created with name '${name}'`);

    if (context.times === 0) {
      this._showLoader(context);
    }
    context.times += times < 1 ? 1 : times;

    return context.times;
  }

  resolve(name = SYS_LOADING_MAIN, times = 1): number {
    const context = this._context[name];
    if (!context) throw Error(`No loader created with name '${name}'`);

    times = times < 1 ? 1 : times;
    context.times = Math.max(context.times - times, 0);

    if (context.times === 0) {
      this._hideLoader(context);
    }

    return context.times;
  }

  resolveAll(name = SYS_LOADING_MAIN): void {
    const context = this._context[name];
    if (!context) throw Error(`No loader created with name '${name}'`);

    context.times = 0;
    this._hideLoader(context);
  }

  remove(name: string): void {
    const context = this._context[name];
    if (!context) return;

    this._hideLoader(context).then(() => {
      const el = context.el;
      el && el.parentNode?.removeChild(el);
      context.app.unmount();
      this._context[name] = undefined;
    });
  }

  private _showLoader(context: SysLoadingRef): void {
    nextTick(() => {
      const originalPosition = getStyle(context.target, 'position');
      if (originalPosition !== 'absolute' && originalPosition !== 'fixed') {
        context.target.classList.add('sys-loading-wrapper');
      }

      if (!context.target.contains(context.el)) {
        context.target.appendChild(context.el);
      }

      context.componentRef.fullscreen = context.style === SysLoadingStyle.FullScreen;
      const hostHeight = context.target.getBoundingClientRect().height;

      context.componentRef.spinnerDiameter =
        hostHeight > 10 && hostHeight <= SPINNER_BASE_SIZE
          ? Math.floor(hostHeight * SPINNER_SIZE_HOST_REDUCE_RATIO)
          : SPINNER_BASE_SIZE_REDUCED;

      context.componentRef.visible = true;
    });
  }

  private _hideLoader(context: SysLoadingRef): Promise<void> {
    return new Promise((resolve) => {
      const el = context.el;
      const handler = () => {
        el.removeEventListener('transitionend', handler);
        context.target.classList.remove('sys-loading-wrapper');
        resolve();
      };
      el.addEventListener('transitionend', handler);
      context.componentRef.visible = false;
    });
  }

  private _createNamespace(name: string): SysLoadingNamespace {
    const context = this._context[name];
    if (!context) throw Error(`No loader created with name '${name}'`);

    return {
      get times() {
        return context.times;
      },
      register: (count?: number) => this.register(name, count),
      resolve: (count?: number) => this.resolve(name, count),
      resolveAll: () => this.resolveAll(name),
      remove: () => this.remove(name)
    };
  }
}

export const loadingService = new LoadingService();
