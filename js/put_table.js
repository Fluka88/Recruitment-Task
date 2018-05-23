
var mydata;
var sortedby = "nothing yet";
$('#employees tbody').html('');
$('#pages').html('');
moment.locale('pl');
var activePage = 1;
var numberOfPages = 0;

$.getJSON("/js/dane2.json",function(data){
  for(var r = 0; r < data.length;r++){
    data[r].dateOfBirth = moment(data[r].dateOfBirth, 'DD-MM-YYYY').format('YYYYMMDD');
  }
  numberOfPages = Math.ceil(data.length/5);
  addPages();
  draw(data);
  mydata = data;
});

var draw = function(data){
  var $row, birth;
  for(var r = (activePage-1)*5; r < activePage*5; r++){
    if(r<data.length){
      $row = $('<tr>');
      $row.append('<td class="text-center"><b>' + data[r].id + '</b></td>');
      $row.append('<td class="text-center">' + data[r].firstName + '</td>');
      $row.append('<td class="text-center"><b>' + data[r].lastName + '</b></td>');
      birth = moment(data[r].dateOfBirth, 'YYYYMMDD').format('D MMMM YYYY');
      $row.append('<td class="text-center">' + birth + '</td>')
      $row.append('<td class="text-center"><b>' + data[r].company + '</b></td>');
      $row.append('<td class="text-center">' + data[r].note + '</td>');

      $('#employees tbody').append($row);
    }
  }
}

var addPages = function(){
  $('#pages').append('<li><a class="white" href="#"><b>&lt back</b></a></li>&nbsp&nbsp');
  $('#pages').append('<li class="active"><a href="#"><b>' + 1 +'</b></a></li>&nbsp&nbsp');
  for(var n = 2; n < numberOfPages+1;n++){
    $('#pages').append('<li><a href="#"><b>' + n +'</b></a></li>&nbsp&nbsp');
  }
  $('#pages').append('<li><a class= "white" href="#"><b>next &gt</b></a></li>');

  $('.pagination li').click(function(){
    //pagination buttons
    if((this.innerText)=="next >"){
      if(activePage < numberOfPages){
        clearTable();
        activePage++;
        draw(mydata);
        $( "li.active" ).next().addClass("active2");
        $('.pagination li').removeClass('active');
        $( "li.active2" ).addClass("active");
        $('.pagination li').removeClass('active2');
      }
    }else if((this.innerText)=="< back"){
      if(activePage > 1){
        clearTable();
        activePage--;
        draw(mydata);
        $( "li.active" ).prev().addClass("active2");
        $('.pagination li').removeClass('active');
        $( "li.active2" ).addClass("active");
        $('.pagination li').removeClass('active2');
      }
    }else{
      clearTable();
      activePage = this.innerText;
      draw(mydata);
      $('.pagination li').removeClass('active');
      $(this).addClass('active');
    }

    return false;
  })
}

function clearTable(){
  if(activePage == numberOfPages){
    for(i=0;i<(mydata.length % 5);i++){
      document.getElementById("employees").deleteRow(1);
    }
  }else{
    for(i=0;i<5;i++){
      document.getElementById("employees").deleteRow(1);
    }
  }
}


$('th').click(function(){
  //ID sort
  if((this.innerText)=="ID"){
    if(sortedby == "id"){
      mydata.reverse();
      sortedby = "nothing";
    }else{
      sortedby = "id";
      mydata.sort(function(a, b) {
        return a.id - b.id;
      });
    }
    clearTable();
    draw(mydata);
  }
  //First Name sort
  if((this.innerText)=="First Name"){
    if(sortedby == "firstname"){
      mydata.reverse();
      sortedby = "nothing";
    }else{
      sortedby = "firstname";
      mydata.sort(function(a, b) {
      			var titleA = a.firstName.toLowerCase(), titleB = b.firstName.toLowerCase();
      			if (titleA < titleB) return -1;
      			if (titleA > titleB) return 1;
      			return 0;
      });
    }
    clearTable();
    draw(mydata);
  }
  //Last Name sort
  if((this.innerText)=="Last Name"){
    if(sortedby == "lastname"){
      mydata.reverse();
      sortedby = "nothing";
    }else{
      sortedby = "lastname";
      mydata.sort(function(a, b) {
            var titleA = a.lastName.toLowerCase(), titleB = b.lastName.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
      });
    }
    clearTable();
    draw(mydata);
  }
  //Birth date sort
  if((this.innerText)=="Birth date"){
    if(sortedby == "birthdate"){
      mydata.reverse();
      sortedby = "nothing";
    }else{
      sortedby = "birthdate";
      mydata.sort(function(a, b) {
        return a.dateOfBirth - b.dateOfBirth;
      });
    }
    clearTable();
    draw(mydata);
  }
  //Company sort
  if((this.innerText)=="Company"){
    if(sortedby == "company"){
      mydata.reverse();
      sortedby = "nothing";
    }else{
      sortedby = "company";
      mydata.sort(function(a, b) {
            var titleA = a.company.toLowerCase(), titleB = b.company.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
      });
    }
    clearTable();
    draw(mydata);
  }
  //Note sort
  if((this.innerText)=="Note"){
    if(sortedby == "note"){
      mydata.reverse();
      sortedby = "nothing";
    }else{
      sortedby = "note";
      mydata.sort(function(a, b) {
        return a.note - b.note;
      });
    }
    clearTable();
    draw(mydata);
  }
})
