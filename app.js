var req = new XMLHttpRequest();

req.open('POST','https://incandescent-torch-623.firebaseio.com/.json',true);

req.onload = function(){
  console.log('SENT SUCCESSFUL!');
}

req.send(JSON.stringify({title:"Boondocks",years:"1998-2005",rating:"8.8"}));
