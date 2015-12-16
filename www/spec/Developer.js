function Developer() {
}

Developer.prototype.workOn = function(project) {
  this.currentProject = project;
  this.isWorking = true;
};

Developer.prototype.pause = function() {
  this.isWorking = false;
};

Developer.prototype.resume = function() {
  if (this.isWorking) {
    throw new Error("The project is already started.");
  }
  this.isWorking = true;
};

