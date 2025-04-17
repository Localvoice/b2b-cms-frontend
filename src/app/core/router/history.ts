import { App } from 'vue';
import { Router } from 'vue-router';

export interface RouterHistoryConfig {
  maxLength?: number;
}

export class RouterHistory {
  private history: string[] = [];
  private markers: { [key: string]: string } = {};
  private maxLength = 10;

  constructor(
    private router: Router,
    config?: RouterHistoryConfig
  ) {
    if (config?.maxLength && config.maxLength > 0) {
      this.maxLength = config.maxLength;
    }

    router.afterEach((to) => {
      if (to && to.meta) {
        this.addStep(to.fullPath, to.meta.historyMarker || to.name);
      }
    });
  }

  get length(): number {
    return this.history.length;
  }

  get steps(): string[] {
    return [...this.history];
  }

  addStep(url: string, marker?: string): RouterHistory {
    this.history.push(url);

    if (this.history.length > this.maxLength) {
      this.history.shift();
    }

    if (marker) {
      this.setMarker(marker);
    }

    return this;
  }

  getStep(offset: number): string {
    if (offset > 0) {
      throw new Error('Offset must be <= 0');
    }
    const finalOffset = this.history.length + offset - 1;
    return this.history[finalOffset];
  }

  hasStep(offset: number): boolean {
    if (offset > 0) {
      throw new Error('Offset must be <= 0');
    }

    const finalOffset = this.history.length + offset - 1;
    return !!this.history[finalOffset];
  }

  navigateToStep(offset: number, fallback?: string): Promise<void> {
    if (this.hasStep(offset)) {
      return this.router.push(this.getStep(offset));
    }

    return this.router.push(fallback || '/');
  }

  setMarker(marker: string, offset = 0): RouterHistory {
    if (this.hasStep(offset)) {
      this.markers[marker] = this.getStep(offset);
    }

    return this;
  }

  navigateToMarker(marker: string, fallback?: string): Promise<void> {
    if (this.hasMarker(marker)) {
      return this.router.push(this.getMarker(marker));
    }

    if (!fallback) {
      fallback = { name: marker } as unknown as string;
    }

    return this.router.push(fallback || '/');
  }

  getMarker(marker: string): string {
    return this.markers[marker];
  }

  hasMarker(marker: string): boolean {
    return !!this.markers[marker];
  }

  clear(): RouterHistory {
    this.history = [];
    this.markers = {};

    return this;
  }
}

export function createRouterHistoryPlugin(router: Router, config?: RouterHistoryConfig) {
  const history = new RouterHistory(router, config);

  return {
    install(app: App) {
      app.config.globalProperties.$history = history;
      app.provide('routerHistory', history);
    }
  };
}
