angular.module('gft').controller('AlbumController', ["$scope", "$window", "$http", function($scope, $window, $http) {

	var onAlbumDataRetrievalSuccess = function(data) {
		$scope.albums = data.map(function(album) {
			return {
				artist	: album.Artist,
				title	: album.Title,
				score	: 0,
				tracks 	: album.Tracks.map(function(track) {
					return {
						id 			: track.TrackId,
						name		: track.Name,
					};
				})
			};
		});
	};

	var onAlbumDataRetrievalError = function(error) {
		$window.alert("Ooops: "+error);
	};

	$http.get("http://gft_angularjs_api.biegala.net/albums")
		.success(onAlbumDataRetrievalSuccess)
		.error(onAlbumDataRetrievalError);

	$scope.upvote = function(index) {
		$scope.albums[index].score += 1;
	};

	$scope.downvote = function(index) {
		$scope.albums[index].score -= 1;
	};

	var toggleTrackListsBtn = function(index) {
		var tracksListBtn = document.getElementById("track-list-btn-" + index);
		if (tracksListBtn.childNodes[0].nodeValue === "List tracks") {
			tracksListBtn.childNodes[0].nodeValue = "Hide tracks";
		} else {
			tracksListBtn.childNodes[0].nodeValue = "List tracks";
		}
	};

	var toggleTrackListsDiv = function(index) {
		var tracksListDiv = document.getElementById("track-list-" + index);
		if (tracksListDiv.className === "hidden") {
			tracksListDiv.className = "display";
		} else {
			tracksListDiv.className = "hidden";
		}
	};


	$scope.listTracks = function(index) {
		toggleTrackListsDiv(index);
		toggleTrackListsBtn(index);
	};
}]);