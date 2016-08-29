import assert from 'assert';

import kefirStopper from '../src/';

describe('kefirStopper', function() {
  it('destroy while active works', function() {
    const stopper = kefirStopper();
    let i = 0;
    stopper.onAny(event => {
      assert.strictEqual(stopper.stopped, true);
      switch (++i) {
      case 1:
        assert.strictEqual(event.type, 'value');
        break;
      case 2:
        assert.strictEqual(event.type, 'end');
        break;
      default:
        throw new Error('Should not happen');
      }
    });
    assert.strictEqual(stopper.stopped, false);
    stopper.destroy();
    assert.strictEqual(stopper.stopped, true);
    assert.strictEqual(i, 2);
  });

  it('destroy while inactive works', function() {
    const stopper = kefirStopper();
    let i = 0;
    assert.strictEqual(stopper.stopped, false);
    stopper.destroy();
    assert.strictEqual(stopper.stopped, true);
    stopper.onAny(event => {
      assert.strictEqual(stopper.stopped, true);
      switch (++i) {
      case 1:
        assert.strictEqual(event.type, 'value');
        break;
      case 2:
        assert.strictEqual(event.type, 'end');
        break;
      default:
        throw new Error('Should not happen');
      }
    });
    assert.strictEqual(i, 2);
  });

  it('multiple destroy calls do nothing', function() {
    const stopper = kefirStopper();
    let i = 0;
    stopper.onAny(event => {
      assert.strictEqual(stopper.stopped, true);
      switch (++i) {
      case 1:
        assert.strictEqual(event.type, 'value');
        break;
      case 2:
        assert.strictEqual(event.type, 'end');
        break;
      default:
        throw new Error('Should not happen');
      }
    });
    assert.strictEqual(stopper.stopped, false);
    stopper.destroy();
    assert.strictEqual(stopper.stopped, true);
    stopper.destroy();
    assert.strictEqual(stopper.stopped, true);
    assert.strictEqual(i, 2);
  });
});
