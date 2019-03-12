'use strict';


const SubDevice = require('./subdevice');
const { ContactDetection } = require('abstract-things/sensors');
const Voltage = require('./voltage');

/**
 * Magnet device, emits events `open` and `close` if the state changes.
 */
module.exports = class Magnet extends SubDevice.with(ContactDetection, Voltage) {
	constructor(parent, info) {
		super(parent, info);

		this.miioModel = 'lumi.magnet';

		this.defineProperty('status');
	}

	propertyUpdated(key, value, oldValue) {
		if(key === 'status') {
			// Change the contact state
			const isContact = value === 'close';
			this.updateContact(isContact);
		}

		super.propertyUpdated(key, value, oldValue);
	}
};
