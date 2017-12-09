angular.module("MyApp", [])
.controller("MyCtrl", function ($scope) {
  $scope.showData= false;

  $scope.callOne = function (data) {
    // console.log(data)
    if (data!= undefined && data != '' && data != null) {
        $scope.showData= true;
        $scope.$broadcast("toggleAnimation", data);
    }
    else{
     alert("Please enter a valid loan amount.");}
 }

 $scope.clear = function (data) {
    data= '';

    $scope.showData= false;
    // console.log(data)
}
})
.directive("myDirOne", function () {

    return {
        restrict : "E",
        template :  "<div class='table-responsive'>"+"<table align='right' class='table table-bordered'>"+"  <tbody>"+"    <tr>"+"      <td><b>Loan Amount:</b></td>"+ "      <td align='right'>{{broadcastedText.amt}}</td>"+"    </tr>"+"    <tr>"+"      <td><b>Number of EMIs:</b></td>"+"      <td align='right'>{{broadcastedText.pay}}</td>"+"    </tr>"+"    <tr>"+"      <td><b>Annual Interest Rate:</b></td>"+"      <td align='right'>{{broadcastedText.rate | number : 4}}</td>"+"    </tr>"+"    <tr>"+"      <td><b>Monthly Interest Rate:</b></td>"+"      <td align='right'>{{broadcastedText.mIR | number : 5}}</td>"+"    </tr>"+"    <tr>"+"      <td><b>Monthly EMI Payment:</b></td>"+"<td align='right'>{{broadcastedText.mEMI | currency:'&#8377;'}}</td>"+"</tr>"+"<tr>"+"<td><b>Total Loan Amount Payable:</b></td>"+"<td align='right'>{{broadcastedText.totalPay | currency:'&#8377;'}}</td>"+"</tr>"+"<tr>"+"<td><b>Total Interest Payable:</b></td>"+"<td align='right'>{{broadcastedText.intrestPay | currency:'&#8377;'}}</td>"+"</tr>"+"</tbody>"+"</table>"+" </div>",
        link : function (scope) {
          scope.$on("toggleAnimation", function (event, args) {
            scope.broadcastedText={};
            scope.broadcastedText = args;
            scope.broadcastedText.rate=args.rate/100;
            scope.broadcastedText.mIR=args.rate/12;
            scope.MR= scope.broadcastedText.rate/12;

            var data=(Math.pow((1+ scope.MR),(args.pay)));
            var data1=(Math.pow((1+ scope.MR),(args.pay)))-1;
            var data2= args.amt * scope.MR ;

            scope.broadcastedText.mEMI= (data2 * data )/data1;
            scope.broadcastedText.totalPay = (scope.broadcastedText.mEMI * scope.broadcastedText.pay);
            scope.broadcastedText.intrestPay= (scope.broadcastedText.totalPay - scope.broadcastedText.amt);

            // console.log(scope.broadcastedText.intrestPay);
            // console.log(scope.broadcastedText.totalPay)
            // console.log(scope.broadcastedText);
            // console.log(scope.MR);
            // console.log(data);
            // console.log(data1);
            // console.log(data2);
        });
}
};

})

.directive("myDirTwo", function () {

  return {
    restrict : "E",
    template : " <div class='table-responsive'>"+
    "<table class='table table-bordered' border='1' align='right' cellpadding='5' cellspacing='0' width='100%' style='font-family:arial;font-size:12px'>"+
    "  <thead class='data-grid-header'>"+
    "    <tr>"+
    "      <td align='center' valign='bottom' bgcolor='white'><b>Period</b></td>"+
    "      <td align='right' valign='middle' bgcolor='white'><b>EMI</b></td>"+
    "      <td align='right' valign='middle' bgcolor='white'><b>Interest</b></td>"+
    "      <td align='right' valign='middle' bgcolor='white'><b>Principal</b></td>"+
    "      <td align='right' valign='middle' bgcolor='white'><b>Balance</b></td>"+
    "    </tr>"+
    "    </thead>"+
    "   <tbody class='data-grid-data'>"+
    "    <tr ng-repeat='data in gridDtata' >"+
    "      <td align='right' valign='middle' bgcolor='white'>{{data.Period}}</td>"+
    "      <td align='right' bgcolor='white'>&nbsp;{{data.emi | currency:'&#8377;'}}</td>"+
    "      <td align='right' bgcolor='white'>&nbsp;{{data.interest | currency:'&#8377;'}}</td>"+
    "      <td align='right' bgcolor='white'>&nbsp;{{data.principal | currency:'&#8377;'}}</td>"+
    "      <td align='right' valign='middle' bgcolor='white'>{{data.balance | currency:'&#8377;'}}</td>"+
    "    </tr>"+
    "    </tbody>"+
    "  </table>"+
    "</div>",
    link : function (scope) {
      scope.$on("toggleAnimation", function (event, args) {
        scope.gridVal = args;
        // console.log(scope.gridVal)
        // console.log(scope.gridVal.amt)//100
        // console.log(scope.gridVal.intrestPay)//0.010000111175699544
        // console.log(scope.gridVal.mEMI)//50.00500005558785
        // console.log(scope.gridVal.mIR)//0.006666666666666667
        // console.log(scope.gridVal.pay)//2
        // console.log(scope.gridVal.rate)//0.08
        // console.log(scope.gridVal.totalPay)//100.0100001111757
        scope.gridDtata=[];
        scope.Period=[];
        scope.emi=[];
        scope.interest=[];
        scope.principal=[];
        scope.balance=[];

        for (var i = 1; i <= scope.gridVal.pay; i++) {
            scope.Period[0]=0;
            scope.emi[0]= 0;
            scope.interest[0]= 0;
            scope.principal[0]= 0;
            scope.balance[0]= scope.gridVal.amt;
            scope.Period[i]=i;
            scope.emi[i]=scope.gridVal.mEMI;
            scope.interest[i]= scope.balance[i-1] * scope.gridVal.mIR;
            scope.principal[i]= scope.emi[i] - scope.interest[i];
            if ((scope.balance[i-1] - scope.principal[i]) < 0 ) {
                scope.balance[i]=  0;
            }else{ scope.balance[i]=  scope.balance[i-1] - scope.principal[i] ;}
        };

        for (var i = 0; i <= scope.gridVal.pay; i++) {
            scope.gridDtata.push({
                'Period': scope.Period[i],
                'emi':scope.emi[i],
                'interest': scope.interest[i],
                'principal': scope.principal[i],
                'balance':  scope.balance[i]
            })
        };
            // console.log(scope.gridDtata)

        });
}
};

});