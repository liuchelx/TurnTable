$(document).ready(function() {
});

 

 function rotate(){
    console.log('work');
    console.log($("#rotate").attr("action"))

    $.ajax({

      url: $("#rotate").attr("action"),
      type: $("#rotate").attr("method"),
      data: getFormData($("#rotate")),

      success: function(data) {
        console.log(data)
        if(data.isDraw =='no'){
            if(data.prize<6){
                doTheTurn(data.prize)
                console.log(data.prize)
                document.getElementById("DrawThePrize").style.display="none";//隐藏抽奖页
                document.getElementById("winThePrize").style.display="";//显示中奖 
                document.getElementById("PrizeName").innerHTML = data.name  
            }
            else if(data.prize=6){
                window.location.href='/turn/no_prize';
            }   
         }
        else{
            window.location.href='/turn/exist';
        }
        
      },
      error: function(result) {
        console.log("not right", result);
      }
    });
  };

function doTheTurn(prize){
    var oPointer = document.getElementsByTagName("img")[1];
    var oTurntable = document.getElementsByTagName("img")[2];
    var num = 0; //转圈结束后停留的度数
    var offOn = true; //是否正在抽奖
    if (offOn) {
        oTurntable.style.transform = "rotate(0deg)";
        offOn = !offOn;
        var timer = null;
        clearInterval(timer);
        var rdm = rotateDegree(prize);
        timer = setInterval(function () {
            oTurntable.style.transform = "rotate(" + rdm + "deg)";
            clearInterval(timer);
            setTimeout(function () {
                offOn = !offOn;
                num = rdm % 360;
            }, 4000);
        }, 30);
}
}



 //turntable js
 function rotateDegree(prize){
    var cat = 36; //总共10个扇形区域，每个区域约36度
    var randomDeg = Math.random() * 36 - 15; //干扰角度，每次不会都指向区域正中心
    var deg = 360;
    if (prize == 1) {
        deg += 360-36*2 + randomDeg;
    }
    else if (prize == 2) {
        deg += 360+36*2 + randomDeg;
    }
    else if (prize == 3) {
        deg += 360-6*36 + randomDeg;
    }
    else if (prize == 4) {
        deg += 360-36 + randomDeg;
    }
    else if (prize == 5) {
        deg += 360-36*4 + randomDeg;
    }
    else if (prize == 6) {
        deg += randomDeg;
    }
    else if (prize == 7) { 
        no_prize_items = [36, 108, 180, 252];
        deg += no_prize_items[Math.floor(Math.random()*no_prize_items.length)] + randomDeg;
    } 
    return deg;
}


function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i) {
      indexed_array[n["name"]] = n["value"];
    });
    return indexed_array;
  }

  
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }


