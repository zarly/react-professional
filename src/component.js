
const React = require('react');

class Component extends React.Component {
	constructor (...args) {
		super(...args);
		this._events = {};
	}

	/**
	 * Subscribe on the event
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */
	on (event, handler) {
		if (!this._events[event]) this._events[event] = [];
		this._events[event].push(handler);
	}

	/**
	 * Subscribe on the event just once
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */
	once (event, handler) {
		const proxyHandler = (...args) => {
			this.off(event, proxyHandler);
			return handler(...args);
		};
		this.on(event, proxyHandler);
	}

	/**
	 * Unsubscribe on the event
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */
	off (event, handler) {
		if (handler && this._events[event]) {
			this._events[event] = this._events[event].filter(h => h !== handler);
		} else {
			this._events[event] = [];
		}
	}

	/**
	 * Emit the event with the data
	 *
	 * @param {String} event
	 * @param {*} data
	 */
	emit (event, data) {
		const propHandlerName = 'on' + event[0].toUpperCase() + event.substr(1);
		if (this.props && this.props[propHandlerName]) {
			this.props[propHandlerName].call(this, data);
		}

		if (this._events[event]) {
			this._events[event].forEach(handler => {
				handler.call(this, data);
			});
		}
	}
}

module.exports = Component;
