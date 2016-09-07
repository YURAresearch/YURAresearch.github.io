$(document).ready(function() {
var BiologicalSciences = [
  {display: "Select department...", value: "" },
  {display: "Biological & Biomedical Sciences", value: "Biological & Biomedical Sciences" },
  {display: "Cell Biology", value: "Cell Biology" },
  {display: "Cellular & Molecular Physiology", value: "Cellular & Molecular Physiology" },
  {display: "Computational Biology & Bioinformatics", value: "Computational Biology & Bioinformatics" },
  {display: "Ecology & Evolutionary Biology", value: "Ecology & Evolutionary Biology" },
  {display: "Forestry & Environmental Studies", value: "Forestry & Environmental Studies" },
  {display: "Molecular Biophysics & Biochemistry", value: "Molecular Biophysics & Biochemistry" },
  {display: "Molecular, Cellular & Developmental Biology", value: "Molecular, Cellular & Developmental Biology" }
  ];

var Engineering = [
  {display: "Select department...", value: "" },
  {display: "Biomedical Engineering", value: "Biomedical Engineering" },
  {display: "Chemical & Environmental Engineering", value: "Chemical & Environmental Engineering" },
  {display: "Computer Science", value: "Computer Science" },
  {display: "Electrical Engineering", value: "Electrical Engineering" },
  {display: "Engineering & Applied Science", value: "Engineering & Applied Science" },
  {display: "Mechanical Engineering & Materials Science", value: "Mechanical Engineering & Materials Science"}
  ];

var HealthMedicine = [
  {display: "Select department...", value: "" },
  {display: "Anesthesiology", value: "Anesthesiology" },
  {display: "Biological & Biomedical Sciences", value: "Biological & Biomedical Sciences" },
  {display: "Biomedical Engineering", value: "Biomedical Engineering" },
  {display: "Biostatistics", value: "Biostatistics" },
  {display: "Cellular & Molecular Physiology", value: "Cellular & Molecular Physiology" },
  {display: "Child Study Center", value: "Child Study Center" },
  {display: "Chronic Disease Epidemiology", value: "Chronic Disease Epidemiology" },
  {display: "Comparative Medicine", value: "Comparative Medicine" },
  {display: "Dermatology", value: "Dermatology" },
  {display: "Diagnostic Radiology", value: "Diagnostic Radiology" },
  {display: "Emergency Medicine", value: "Emergency Medicine" },
  {display: "Environmental Health Sciences", value: "Environmental Health Sciences" },
  {display: "Epidemiology of Microbial Diseases", value: "Epidemiology of Microbial Diseases" },
  {display: "Experimental Pathology", value: "Experimental Pathology" },
  {display: "Genetics", value: "Genetics" },
  {display: "Health Care Management", value: "Health Care Management" },
  {display: "Health Policy", value: "Health Policy" },
  {display: "Health Policy & Management", value: "Health Policy & Management" },
  {display: "History of Medicine", value: "History of Medicine" },
  {display: "Immunobiology", value: "Immunobiology" },
  {display: "Internal Medicine", value: "Internal Medicine" },
  {display: "Investigative Medicine", value: "Investigative Medicine" },
  {display: "Laboratory Medicine", value: "Laboratory Medicine" },
  {display: "Microbial Pathogenesis", value: "Microbial Pathogenesis" },
  {display: "Molecular Biophysics & Biochemistry", value: "Molecular Biophysics & Biochemistry" },
  {display: "Neurology", value: "Neurology" },
  {display: "Neuroscience", value: "Neuroscience" },
  {display: "Neuroscience, Interdepartmental Program", value: "Neuroscience, Interdepartmental Program" },
  {display: "Neurosurgery", value: "Neurosurgery" },
  {display: "Nursing", value: "Nursing" },
  {display: "Obstetrics, Gynecology & Reproductive Sciences", value: "Obstetrics, Gynecology & Reproductive Sciences" },
  {display: "Ophthalmology & Visual Science", value: "Ophthalmology & Visual Science" },
  {display: "Orthopaedics & Rehabilitation", value: "Orthopaedics & Rehabilitation" },
  {display: "Pathology", value: "Pathology" },
  {display: "Pediatrics", value: "Pediatrics" },
  {display: "Pharmacology", value: "Pharmacology" },
  {display: "Psychiatry", value: "Psychiatry" },
  {display: "Public Health", value: "Public Health" },
  {display: "Surgery", value: "Surgery" },
  {display: "Therapeutic Radiology/Radiation Oncology", value: "Therapeutic Radiology/Radiation Oncology" },
  {display: "Urology", value: "Urology" }
];
var Humanities = [
  {display: "Select department...", value: "" },
  {display: "African Studies", value: "African Studies" },
  {display: "American Studies", value: "American Studies" },
  {display: "Architecture", value: "Architecture" },
  {display: "Classics", value: "Classics" },
  {display: "Comparative Literature", value: "Comparative Literature" },
  {display: "East Asian Languages & Literatures", value: "East Asian Languages & Literatures" },
  {display: "English", value: "English" },
  {display: "English Language & Literature", value: "English Language & Literature" },
  {display: "Film & Media Studies", value: "Film & Media Studies" },
  {display: "French", value: "French" },
  {display: "Genocide Studies", value: "Genocide Studies" },
  {display: "German", value: "German" },
  {display: "History", value: "History" },
  {display: "History of Art", value: "History of Art" },
  {display: "History of Medicine", value: "History of Medicine" },
  {display: "History of Science & Medicine", value: "History of Science & Medicine" },
  {display: "Humanities", value: "Humanities" },
  {display: "Italian Language & Literature", value: "Italian Language & Literature" },
  {display: "Judaic Studies", value: "Judaic Studies" },
  {display: "Medieval Studies", value: "Medieval Studies" },
  {display: "Music", value: "Music" },
  {display: "Near Eastern Languages & Civilizations", value: "Near Eastern Languages & Civilizations" },
  {display: "Philosophy", value: "Philosophy" },
  {display: "Religious Studies", value: "Religious Studies" },
  {display: "Renaissance Studies", value: "Renaissance Studies" },
  {display: "Slavic Languages & Literatures", value: "Slavic Languages & Literatures" },
  {display: "Spanish & Portuguese", value: "Spanish & Portuguese" },
  {display: "Theater Studies", value: "Theater Studies" }
];
var PhysicalSciences = [
  {display: "Select department...", value: "" },
  {display: "Applied Mathematics", value: "Applied Mathematics" },
  {display: "Applied Physics", value: "Applied Physics" },
  {display: "Astronomy", value: "Astronomy" },
  {display: "Chemistry", value: "Chemistry" },
  {display: "Geology & Geophysics", value: "Geology & Geophysics" },
  {display: "Mathematics", value: "Mathematics" },
  {display: "Physics", value: "Physics" }
];
var SocialSciences = [
  {display: "Select department...", value: "" },
  {display: "African American Studies", value: "African American Studies" },
  {display: "Anthropology", value: "Anthropology" },
  {display: "Archaeological Studies", value: "Archaeological Studies" },
  {display: "Biostatistics", value: "Biostatistics" },
  {display: "East Asian Studies ", value: "East Asian Studies " },
  {display: "Economics", value: "Economics" },
  {display: "European & Russian Studies", value: "European & Russian Studies" },
  {display: "Global Affairs", value: "Global Affairs" },
  {display: "International & Development Economics", value: "International & Development Economics" },
  {display: "Latin American Studies", value: "Latin American Studies" },
  {display: "Law", value: "Law" },
  {display: "Linguistics", value: "Linguistics" },
  {display: "Management", value: "Management" },
  {display: "Modern Middle East Studies", value: "Modern Middle East Studies" },
  {display: "Political Science", value: "Political Science" },
  {display: "Psychology", value: "Psychology" },
  {display: "Sociology", value: "Sociology" },
  {display: "South Asian Studies", value: "South Asian Studies" },
  {display: "Statistics", value: "Statistics" },
  {display: "Women’s, Gender, & Sexuality Studies", value: "Women’s, Gender, & Sexuality Studies" }
];

$("#categories").change(function() {
  var parent = $(this).val();
  switch (parent) {
    case 'Biological Sciences':
      list(BiologicalSciences);
      break;
    case 'Engineering':
      list(Engineering);
      break;
    case 'Health and Medicine':
      list(HealthMedicine);
      break;
    case 'Humanities':
      list(Humanities);
      break;
    case 'Physical Sciences':
      list(PhysicalSciences);
      break;
    case 'Social Sciences':
      list(SocialSciences);
      break;
    default: //default child option is blank
      $("#subcats").html('');
      break;
  }
});

function list(array_list) {
  $("#subcats").html(""); //reset child options
  $(array_list).each(function(i) { //populate child options
    $("#subcats").append("<option value=\"" + array_list[i].value + "\">" + array_list[i].display + "</option>");
  });
}

});
