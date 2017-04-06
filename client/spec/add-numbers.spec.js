describe('addNumbers', function() {
  it('2 つの数値が加算できる', function() {
    chai.assert.strictEqual(window.addNumbers(1, 2), 3);
  });
});
