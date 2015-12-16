describe("An example of Jasmine Spec - Working developer", function() {
  var developer;
  var project;

  beforeEach(function() {
	this.addMatchers({
		wantToWorkOn: function(expectProject) {
		  var developer = this.actual;
		  return developer.currentProject === expectProject && developer.isWorking;
		}
	});
  
    developer = new Developer();
    project = new Project();
  });
  
  describe("when the projcet is started,", function() {
	  it("should be able to work on the project", function() {
		developer.workOn(project);
		expect(developer.currentProject).toEqual(project);

		expect(developer).wantToWorkOn(project);
	  });
  });

  describe("when the projcet is paused,", function() {
    beforeEach(function() {
      developer.workOn(project);
      developer.pause();
    });

    it("should know the project is currently paused", function() {
      expect(developer.isWorking).toBeFalsy();
      expect(developer).not.wantToWorkOn(project);
    });

    it("should be possible to resume the project", function() {
      developer.resume();
      expect(developer.isWorking).toBeTruthy();
      expect(developer.currentProject).toEqual(project);
    });
  });


  describe("when the project is resumed,", function() {
    it("should throw an exception if project is started", function() {
      developer.workOn(project);
	  
      expect(function() {
        developer.resume();
      }).toThrow("The project is already started.");
    });
  });
});