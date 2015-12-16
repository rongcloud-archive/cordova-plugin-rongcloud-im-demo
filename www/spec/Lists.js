describe("Examples of Jasmine suite", function() {

  //List 1
  describe("This is an exmaple suite", function() {
	  it("contains spec with an expectation", function() {
		expect(true).toBe(true);
		expect(false).toBe(false);
		expect(false).not.toBe(true);
	  });
	});

  describe("JSON test suite", function() {
    var stra = {a:1, b:4};
    var strb = {b:4, a:1};
    it("JSON spec with an expectation", function() {
    expect(stra).toEqual(strb);
    });
  });

  //List 2
  describe("Test suite is a function.", function() {
	  var gVar;

	  it("Spec is a function.", function() {
		gVar = true;
		expect(gVar).toBe(true);
	  });

	  it("Another spec is a function.", function() {
		gVar = false;
		expect(gVar).toBe(false);
	  });

	});

	//List 3
	describe("This is an exmaple suite", function() {
	  it("contains spec with an expectation", function() {
		var num = 10;
		expect(num).toEqual(10);
	  });
	});

	//List 4
	describe("The 'toBe' matcher compares with ===", function() {
	  it("and has a positive case ", function() {
		expect(true).toBe(true);
	  });
	  it("and can have a negative case", function() {
		expect(false).not.toBe(true);
	  });
	});


	//List 5
	describe("Included matchers:", function() {

	  it("The 'toBe' Matcher", function() {
		var a = 3.6;
		var b = a;

		expect(a).toBe(b);
		expect(a).not.toBe(null);
	  });

	  describe("The 'toEqual' matcher", function() {

		it("works for simple literals and variables", function() {
		  var a = "varA";
		  expect(a).toEqual("varA");
		});

		it("Work for objects", function() {
		  var obj = {
			a: 1,
			b: 4
		  };
		  var obj2 = {
			a: 1,
			b: 4
		  };
		  expect(obj).toEqual(obj2);
		});
	  });

	  it("The 'toBeDefined' matcher ", function() {
		var obj = {
		  defined: 'defined'
		};

		expect(obj.defined).toBeDefined();
		expect(obj.undefined).not.toBeDefined();
	  });

	});

	//List 6
	describe("An example of setup and teardown", function() {
	  var gVar;

	  beforeEach(function() {
		gVar = 3.6;
		gVar += 1;
	  });

	  afterEach(function() {
		gVar = 0;
	  });

	  it("after setup, gVar has new value.", function() {
		expect(gVar).toEqual(4.6);
	  });

	  it("A spec contains 2 expectations.", function() {
		gVar = 0;
		expect(gVar).toEqual(0);
		expect(true).toEqual(true);
	  });
	});

	//List 7
	describe("A spec", function() {
	  var gVar;

	  beforeEach(function() {
		gVar = 3.6;
		gVar += 1;
	  });

	  afterEach(function() {
		gVar = 0;
	  });

	  it("after setup, gVar has new value.", function() {
		expect(gVar).toEqual(4.6);
	  });

	  it("A spec contains 2 expectations.", function() {
		gVar = 0;
		expect(gVar).toEqual(0);
		expect(true).toEqual(true);
	  });

	  describe("nested describe", function() {
		var tempVar;

		beforeEach(function() {
		  tempVar = 4.6;
		});

		it("gVar is global scope, tempVar is this describe scope.", function() {
		  expect(gVar).toEqual(tempVar);
		});
	  });
	});

	//List 8
	xdescribe("An example of xdescribe.", function() {
	  var gVar;

	  beforeEach(function() {
		gVar = 3.6;
		gVar += 1;
	  });

	  xit(" and xit", function() {
		expect(gVar).toEqual(4.6);
	  });
	});







});
