function exportToExcel(seletor, file_name){
  var htmls = "";
  var uri = 'data:application/vnd.ms-excel;base64,';
  var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><body><table>{table}</table></body></html>'; 
  var base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)))
  };

  var format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
      })
  };
  // if (seletor.constructor == Array) {}
  // htmls = $(seletor).html();

  $.each(seletor, function( index, value ) {
    htmls += $(value).html();
  });

  var ctx = {
      worksheet : 'Worksheet',
      table : htmls
  }


  var link      = document.createElement("a");
  link.download = file_name + ".xls";
  link.href     = uri + base64(format(template, ctx));
  link.click();
}
