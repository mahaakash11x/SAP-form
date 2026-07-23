sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sapform.controller.Product", {
    onInit: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("Product").attachPatternMatched(this._onRouteMatched, this);
      console.log("Product Controller Loaded!");
    },

    _onRouteMatched: function (oEvent) {
      var index = oEvent.getParameter("arguments").productIndex;
      var oModel = this.getView().getModel("products");
      var sPath = "/" + index;
      this.getView().bindElement({ path: sPath, model: "products" });

      //  Refresh the model to reflect any changes made in debugging
      oModel.refresh(true);
    },

    onBack: function () {
      this.getOwnerComponent().getRouter().navTo("App");
    }
  });
});
