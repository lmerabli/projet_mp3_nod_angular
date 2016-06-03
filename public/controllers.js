
angular.module("mycontrollers", [])
    
//$route, $location, $routeParams, $routeProvider

.controller("LibrairieController", function($http, $rootScope, $scope, $location, $routeParams)
{    
    //get all        
    $http.get("/songs").success(function(data){
        $rootScope.songs = data;
    });


    //supp
    $rootScope.$on("remove", function(event, song){
        
       $rootScope.songs.removeItemByID(song); 
       $http.delete("/songs/" + song.id_music);
       
    });
    
    //show one 
    $scope.showSong = function(song) {
        console.log(song.id_music);
        $location.path("/songs/" + song.id_music);
    };
 
    // play song
    $scope.play = function (song) {
        $rootScope.playedsong = {
            id: song.id_music,
            src: song.path.substring(7, song.path.length)
        };
    };

    // stop song
    $scope.pause = function(song) {
        $rootScope.playedsong = null;
        document.getElementById('player').pause();
    }
})


.controller("ContactController", function(){
    
    
    
})


.controller("SongController", function($http, $rootScope, $scope, $location, $routeParams){
    console.log("value id");
    console.log($routeParams.id);
    var songid = $routeParams.id;
     console.log("$rootScope.songs");
     console.log($rootScope.songs.length);
    var song;
    for (var i = 0; i < $rootScope.songs.length; i++)
    {
        console.log("$rootScope.songs");
        console.log($rootScope.songs.length);
        if ($rootScope.songs[i].id_music == songid)
        {
            song = $rootScope.songs[i];
            break;
        }
    }
     console.log("song");
        console.log(song);
    if (song)
    {
        $scope.song = angular.copy(song);
    }
    else
        $location.path("/");
   
    
    $scope.onCancel = function()
    {
        $location.path("/"); 
    };
    
    $scope.onSave = function()
    {
        console.log("j entre onsave angulare");
        for (var i = 0; i < $rootScope.songs.length; i++)
        {
            
            if ($rootScope.songs[i].id_music == songid)
            {
                console.log("jentre");console.log($scope.song);
                $rootScope.songs[i] = $scope.song;
                break;
            }
        }

        $http.put("/songs/" + songid, $scope.song ).success( function(){
            console.log("je rentre angular put");
            $location.path("/");
        })
        
        
    }
    
});






