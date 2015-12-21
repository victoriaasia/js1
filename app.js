document.addEventListener('DOMContentLoaded', start);

function start() {
 countTotal();
 getExpensive();
 countTypical();
 countOnlyRecommended();
 getRegularClient();
 getCostomers();
}


function countTotal() {
    var sum = 0;
    var recommended = 0;
    var typical = 0;
    var common = 0;
    
    
    for(var i=0; i < ordersList.length; i++) {
        sum += ordersList[i].total;  
        recommended += ordersList[i].recommended;
        typical += ordersList[i].typical;
        common = ordersList.length;
         }
    document.getElementById('total-sum').innerHTML = sum + ' руб.';
      document.getElementById('total-recommended').innerHTML = recommended + ' руб.';
    document.getElementById('total-typical').innerHTML = typical + ' руб.';
      document.getElementById('total-orders').innerHTML = common;
};


function getExpensive() {
    var list = ordersList.sort(function(a,b) {
        if (a.total > b.total) {
            return -1;
        }
        if (a.total < b.total) {
            return 1;
        }
        return 0;
    }).slice(0, 5);

    var html = '';
    var date = null;
    var element = null;

    for(var i = 0; i < list.length; i++) {
        element = list[i];
        var date = new Date(element.timestamp * 1000);
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
        
        html += '<tr><td>' + dd + '.' + mm + '.' + yy + '</td><td>' + element.id + '</td><td>' + element.user_id + '</td><td>' + element.total + ' руб.</td><td>' + element.typical + ' руб.</td><td>' + element.recommended + ' руб.</td></tr>';
    }

    document.getElementById('top-orders').innerHTML = html;
};




function getCostomers() {
      var costomers = {};
    for(var i = 0; i < ordersList.length; i++) {
        if(typeof(costomers[ordersList[i].user_id]) == 'undefined') {
            costomers['' + ordersList[i].user_id] = 1;
        } else {
            costomers['' + ordersList[i].user_id]++;
        }
    }
    var moreOne = [];
    for(var i in costomers) {
        if(costomers.hasOwnProperty(i)) {
            if(costomers[i] > 1) {
                moreOne.push(i);
            }
        }
    }    
    document.getElementById('total-customers').innerHTML = moreOne.length;
};




function countTypical() {
    var sales = [];
     for (var i = 0; i < ordersList.length; i++) {
        if(ordersList[i].recommended === 0) {
        sales.push(ordersList[i]);
        }         
    }
    document.getElementById('total-without-recommended').innerHTML = sales.length;
};



function countOnlyRecommended() {
    var sales2 = [];
     for (var i = 0; i < ordersList.length; i++) {
        if(ordersList[i].typical === 0) {
        sales2.push(ordersList[i]);
        }         
    }

document.getElementById('total-without-typical').innerHTML = sales2.length;
};




function getRegularClient() {
    var userOrdersCount = {};
    for(var i = 0; i < ordersList.length; i++) {
        if(typeof(userOrdersCount[ordersList[i].user_id]) == 'undefined') {
            userOrdersCount['' + ordersList[i].user_id] = 1;
        } else {
            userOrdersCount['' + ordersList[i].user_id]++;
        }
    }
    var regularUsers = [];
    for(var i in userOrdersCount) {
        if(userOrdersCount.hasOwnProperty(i)) {
            if(userOrdersCount[i] > 10) {
                regularUsers.push(i);
            }
        }
    }

    var html = '';
    var element = null;
    var orders = null;

    for(var i = 0; i < regularUsers.length; i++) {
        element = regularUsers[i];
        
       orders = userOrdersCount.length; //что здесь писать, чтобы посчитать сколько раз встречается юзер_айди? то есть сколько покупок он совершил?..
       
        
        html += '<tr><td>' + element + '</td><td>' + orders + '</td></tr>';
    }

    document.getElementById('regular-users').innerHTML = html;
};





function task_2() {
    var startDate = new Date(2015, 05, 26);
    var endDate = new Date(2015, 05, 28, 23, 59, 59);
    
    var sumPeriod = 0;
    //var list = [];
    
    // нужно как-то сравнить даты....
        for(var i=0; i < ordersList.length; i++){
       if(startDate < ordersList.timestamp * 1000 < endDate) {
         sumPeriod += ordersList[i].total;  
           
       }
    }   
    
    
    
    
    document.getElementById('period-sum').innerHTML = sumPeriod + ' руб.';
    //document.getElementById('period-total').innerHTML = list.length;
    //document.getElementById('period-customers').innerHTML = getUsers(list).length;
    //document.getElementById('period-recommended').innerHTML = sum(list, 'recommended') + ' руб.';
}



