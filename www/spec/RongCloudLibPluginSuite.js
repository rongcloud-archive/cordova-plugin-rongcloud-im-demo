describe("An example of Jasmine Spec - RongCloudLibPlugin", function() {

  describe("when RongCloudLibPlugin is init,", function() {
	  it("should be able to init", function() {
      RongCloudLibPlugin.init(
                  function(result) {
                    // var lstResult = 'init:' + JSON.stringify(result); console.log(lstResult);
                    var jsonResult = {
                            status: 'success', // 状态码：success / error
                        };
                    expect(result).toEqual(jsonResult);
                  },
                  function(error) {
                    fail("Callback has been called");
                    //var lstResult = 'init error:' + JSON.stringify(error);console.log(lstResult);
                  },
                  {
                      appKey: "lmxuhwagx8tyd",
                      deviceToken: "87jjfds8393sfjds83"
                  }
      );
	  });
  });

  describe("when RongCloudLibPlugin is connect,", function() {
	  it("should be able to init", function() {
      RongCloudLibPlugin.connect(
                  function(result) {
                    // var lstResult = 'init:' + JSON.stringify(result); console.log(lstResult);
                    var jsonResult = {
                            status: 'success', // 状态码：success / error
                            result:
                            {
                                userId: 'aaa5936' // 当前登录的用户 Id
                            }
                        }
                    expect(result).toEqual(jsonResult);
                  },
                  function(error) {
                    //var lstResult = 'init error:' + JSON.stringify(error);console.log(lstResult);
                  },
                  {
                      token: token
                  }
      );
	  });
  });


});
