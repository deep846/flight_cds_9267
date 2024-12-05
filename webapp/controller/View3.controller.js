sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller,JSONModel,MessageBox,MessageToast) => {
    "use strict";
    var flag=false;

    return Controller.extend("flightcds9267.controller.View3", {

        onInit:function(){

            // This is used to loading the cities data to the view
            var model = new JSONModel('model/mock/cities.json')
            this.getView().setModel(model,"cities")
        },


        // after pressed booking all booking parameter will be checked here
        // all the authorization can be checked here
        onPressBook: function(){
            var name = this.getView().byId("name")
            var date = this.getView().byId("date")
            var connectionId = this.getView().byId("con").getSelectedKey()
            var from = this.getView().byId("loc1").getSelectedKey()
            var To = this.getView().byId("loc2").getSelectedKey()
            var contact = this.getView().byId("contact")
            var currectDate = getCurrentDate()
            var BookingID = generateUniqueId();


            // This is for getting the current date for booking date
            function getCurrentDate() {
                var today = new Date(); // Get current date
                var day = today.getDate(); // Get day
                var month = today.getMonth() + 1; // Get month (Note: Months are 0-based)
                var year = today.getFullYear(); // Get year
            
                // Add leading zeros to day and month if needed
                day = day < 10 ? '0' + day : day;
                month = month < 10 ? '0' + month : month;
            
                // Return formatted date in dd-mm-yyyy
                return day + '-' + month + '-' + year;
            }

            // This function is for generating the uuid (unique id of 8 digit for booking id)
            function generateUniqueId() {
                var timestamp = new Date().getTime().toString(36); // Convert current time to base-36 (a-z0-9)
                var randomStr = Math.random().toString(36).substring(2, 8); // Generate a random string of 6 characters
                var uniqueId = timestamp.slice(-2) + randomStr; // Combine timestamp and random part for uniqueness
                return uniqueId.substring(0, 8); // Ensure the result is 8 characters long
            }


            var oConfrimArray = [name,date,contact]
            var oArray = [
                `Name:    ${name.getValue()}`,
                `Booking Id:   ${BookingID}`,
                `Flight Date:    ${date.getValue()}`,
                `Booking Date:    ${currectDate}`,
                `Connection Details:    ${connectionId}`,
                `From:    ${from}`,
                `To:    ${To}`,
                `Contact No:    +91 ${contact.getValue()}`
            ]
            var details = oArray.join("\n");

            var flag = true
            var flag2 = true

            // checking parameter
            oConfrimArray.forEach((item)=>{

                if(item.getValue()===""){
                    item.setValueState(sap.ui.core.ValueState.Error)
                    item.setValueStateText(`please provide ${item.getName()}`)
                    flag = false; 
                }
                else{
                    item.setValueState(sap.ui.core.ValueState.None)
                }

            })

            // checking both the destination and source are same or not ?
           if(from===To){
            MessageToast.show("Destination and source should not be same")
            flag2 = false;
           }

            //if checking is passed then go ahed or else not.
           if(flag && flag2){
            MessageBox.success(details, {
                title: `Booking confrimed`,                                    
                onClose: null,                                       
                styleClass: "",                                      
                actions: [ sap.m.MessageBox.Action.OK,
                           sap.m.MessageBox.Action.CANCEL ],         
                emphasizedAction: sap.m.MessageBox.Action.OK,        
                initialFocus: null,                                  
                textDirection: sap.ui.core.TextDirection.Inherit,    
                dependentOn: null                                    
            });
           }
            
        }
});
});