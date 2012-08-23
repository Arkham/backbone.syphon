describe("serializing a form", function(){
  
  describe("when serializing a text input", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' name='foo' value='bar'></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should return an object with a key from the text input name", function(){
      expect(result.hasOwnProperty("foo")).toBe(true)
    });

    it("should have the input's value", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing a textarea", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><textarea name='foo'>bar</textarea></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should have the textarea's value", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing a select box", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><select name='foo'><option value='bar'>bar</option></select></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should have the textarea's value", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing a checkbox", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='checkbox' id='the-checkbox' name='chk'></form>");
      }
    });

    describe("and the checkbox is checked", function(){
      var view, result;

      beforeEach(function(){
        view = new View();
        view.render();
        view.$("#the-checkbox").prop("checked", true);

        result = Backbone.Syphon.serialize(view);
      });

      it("should return an object with a value of true", function(){
        expect(result.chk).toBe(true);
      });
    });

    describe("and the checkbox is not checked", function(){
      var view, result;

      beforeEach(function(){
        view = new View();
        view.render();

        result = Backbone.Syphon.serialize(view);
      });

      it("should return an object with a value of false", function(){
        expect(result.chk).toBe(false);
      });
    });

  });

  describe("when serializing a button", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><button name='btn' value='foo'>foo</button></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should not have the button's value", function(){
      expect(result.hasOwnProperty("btn")).toBe(false);
    });
  });

  describe("when serializing an input with type of 'submit'", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='submit' name='btn' value='foo' text='Foo'></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should not have the button's value", function(){
      expect(result.hasOwnProperty("btn")).toBe(false);
    });
  });

  describe("when serializing an input with type of 'reset'", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='reset' name='btn' value='foo' text='Foo'></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should not have the button's value", function(){
      expect(result.hasOwnProperty("btn")).toBe(false);
    });
  });

  describe("when serializing a radio button group", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='radio' name='foo' value='foo'><input type='radio' name='foo' value='bar' checked><input type='radio' name='foo' value='baz'>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should only return the value of the selected radio button", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing forms with disabled text field", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' name='foo' value='bar'><input type='text' name='ignore' value='bar' disabled></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should return an object with a key from the text input name, and ignore disabled", function(){
      expect(result.hasOwnProperty("foo")).toBe(true)
      expect(result.hasOwnProperty("ignore")).toBe(false)
    });

    it("should have the input's value", function(){
      expect(result.foo).toBe("bar");
    });
  });


  describe("when serializing forms with disabled select field", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' name='foo' value='bar'><select name='ignore' disabled='disabled'><option selected='selected' value='bar'>bar</option><option value='bar2'>bar2</option></select></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should return an object with a key from the text input name, and ignore disabled", function(){
      expect(result.hasOwnProperty("foo")).toBe(true)
      expect(result.hasOwnProperty("ignore")).toBe(false)
    });

    it("should have the input's value", function(){
      expect(result.foo).toBe("bar");
    });
  });


  describe("when the view is actually a form", function() {
    var View = Backbone.View.extend({
      tagName: "form",
      render: function(){
        this.$el.html("<input type='text' name='foo' value='bar'>");
      }
    });

    beforeEach(function() {
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("retrieves the inputs' values", function() {
      expect(result.foo).toBe("bar");
    });
  });

  describe("when the view does not contain a form", function() {
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<input type='text' name='foo' value='bar'>");
      }
    });

    beforeEach(function() {
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("retrieves the inputs' values", function() {
      expect(result.foo).toBe("bar");
    });
  });



});
