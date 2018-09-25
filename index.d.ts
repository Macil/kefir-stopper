import {Property} from 'kefir';

export interface Stopper extends Property<null,never> {
  stopped: boolean;
  destroy(): void;
}

export default function kefirStopper(): Stopper;
