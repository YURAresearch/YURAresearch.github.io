$(document).ready(function() {

var Biological Sciences = [
 {display: "Cell Biology", value: "cellbiology" },
 {display: "Computational Biology & Bioinformatics", value: "computationalbiologybioinformatics" },

var Engineering = [
 {display: "Chemical & Environmental Engineering", value: "chemicalenvironmentalengineering" },
 {display: "Electrical Engineering", value: "electricalengineering" },

$("#filter-category").change(function() {
  var parent = $(this).val();
  switch(parent){
  case 'Biological Sciences':
  list(Biological Sciences);
  break;
  case 'engineering':
  list(Engineering);
  break;
  default: //default child option is blank
  $("#filter-department").html('');
  break;
  }
  });

  function list(array_list)
  				{
  					$("#subcats").html(""); //reset child options
  					$(array_list).each(function (i) { //populate child options
  					$("#subcats").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
  					});
  				}
});
