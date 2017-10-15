describe("getBlueBottlesHistory", function() {
  
  describe("очередь красных [4, 2, 3], очередь синих [3, 2, 1]", function() {
  
    var history = getBlueBottlesHistory([4, 2, 3], [3, 2, 1]);
  
    it("длина истории 3", function() {
      assert.equal(history.length, 3);   
    });
  
    it("количество переливаний в позицию 0 равно 1", function() {
      assert.equal(history[0].count, 1);   
    });
  
    it("в позицию 0 должно быть перелито 3 из позиции 0", function() {
      assert.equal(history[0].transactions[0].number, 1);
      assert.equal(history[0].transactions[0].detail.fromWhich, 0);
      assert.equal(history[0].transactions[0].detail.howMuch, 3);
    });
  
    it("количество переливаний в позицию 1 равно 2", function() {
      assert.equal(history[1].count, 2);   
    });
  
    it("в позицию 1 должно быть перелито 1 из позиции 0", function() {
      assert.equal(history[1].transactions[0].number, 1);
      assert.equal(history[1].transactions[0].detail.fromWhich, 0);
      assert.equal(history[1].transactions[0].detail.howMuch, 1);
    });
  
    it("в позицию 1 должно быть перелито 1 из позиции 1", function() {
      assert.equal(history[1].transactions[1].number, 2);
      assert.equal(history[1].transactions[1].detail.fromWhich, 1);
      assert.equal(history[1].transactions[1].detail.howMuch, 1);
    });
  
    it("количество переливаний в позицию 2 равно 1", function() {
      assert.equal(history[2].count, 1);   
    });
  
    it("в позицию 1 должно быть перелито 1 из позиции 1", function() {
      assert.equal(history[2].transactions[0].number, 1);
      assert.equal(history[2].transactions[0].detail.fromWhich, 1);
      assert.equal(history[2].transactions[0].detail.howMuch, 1);
    });
  
  });
  
  describe("очередь красных [1, 2, 3, 4], очередь синих [4, 3, 2, 1]", function() {
    
    var history = getBlueBottlesHistory([1, 2, 3, 4], [4, 3, 2, 1]);
    
    it("длина истории 4", function() {
      assert.equal(history.length, 4);   
    });
    
    it("количество переливаний в позицию 0 равно 3", function() {
      assert.equal(history[0].count, 3);   
    });
    
    it("в позицию 0 должно быть перелито 1 из позиции 0", function() {
      assert.equal(history[0].transactions[0].number, 1);
      assert.equal(history[0].transactions[0].detail.fromWhich, 0);
      assert.equal(history[0].transactions[0].detail.howMuch, 1);
    });
    
    it("в позицию 0 должно быть перелито 2 из позиции 1", function() {
      assert.equal(history[0].transactions[1].number, 2);
      assert.equal(history[0].transactions[1].detail.fromWhich, 1);
      assert.equal(history[0].transactions[1].detail.howMuch, 2);
    });
    
    it("в позицию 0 должно быть перелито 1 из позиции 2", function() {
      assert.equal(history[0].transactions[2].number, 3);
      assert.equal(history[0].transactions[2].detail.fromWhich, 2);
      assert.equal(history[0].transactions[2].detail.howMuch, 1);
    });
    
    it("количество переливаний в позицию 1 равно 2", function() {
      assert.equal(history[1].count, 2);   
    });
    
    it("в позицию 1 должно быть перелито 2 из позиции 2", function() {
      assert.equal(history[1].transactions[0].number, 1);
      assert.equal(history[1].transactions[0].detail.fromWhich, 2);
      assert.equal(history[1].transactions[0].detail.howMuch, 2);
    });
    
    it("в позицию 1 должно быть перелито 1 из позиции 3", function() {
      assert.equal(history[1].transactions[1].number, 2);
      assert.equal(history[1].transactions[1].detail.fromWhich, 3);
      assert.equal(history[1].transactions[1].detail.howMuch, 1);
    });
    
    it("количество переливаний в позицию 2 равно 1", function() {
      assert.equal(history[2].count, 1);   
    });
    
    it("в позицию 2 должно быть перелито 2 из позиции 3", function() {
      assert.equal(history[2].transactions[0].number, 1);
      assert.equal(history[2].transactions[0].detail.fromWhich, 3);
      assert.equal(history[2].transactions[0].detail.howMuch, 2);
    });
    
    it("количество переливаний в позицию 3 равно 1", function() {
      assert.equal(history[3].count, 1);   
    });
    
    it("в позицию 3 должно быть перелито 1 из позиции 3", function() {
      assert.equal(history[3].transactions[0].number, 1);
      assert.equal(history[3].transactions[0].detail.fromWhich, 3);
      assert.equal(history[3].transactions[0].detail.howMuch, 1);
    });
    
  });
  
});