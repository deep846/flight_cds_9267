/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"flight_cds_9267/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});