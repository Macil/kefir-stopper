/* @flow */

const Kefir = require('kefir');

export type Stopper = Kefir.Property<null>&{
  stopped: boolean;
  destroy(): void;
};

export default function kefirStopper(): Stopper {
  let emitter = null;

  function end() {
    stopper.stopped = true;
    if (emitter) {
      emitter.emit(null);
      emitter.end();
    }
  }

  const stream = Kefir.stream(_emitter => {
    emitter = _emitter;
    if (stopper.stopped) {
      end();
    }
  });

  const stopper: Stopper = (stream.toProperty(): any);
  stopper.stopped = false;
  (stopper:any).destroy = end;
  return stopper;
}
