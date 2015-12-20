function start() {
    totalSum(); 
    totalOrders();
}


// Hello from Stas
function totalSum() {
    var sum = 0;
        
    for(var i=0; i < ordersList.length; i++) {
        
        sum += ordersList[i].total;        
    }
    return sum;
}
        
 
    
    
    sum = totalSum();
    
    {
    document.getElementById('total-sum').innerHTML = sum + ' руб.';
    
    }
