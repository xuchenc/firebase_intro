var shows = [];


function getShows(){
  var req = new XMLHttpRequest();
  req.open('GET','https://incandescent-torch-623.firebaseio.com/.json',true);
  req.onload = function(){
        //console.log(req);
        if(200<=this.status<400){
          var res = JSON.parse(this.response);
          var elemString = "";

          shows.length = 0; //empty the array

          for(var prop in res){
            res[prop]._id = prop;
            shows.push(res[prop]);

            elemString += '<li>' + res[prop].title + ':' + res[prop].years +'|' + res[prop].rating + '<button onclick="startEdit('+(shows.length -1)+')" class="btn btn-success">Edit</button></li>'
          }
          document.getElementById("tvShows").innerHTML = elemString;
        }
        else{
          console.error("this.response");
        }
  }
  req.send();
}
getShows();


function startEdit(index){
  $('#editTitle').val(shows[index].title);
  $('#editYears').val(shows[index].years);
  $('#editRating').val(shows[index].rating);
  $('#editSubmitButton').html('<button onclick="saveEdit('+index+')" class="btn btn-warning">Save Changes</button>')
  $('#myModal').modal('toggle');
}

function saveEdit(index){
  var title = $('#editTitle').val();
  var years = $('#editYears').val();
  var rating = $('#editRating').val();

  var show = new TVShow(title, years, rating);

  $.ajax({
    url:'https://incandescent-torch-623.firebaseio.com/' + shows[index]._id + '/.json',
    type:'PUT',
    data:JSON.stringify(show)
  }).success(function(res){
    //res = this.response;
     getShows();
  })

  $('#myModal').modal('toggle');
}


function TVShow(title,years,rating){
  this.title = title;
  this.years = years;
  this.rating = rating;

}

function saveTVShow(){
  var title = document.getElementById("tvTitle").value;
  var years = document.getElementById("tvYears").value;
  var rating = document.getElementById("tvRating").value;

console.log(title);
  var show = new TVShow(title, years, rating);
  console.log(show);
  var req = new XMLHttpRequest();
  req.open('POST','https://incandescent-torch-623.firebaseio.com/.json',true);

  req.onload = function(){
    console.log(show);
      getShows();
  }
  req.send(JSON.stringify(show));
}


function startDelete(){
  var elemString = "";
  for (var i = 0; i < shows.length; i++) {
  elemString += '<li class="form-inline"><input id="' + shows[i]._id +'" type="checkbox" value="false" class="form-control" style="display:inline-block;"/>' + shows[i].title + ':' + shows[i].years +'|' + shows[i].rating + '</li>';
  }
   $('#tvShows').html(elemString);
   $('#buttonsGoHere').html('<button class="btn btn-success btn-lg" onclick="saveDelete()">Save</button><button class="btn btn-primary btn-lg" onclick="cancel()">Cancel</button>')

}

function cancel(){
  $('#buttonsGoHere').html('');
  getShows();
}

var delCount, boxes;
function saveDelete(){
  delCount = 0;
  boxes = $(':checkbox:checked');
  boxesLength = boxes.length;
  if(boxes.length > 0){
    deleteShow(boxes[0].id);
  }

}
function deleteShow(id){
  console.log(id)
 $.ajax({url:'https://incandescent-torch-623.firebaseio.com/' + id + '/.json', type:'DELETE'}).success(function(){
   delCount += 1;
   if(delCount < boxes.length){
     deleteShow(boxes[delCount].id);
   }
   else{
     getShows();
   }
 })
}
