// 1桁の数字を0埋めで2桁にする
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
};

// 2) CSVから２次元配列に変換
function csv2Array(str) {
    var csvData = [];
    var lines = str.split("\n");
    for (var i = 0; i < lines.length; ++i) {
      var cells = lines[i].split("\t");
      csvData.push(cells);
    }
    return csvData;
  }
  
  function drawBarChart(data) {
    // 3)chart.jsのdataset用の配列を用意
    var tmpLabels = [], tmpData = [];
    var step = data.length - 1
    for (var i = 0; i < step; i++) {
      var tmp = data.pop()
      //console.log(tmp[1])
      var time = new Date(Date.parse(tmp[1]));
      tmpLabels.unshift(toDoubleDigits(time.getHours()) + ":" + toDoubleDigits(time.getMinutes()));
      tmpData.unshift(tmp[2]);
    }  
    // 4)chart.jsで描画
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tmpLabels,
        datasets: [
          { label: "滞在人数", data: tmpData, borderColor	: "gray" }
        ]
      },
      options: {
        scales: {
          yAxes: [{
              id: "人数",
              type: "linear", 
              position: "left",
              ticks: {
                //max: 60,
                  min: 0,
                  stepSize: 5
              }
          }]
        }
      }
    });
  }

  function main() {
    // 1) ajaxでCSVファイルをロード
    var req = new XMLHttpRequest();
    var filePath = './data/people_count.csv';
    req.open("GET", filePath, true);
    req.onload = function() {
      // 2) CSVデータ変換の呼び出し
      data = csv2Array(req.responseText);
      // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
      drawBarChart(data);
    }
    req.send(null);
  }
  
  main();
