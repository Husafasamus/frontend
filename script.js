//const angular = require("angular");

var app = angular.module("blog-angular", ["ngRoute"]);
var controller = app.controller("baseController", ($scope, $http, $timeout, $location, $routeParams)=>{

    $scope.blogs = []; 
    


    $scope.addingBlog = false;
    $scope.editingBlogIndex = -1;

    $scope.newBlog = {
        title: "",
        text: ""
    };

    $scope.editingBlog = {
        id: -1,
        title: "",
        text: ""
    };

    

    $scope.logUser = {
        login: "",
        password: ""
    };

    $scope.whoIsLogged = {
        login: "admin",
        type: "admin" // admin, user
    };


    $scope.loginUser = () => { 

        $scope.whoIsLogged.login = $scope.logUser.login;
        $scope.whoIsLogged.type = "user";

        if ($scope.logUser.login === "admin") {
            $http.post(`/api/loginUser`, $scope.logUser).then((response) => {
                          
                    $scope.whoIsLogged = {
                        login: "admin",
                        type: "admin" 
                    };
                    $('#loginModal').modal('hide');
                
                
                
            }).catch(() => {
                $scope.logoutUser();
            });
            
        }
        
        // $('#loginModal').modal('hide');

        $scope.logUser = {
            login: "",
            password: ""
        };


        // console.log($scope.whoIsLogged);
        // console.log($scope.logUser);
        // $http.post(`/api/loginUser/`, $scope.logUser).then((response) => {
        //     $scope.logUser = {
        //         login: "",
        //         password: ""
        //     };
        // }); 
    };


    $scope.showLoginModal = () => {
        $('#loginModal').modal('show');
    };
    $scope.hideLoginModal = () => {
        $('#loginModal').modal('hide');
    };


    $scope.logoutUser = () => { 
        $scope.whoIsLogged = {
            login: "",
            type: "" 
        };
    };



    $scope.loadBlogs = () => {
        $http.get("/api/blogs").then((response) => {
            $scope.blogs = response.data.sort((a, b) => a.id - b.id);
        });   
    };
    $timeout(() => {
        $scope.loadBlogs();
    }, 0);

    $scope.openBlog = (index) => {     
        $location.path(`/blog/${$scope.blogs[index].id}`);
    };
    
    $scope.loadBlog = () => {
        $http.get(`/api/blog/${$routeParams.id}`).then((response) => {
            $scope.blogWhole = response.data;
            $http.get(`/api/blogWhole/${$scope.blogWhole.id}`).then((response) => {
                $scope.blogWhole.textWhole = response.data[0].text;
            });
            
        });
        

    };

    //DELETE////////////////////////////////////////////////////////////////////
    $scope.deleteBlog = (index) => {
        $http.delete(`/api/blog/${$scope.blogs[index].id}`).then((response) => {
            $scope.blogs.splice(index, 1);
        });
    };
    ////////////////////////////////////////////////////////////////////////////





    $scope.startAddingBlog = () => {
        $scope.addingBlog = true;
    };
    
    $scope.cancelAddingBlog = () => {
        $scope.addingBlog = false;
        $scope.newBlog.title = "";
        $scope.newBlog.text = "";
    };

    $scope.addBlog = () => {
        $http.post(`/api/blog`, $scope.newBlog).then((response) => {
            $scope.blogs.push(response.data);
            $scope.newBlog.title = "";
            $scope.newBlog.text = "";
            $scope.addingBlog = false;
        });
    };



    $scope.startEditingBlog = (index) => {
        $scope.editingBlogIndex = index;
        $scope.editingBlog.id = $scope.blogs[index].id;  
        $scope.editingBlog.title = $scope.blogs[index].title;
        $scope.editingBlog.text = $scope.blogs[index].text;
    };
    $scope.editBlog = (index) => {
        $http.put(`/api/blog`, $scope.editingBlog).then((response) => {
            $scope.blogs[index].title = $scope.editingBlog.title;
            $scope.blogs[index].text = $scope.editingBlog.text;
            $scope.editingBlogIndex = -1;
        });
        
    };

    $scope.blogWhole = {};
    $scope.editingBlogWhole = {};
    $scope.isEditBlogWhole = false;

    $scope.startEditingBlogWhole = () => {
        $scope.editingBlogWhole.id = $scope.blogWhole.id;
        $scope.editingBlogWhole.text = $scope.blogWhole.text;
        $scope.editingBlogWhole.title = $scope.blogWhole.title;
        $scope.editingBlogWhole.textWhole = $scope.blogWhole.textWhole;
        $scope.isEditBlogWhole = true;
    };


    $scope.editBlogWhole = () => {
        $http.put(`/api/blogWhole`, $scope.editingBlogWhole).then((response) => {
            $scope.editingBlogWhole = {};
            $scope.isEditBlogWhole = false;

            $scope.blogWhole.textWhole = response.data.text;
        });   
    };
    
    $scope.cancelEditingBlogWhole = () => {
        $scope.editingBlogWhole = {};
        $scope.isEditBlogWhole = false;
    };








    $scope.cancelEditingBlog = () => {
        $scope.editingBlogIndex = -1;
        $scope.editingBlog.title = "";
        $scope.editingBlog.text = "";
    };

    //gallery

    $scope.gallery = [
        {
            title: "Elon1",
            src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
            text: ""
        },
        {
            title: "Elonn2",
            src: "https://static.theceomagazine.net/wp-content/uploads/2018/10/15093202/elon-musk.jpg",
            text: ""
        },
        {
            title: "Elon",
            src: "https://cdn.vox-cdn.com/thumbor/4QtOwnOxCdwESvt1-CpQSTZvHHA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19932738/1206292068.jpg.jpg",
            text: ""
        },
        {
            title: "Elon",
            src: "https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg",
            text: ""
        },
        {
            title: "Elon",
            src: "https://image.cnbcfm.com/api/v1/image/105773439-1551717349171rtx6p9uc.jpg?v=1551717410&w=678&h=381",
            text: ""
        },
        {
            title: "Elon",
            src: "https://c.files.bbci.co.uk/11C92/production/_115505827_mediaitem115505311.jpg",
            text: ""
        },
        {
            title: "Elon",
            src: "https://specials-images.forbesimg.com/imageserve/5de82785e961e100078f2c1b/960x0.jpg?fit=scale",
            text: ""
        },
        {
            title: "Elon",
            src: "https://media.wired.com/photos/5b7744715560bb1fedf11c43/1:1/w_1170,h_1170,c_limit/ElonMusk-RTX2J8M%20(1).jpg",
            text: ""
        },


    ]; 

    $scope.sliderPrev = () => {
        $('.carousel').carousel('prev');
    };
    
    $scope.sliderNext = () => {
        $('.carousel').carousel('next');
    };

    $scope.sliderShowPictureOnIndex = (index) => {
        $('.carousel').carousel(index);
        console.log(index);
    };


    


    
});

app.config(($routeProvider) => {
    $routeProvider.when("/blogy", {templateUrl: "/blogy.html"})
                  .when("/home", {templateUrl: "/home.html"})
                  .when("/gallery", {templateUrl: "/gallery.html"})
                  .when("/blog/:id", {templateUrl: "/blog.html"})
                  
                  .otherwise({redirectTo: "/"});
});
