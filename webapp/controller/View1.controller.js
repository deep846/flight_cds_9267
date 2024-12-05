sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("flightcds9267.controller.View1", {
        onInit() {
            // after initializing we create a json model to the view
            // to create master page content
            var oModel = new JSONModel('model/mock/crud.json')
            this.getView().setModel(oModel, "crud")

        },


        //This is the function call when we press it gose to the reapective page
        onToolsListSelectionChange: function (oEvent) {


            var oItem = oEvent.getParameter("listItem");
            var path = oItem.getBindingContextPath();

            var parts = path.split('/');
            var number = parseInt(parts[parts.length - 1]) + 2;

            // This is the router component instance that help us to navigate among pages
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(`RouteView${number}`)
        },


    });
});