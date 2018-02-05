## React Professional

Overrides React Component by event driven version.

### Methods

- on(event, handler) - bind event
- once(event, handler) - bind event once
- off(event, handler) - unbind event
- emit(event, data) - emit event

### Examples

```javascript
import {Component} from 'react-professional';

class SomeComponent extends Component {
    ...
}

component.on('some_event', () => console.log('event happend'));
component.emit('some_event');
```

```javascript
const component = new Component({
    onClick: (data) => console.log('clicked', data)
});
component.emit('click', 42);
```
