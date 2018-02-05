
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
});


