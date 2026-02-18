import uuid from '../components/utils/uuid';

export type Descendant = {
  id?: string;
  index: number;
  element?: HTMLElement;
  disabled?: boolean;
  value?: any;
  [index: string | number]: any;
};

export class DescendantsManager {
  private descendants: Descendant[] = [];
  private callbacks: Array<(descendants: Descendant[]) => void> = [];

  register(descendant: Descendant): void {
    this.descendants.push(descendant);
    this.notify();
  }

  unregister(id: string): void {
    const index = this.descendants.findIndex(
      (descendant: Descendant) => descendant.id === id
    );
    if (index > -1) {
      this.descendants.splice(index, 1);
      this.notify();
    }
  }

  getDescendants(): Descendant[] {
    return this.descendants;
  }

  getIndex(id: string): number {
    return this.descendants.findIndex((item) => item.id === id);
  }

  onChange(callback: (descendants: Descendant[]) => void): void {
    this.callbacks.push(callback);
  }

  private notify(): void {
    this.callbacks.forEach(callback => callback(this.descendants));
  }
}

export function useDescendant(args: any, manager: DescendantsManager): {
  index: number;
  id: string;
} {
  const id = uuid(args.idPrefix || 'descendant-');
  
  manager.register({ ...args, id });
  
  const index = manager.getIndex(id);

  return { index, id };
}

export function useDescendants(): DescendantsManager {
  return new DescendantsManager();
}
