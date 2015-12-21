document.addEventListener('DOMContentLoaded', start);

function start() {
 countTotal();
 getExpensive();
 countTypical();
 countOnlyRecommended();
 getRegularClient();
 makeSearch();
 getCostomers();
 task_2();
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
        
        orders = findByUser(element, ordersList);
        
        //можно ли как-то отсортировать таблицу по убыванию - чтобы вверху были те покупатели, у которых наибольшее количество покупок, и далее.... ?
        
        html += '<tr><td>' + element + '</td><td>' + orders.length + '</td></tr>';
        }
    orders.sort();
    document.getElementById('regular-users').innerHTML = html;
};





function task_2() {
    var startDate = new Date(2015, 5, 26, 0, 0, 0);
    var endDate = new Date(2015, 5, 28, 23, 59, 59);
    var list = filterByDate(ordersList, startDate, endDate);
    document.getElementById('period-sum').innerHTML = sum(list) + ' руб.';
    document.getElementById('period-total').innerHTML = list.length;
    document.getElementById('period-customers').innerHTML = getUsers(list).length;
    //document.getElementById('period-recommended').innerHTML = sum(list, 'recommended') + ' руб.'; как посчитать количество продаж за период... ?
};
    




function makeSearch() {
    document.getElementById('search-button').addEventListener('click', function() {
        var value = document.getElementById('search-field').value;
        if(value != '') {
            if(parseInt(value) != value) {
                alert('Введите ID покупателя!');
            } else {
                var orders = findByUser(value, ordersList);
                var html = '';
                var date;
                for(var i = 0; i < orders.length; i++) {
                    order = orders[i];
                date = new Date(order.timestamp * 1000);
                var dd = date.getDate();
                if (dd < 10) dd = '0' + dd;
                var mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;
                var yy = date.getFullYear() % 100;
                if (yy < 10) yy = '0' + yy;
                    
                    
                    
                    
                    html += '<tr><td>' + dd + '.' + mm + '.' + yy + '</td><td>' + order.id + '</td><td>' + order.total + ' руб.</td><td>' + order.typical + ' руб.</td><td>' + order.recommended + ' руб.</td></tr>';
                }
                document.getElementById('orders-by-user').innerHTML = html;
            }
        }
    })
}




function findByUser(user, elements) {
    var filtered = [];
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].user_id == user) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
}

function sum(elements, filter) {
    var sum = 0;
    for(var i = 0; i < elements.length; i++) {
        if( filter == 'typical' ) {
            sum += elements[i].typical;
        }
        if( filter == 'recommended' ) {
            sum += elements[i].recommended;
        }
        if( filter == null ) {
            sum += elements[i].total;
        }
    }
    return sum;
}

function getUsers(elements) {
    var list = [];
    for(var i = 0; i < elements.length; i++) {
        if(list.indexOf(elements[i].user_id) == -1) {
            list.push(elements[i].user_id);
        }
    }
    return list;
}

function filterOnlyTypical(elements) {
    var filtered = [];
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].recommended == 0) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
}

function filterOnlyRecommended(elements) {
    var filtered = [];
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].typical == 0) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
}

function filterByDate(elements, from, to) {
    var filtered = [];
    var from_i =  from.valueOf() / 1000;
    var to_i =  to.valueOf() / 1000;
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].timestamp >= from_i && elements[i].timestamp <= to_i) {
            filtered.push(elements[i]);
        }
    }
    return filtered;
};






