const Kefir = require('kefir');

export default function kefirStopper() {
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

  const stopper = stream.toProperty();
  stopper.stopped = false;
  stopper.destroy = end;
  return stopper;
}
