import {
    Component,
    Prop,
    State,
    Event,
    EventEmitter,
    h,
  } from '@stencil/core';
  
  import {
    Variants,
    Position,
    ToastLevel,
  } from './types';
  
  import {
    TOAST_BASE,
    TOAST_VARIANTS,
    TOAST_CLOSE_BASE,
    TOAST_CLOSE_VARIANTS,
    TOAST_ITEM_CONTAINER,
    PERCENTAGE_LOADER_COLOR,
    DEFAULT_ICONS,
    QUEUED_TOAST,
  } from './theme';
  
  import useTranslate from '../../composables/useTranslate';
  
  @Component({
    tag: 'n-toast-item',
    shadow: true,
  })
  export class NToastItem {
    @Prop() toastId!: string;
    @Prop() message: string = '';
    @Prop() duration: number = 3000;
    @Prop() variant: Variants = Variants.Positive;
    @Prop() loading: boolean = false;
    @Prop() closable: boolean = true;
    @Prop() showIcon: boolean = false;
  
    @Prop() index!: number;
    @Prop() depth!: number;
    @Prop() queued: boolean = false;
    @Prop() enabled: boolean = true;
    @Prop() position: Position = Position.Bottom;
    @Prop() offset: number = 0;
    @Prop() removed: boolean = false;
  
  @State() elapsed: number = 0;
  @State() active: boolean = false;

  @Event() remove!: EventEmitter<string>;
  @Event() removeAll!: EventEmitter<void>;

  private start = Date.now();
  private reqId: number | null = null;
  private readonly QUEUED_LIMIT = 3;
  private t = useTranslate().t;

  componentWillLoad() {
    this.reqId = requestAnimationFrame(this.updateTimer);
  }

  disconnectedCallback() {
    if (this.reqId !== null) {
      cancelAnimationFrame(this.reqId);
    }
  }
  
  componentDidUpdate() {
    if (this.enabled && this.queued && this.reqId === null) {
      this.start = Date.now();
      this.reqId = requestAnimationFrame(this.updateTimer);
    }
  }
  
  private destroy = () => {
    if (this.reqId !== null) {
      cancelAnimationFrame(this.reqId);
      this.reqId = null;
    }
    this.remove.emit(this.toastId);
  };

  private updateTimer = () => {
    this.active = true;
    this.elapsed = Date.now() - this.start;

    if (this.elapsed >= this.duration) {
      this.destroy();
      return;
    }

    if (!this.enabled && this.queued) {
      if (this.reqId !== null) {
        cancelAnimationFrame(this.reqId);
        this.reqId = null;
      }
      this.active = false;
    } else {
      this.reqId = requestAnimationFrame(this.updateTimer);
    }
  };
  
    private get percentageElapsed() {
      return (this.elapsed / this.duration) * 100;
    }

  private getToastClasses() {
    const baseClasses = TOAST_BASE;
    const variantClasses = (this.enabled || !this.queued)
      ? TOAST_VARIANTS[this.variant].normal
      : TOAST_VARIANTS[this.variant].disabled;
    
    let classes = `${baseClasses} ${variantClasses}`;
    
    if (this.queued) {
      classes += ' absolute w-full lg:w-max lg:min-w-[320px] lg:max-w-lg';
      if (this.position === Position.Bottom) {
        classes += ' bottom-0';
      }
    }
    
    return classes;
  }

  private getContainerClasses() {
    let classes = TOAST_ITEM_CONTAINER[this.position];
    
    if (this.active && this.position === Position.Bottom && !this.removed) {
      classes += ' !translate-y-0';
    }
    if (this.active && this.position === Position.Top && !this.removed) {
      classes += ' !-translate-y-[98vh]';
    }
    
    if (this.removed) {
      classes += ' translate-x-[100vw] duration-[400ms]';
    }
    
    if (this.queued) {
      const distanceFromEnableToast = this.depth - this.index - 1;
      if (distanceFromEnableToast < this.QUEUED_LIMIT) {
        const level = distanceFromEnableToast === 0 ? ToastLevel.First : ToastLevel.Second;
        classes += ` ${QUEUED_TOAST[this.position][level]}`;
      } else {
        classes += ` ${QUEUED_TOAST.hidden}`;
      }
    }
    
    return classes.trim();
  }
    
    private getContainerStyles() {
      const styles: any = {};
      
      const spacing = this.index * 80;
      
      if (this.position === Position.Top) {
        styles.top = `${this.offset + spacing}px`;
      } else {
        styles.bottom = `${this.offset + spacing}px`;
      }
      
      return styles;
    }

    private getCloseButtonClasses() {
      return `${TOAST_CLOSE_BASE} ${TOAST_CLOSE_VARIANTS[this.variant]}`;
    }

    render() {
      const containerClasses = this.getContainerClasses();
      const containerStyles = this.getContainerStyles();
      const toastClasses = this.getToastClasses();
      const closeButtonClasses = this.getCloseButtonClasses();
      const loaderColor = PERCENTAGE_LOADER_COLOR[this.variant];
      const icon = DEFAULT_ICONS[this.variant];

      return (
        <div
          class={containerClasses}
          style={{ ...containerStyles, pointerEvents: 'auto' }}
        >
          <div class={toastClasses}>
            <div class="flex items-center">
              {this.showIcon && (
                <span class="me-1 flex-shrink-0">{icon}</span>
              )}
              <p class="flex-1 text-sm leading-relaxed">{this.message}</p>
            </div>

            <div class="flex items-center">
              {this.closable && (
                <div class="flex items-center mx-2">
                  {this.depth > 1 && (
                    <span
                      class="text-neutral-secondary cursor-pointer whitespace-nowrap underline me-2 text-xs"
                      onClick={() => this.removeAll.emit()}
                    >
                      {this.t('toast.removeAll')}
                    </span>
                  )}
                  <div
                    class={closeButtonClasses}
                    onClick={this.destroy}
                  >
                    ✕
                  </div>
                </div>
              )}

              {this.loading && (
                <n-progress 
                   percentage={this.percentageElapsed} 
                   backgroundColorCode={loaderColor} 
                   progressColorCode={loaderColor} 
                   size={10} 
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }
  