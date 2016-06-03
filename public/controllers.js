
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
        $location.path("/song/" + song.id_music);
    };
 
    // play song
    $scope.play = function (song) {
        $rootScope.playedsong = {
            id: song.id,
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
    
    var song;
    for (var i = 0; i < $rootScope.songs.length; i++)
    {

        if ($rootScope.songs[i].id == songid)
        {
            song = $rootScope.songs[i];
            break;
        }
    }
    
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
        for (var i = 0; i < $rootScope.songs.length; i++)
        {
            if ($rootScope.songs[i].id == songid)
            {
                $rootScope.songs[i] = $scope.song;
                break;
            }
        }

        $http.put("/songs/" + songid, $scope.song ).success( function(){
            $location.path("/");
        })
        
        
    }
    
});






