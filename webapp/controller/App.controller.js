sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/routing/History",
  "sap/ui/core/UIComponent"
], function (Controller, JSONModel, History, UIComponent) {
  "use strict";

  return Controller.extend("sapform.controller.App", {

    onInit: function () {
      // Initialization if needed
    },

    onProductPress: function (oEvent) {
      var sPath = oEvent.getSource().getBindingContext("products").getPath();
      var index = sPath.split("/")[1]; // example: /2 → 2

      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("Product", { productIndex: index });
    },

    onSubmitPress: function () {
      var oView = this.getView();

      var oData = {
        name: oView.byId("nameInput").getValue(),
        street: oView.byId("streetInput").getValue(),
        city: oView.byId("cityInput").getValue(),
        zip: oView.byId("zipInput").getValue(),
        country: oView.byId("countryInput").getValue(),
        purchaseOrder: oView.byId("poInput").getValue(),
        validFrom: oView.byId("validFrom").getDateValue(),
        validTo: oView.byId("validTo").getDateValue(),
        netValue: oView.byId("nvInput").getValue()
      };

      // Set the form model globally
      var oModel = new JSONModel(oData);
      this.getOwnerComponent().setModel(oModel, "formModel");

      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("Detail");



      
      var oProductModel = this.getOwnerComponent().getModel("products");
      var aProducts = oProductModel.getProperty("/") || [];

      
      var oNewProduct = {
        productId: Date.now(), // unique temporary ID
        name: oData.name,
        category: oData.purchaseOrder,
        price: oData.netValue,
        stock: oData.zip,
        manufacturer: oData.country
      };

      aProducts.push(oNewProduct);
      oProductModel.setProperty("/", aProducts);
    },



    onNavBack: function () {
      var oHistory = History.getInstance();
      var sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        window.history.back();
      } else {
        var oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo("App", {}, true);
      }
    }

  });
});
