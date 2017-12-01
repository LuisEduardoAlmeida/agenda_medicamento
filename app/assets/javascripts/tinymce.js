var tinymce_call = function() {
  setTimeout(function(){ 

    tinymce.init({
      selector: ".tinymce",
      plugins: [
       "advlist autolink lists link image charmap print preview anchor",
       "searchreplace visualblocks code fullscreen autoresize",
       "insertdatetime media table contextmenu paste"
      ],
      menu : "core",
      toolbar: "bold | italic | underline | strikethrough | justifyleft | justifycenter | justifyright | justifyfull | bullist | numlist | outdent | indent | cut | copy | paste | undo | redo | link | unlink | image | cleanup | help | code | hr | removeformat | formatselect | fontselect | fontsizeselect | styleselect | sub | sup | forecolor | backcolor | forecolorpicker | backcolorpicker | table | blockquote | undo redo | alignleft aligncenter alignright"
    });
   }, 50);
}
$(window).ready(tinymce_call)
$(window).bind('page:load', tinymce_call)

