sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], (Controller, Filter, FilterOperator, Sorter, Fragment, JSONModel) => {
    "use strict";
    var flag = false;

    return Controller.extend("flightcds9267.controller.View2", {

        onInit() {

            // This is uesed to do busy indicator on the page while loading
            var oBusyIndicator = this.byId("busyIndicator");

            // This is used to get service call to particular entityset
            var model = this.getOwnerComponent().getModel();
            var entity = '/zsfligtbooking_9267'

            var that = this

            // This is used to get service call to particular entityset
            model.read(entity, {
                success: function (odata, res) {
                    if (res.statusCode === "200" || res.statusText === "OK") {

                        // to create a perticular model and attached it to the view
                        var oMod = new JSONModel(odata)

                        oBusyIndicator.setVisible(false);
                        that.getView().setModel(oMod, "flight")

                    }
                }
            })

        },


        // This function to change the date format
        DateFormat: function (sDate) {
            if (!sDate || sDate === undefined || sDate === null) {
                return "N/A";
            }
            var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd/MM/yyyy" });
            return oDateFormat.format(new Date(sDate));
        },

        // This is used for searching a field also for search tab
        onSearchFieldSearch: function (oEvent) {
            var search = oEvent.getParameter("query")
            var search = oEvent.getParameter("newValue")
            var oList = this.byId('idToolsList')
            var oBinding = oList.getBinding("items");

            // This is used to try filter on the connection id
            var oFilter = new Filter("connid", FilterOperator.Contains, search);
            var FilterProperties = [oFilter]
            oBinding.filter(FilterProperties);

        },

        //    This is  used to sorting on the basis of carrid 
        sortAdv: function () {

            var oList = this.byId("idToolsList");
            var oBinding = oList.getBinding("items");
            if (flag === false) {
                var oSorter = new Sorter("carrid", true);
                flag = true;
            }
            else {
                var oSorter = new Sorter("carrid", false);
                flag = false;
            }
            oBinding.sort(oSorter);
        },



        //  This is used to f4help and fragments 
        onf4Help1: function (oevt) {
            this.id = oevt.getSource().getId()
            if (!this.oFragment) {
                this.oFragment = Fragment.load({
                    name: "flightcds9267.fragments.popup",
                    controller: this
                }).then((result) => {

                    this.oFragment = result;

                    this.getView().addDependent(this.oFragment)
                    this.oFragment.open()

                }).catch((err) => {
                    console.log('error occured');

                });

            } else {
                this.oFragment.open()
            }

        },

        // This done when fragment's code is confrimed or selected
        onConfrim: function (oEvent) {
            
            var text = oEvent.getParameter("selectedItem").getValue()

            sap.ui.getCore().byId(this.id).setValue(text)

            var oList = this.byId('idToolsList')
            var oBinding = oList.getBinding("items");

            var oFilter = new Filter("connid", FilterOperator.Contains, text);

            var FilterProperties = [oFilter]

            oBinding.filter(FilterProperties);

        }





    });
});