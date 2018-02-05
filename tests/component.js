
const assert = require('chai').assert;
const React = require('react');
const Component = require('..').Component;

describe('Component', function () {
	it('should be defined', function () {
		assert.equal(typeof Component, 'function');
	});

	it('should be child of React.Component', function () {
		assert.instanceOf(Component.prototype, React.Component);
	});

	it('should have proper methods', function () {
		const component = new Component();
		assert.equal(typeof component.on, 'function');
		assert.equal(typeof component.once, 'function');
		assert.equal(typeof component.off, 'function');
		assert.equal(typeof component.emit, 'function');
	});

	it('should call event handler', function (done) {
		const component = new Component();
		component.on('some_event', done);
		component.emit('some_event');
	});

	it('should not call event handler after off by handler', function () {
		function handler () {
			throw new Error('Should not be called');
		}
		const component = new Component();
		component.on('some_event', handler);
		component.off('some_event', handler);
		component.emit('some_event');
	});

	it('should not call event handler after off without handler', function () {
		function handler () {
			throw new Error('Should not be called');
		}
		const component = new Component();
		component.on('some_event', handler);
		component.off('some_event');
		component.emit('some_event');
	});

	it('should call proper event handler', function (done) {
		function handler () {
			throw new Error('Should not be called');
		}
		const component = new Component();
		component.on('some_event', handler);
		component.on('some_event', done);
		component.off('some_event', handler);
		component.emit('some_event');
	});

	it('should call proper event from multiple events', function (done) {
		function handler () {
			throw new Error('Should not be called');
		}
		const component = new Component();
		component.on('proper_event', done);
		component.on('other_event', handler);
		component.emit('proper_event');
	});

	it('should call event once', function () {
		var counter = 0;
		function handler () {
			assert.equal(++counter, 1);
		}
		const component = new Component();
		component.once('some_event', handler);
		component.emit('some_event');
		component.emit('some_event');
	});

	it('should call event multiple times', function () {
		var counter = 0;
		function handler () {
			counter++;
		}
		const component = new Component();
		component.on('some_event', handler);
		component.emit('some_event');
		component.emit('some_event');
		component.emit('some_event');
		assert.equal(counter, 3);
	});
});


