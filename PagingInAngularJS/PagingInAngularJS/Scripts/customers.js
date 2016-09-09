//var app = angular.module('MyApp', ['angularUtils.directives.dirPagination']);
//app.controller('CustomerController', function ($scope, $http) {
//    //    debugger;
//    $http.get('/Data/GetCustomerList').then(function (d) {
//        debugger;
//        $scope.Customers = d.data;
//    });

//    $http.post('/Data/SaveCustomerList')
//           .success(function (status, headers) {
//               debugger;
//               $scope.PostDataResponse = data;
//           })
//})

//new changes 9 sep
var app = angular.module('MyApp', ['mgcrea.ngStrap','angularUtils.directives.dirPagination']);
app.controller('CustomerController', function ($scope, CustomerService) {
    //    debugger;
    $scope.save = true;
    $scope.sortKey = "CompanyName";
    $scope.update = false;
    $scope.Customers = null;
    $scope.ConvertJsonDateToMMDDYYYY = function (dt) {
        debugger;
        var dateString = dt.substr(6);
        var tempDateString = new Date(parseInt(dateString));
        var month = tempDateString.getMonth() + 1;
        var day = tempDateString.getDate();
        var year = tempDateString.getFullYear();
        if (day.toString().length == 1) {
            day = "0" + day.toString();
        }
        if (month.toString().length == 1)
        {
            month = "0" + month.toString();
        }        
        var date = month + "/" + day + "/" + year;
        return date;
    }
    $scope.AddNew = function (d)
    {
        debugger;
        $scope.inputCompanyName = '';
        $scope.inputContactName = '';
        $scope.inputTitle = '';
        $scope.inputCountry = '';
        $scope.inputAddress = '';
        $scope.inputCity = '';
        $scope.inputRegion = '';
        $scope.inputPostalCode = '';
        $scope.inputPhone = '';
        $scope.inputFAX = '';
        $scope.inputDOB = '';
        $scope.hdnCustomerID = '';
        $scope.save = true;
        $scope.update = false;
        //var customerId = 
    }
    CustomerService.GetCustomerList().then(function (d) {
        debugger;        
        $scope.Customers = d.data;

    }, function () {
        alert('failed');
    });
    $scope.SaveCustomerList = function () {
        debugger;
        $params = $.param({            
            "compName": $scope.inputCompanyName,
            "contactName": $scope.inputContactName,
            "title": $scope.inputTitle,
            "address": $scope.inputAddress,
            "city": $scope.inputCity,
            "region": $scope.inputRegion,
            "postalCode": $scope.inputPostalCode,
            "country": $scope.inputCountry,
            "phone": $scope.inputPhone,
            "fax": $scope.inputFAX,
            "dob": $scope.inputDOB = ($scope.inputDOB != null && $scope.inputDOB != "") ? $scope.inputDOB.split('/')[1] + '/' + $scope.inputDOB.split('/')[0] + '/' + $scope.inputDOB.split('/')[2] : "01/01/1900"
        });
        debugger;
        CustomerService.SaveCustomerList($params).then(function (d) {
            debugger;
            var dd;
            CustomerService.GetCustomerList().then(function (d) {
                debugger;
                $scope.Customers = d.data;
                $("#CustomerModal").modal("hide");
            });
        });
    };

    $scope.UpdateCustomer = function () {
        debugger;
        $params = $.param({            
            "customerID":$scope.hdnCustomerID,
            "compName": $scope.inputCompanyName,
            "contactName": $scope.inputContactName,
            "title": $scope.inputTitle,
            "address": $scope.inputAddress,
            "city": $scope.inputCity,
            "region": $scope.inputRegion,
            "postalCode": $scope.inputPostalCode,
            "country": $scope.inputCountry,
            "phone": $scope.inputPhone,
            "fax": $scope.inputFAX,
            "dob": $scope.inputDOB=$scope.inputDOB != null ? $scope.inputDOB.split('/')[1] + '/' + $scope.inputDOB.split('/')[0] + '/' + $scope.inputDOB.split('/')[2] : "01/01/1900"
        });
        debugger;
        CustomerService.UpdateCustomer($params).then(function (d) {
            debugger;
            CustomerService.GetCustomerList().then(function (d) {
                debugger;
                $scope.Customers = d.data;
                $("#CustomerModal").modal("hide");
            });
        })
    }
    $scope.DeleteCustomer = function (d) {
        if (confirm("Are you you want to delete")) {
            $params = $.param({
                "customerID": d.toElement.id
            });
            CustomerService.DeleteCustomer($params).then(function (d) {
                CustomerService.GetCustomerList().then(function (d) {
                    debugger;
                    $scope.Customers = d.data;
                    $("#CustomerModal").modal("hide");
                });
            })
        }
        
    }
    $scope.FindCustomer = function (d) {
        debugger;
        $params = $.param({
            "customerID": d.toElement.id
        });
        $scope.save = false;
        $scope.update = true;
        CustomerService.FindCustomer($params).then(function (d) {
            debugger;
            $scope.inputCompanyName = d.data.CompanyName;
            $scope.inputContactName = d.data.ContactName;
            $scope.inputTitle = d.data.ContactTitle;
            $scope.inputCountry = d.data.Country;
            $scope.inputAddress = d.data.Address;
            $scope.inputCity = d.data.City;
            $scope.inputRegion = d.data.Region;
            $scope.inputPostalCode = d.data.PostalCode;
            $scope.inputPhone = d.data.Phone;
            $scope.inputFAX = d.data.Fax;
            $scope.inputDOB = d.data.DOB!= null?$scope.ConvertJsonDateToMMDDYYYY(d.data.DOB):null;//d.data.DOB;
            $scope.hdnCustomerID = d.data.CustomerID;
            $("#CustomerModal").modal("show");
            debugger;
        })
    }
})
.factory('CustomerService', function ($http) {
    var fac = {};
    fac.GetCustomerList = function () {
        return $http.get('/Data/GetCustomerList');
    };
    fac.SaveCustomerList = function ($params) {
        return $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: '/Data/SaveCustomerList',
            method: 'POST',
            data: $params
        })
            .success(function (addCustomer) {
                debugger;
                var aa;
                return addCustomer
            })

    };
    fac.FindCustomer = function ($params) {
        return $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: '/Data/FindCustomer',
            method: 'POST',
            data: $params
        }).success(function (customer) {
            return customer;
        });
    };
    fac.UpdateCustomer = function ($params) {
        return $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: '/Data/UpdateCustomer',
            method: 'POST',
            data: $params
        }).success(function (customer) {
            return customer;
        });
    };
    fac.DeleteCustomer = function ($params) {
        return $http({
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: '/Data/DeleteCustomer',
            method: 'POST',
            data: $params
        }).success(function (customer) {
            return customer;
        });
    }
    return fac;
});