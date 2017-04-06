describe('Calculator', function() {
  describe('add', function() {
    it('数値が加算できる', function() {
      const calculator = new window.Calculator();
      calculator.add(10);

      chai.assert.strictEqual(calculator.getResult(), 10);
    });
  });
});
