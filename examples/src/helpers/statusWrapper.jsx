/* Ignore this file as it is only for showing jPlayer properties and events in real time */
import React from 'react';

import PropsInRealTime from './propsInRealTime';
import EventsInRealTime from './eventsInRealTime';

class StatusWrapper extends React.Component {
  static get propTypes() {
    return {
      uid: React.PropTypes.string.isRequired,
      children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element),
      ]).isRequired,
    };
  }
  constructor() {
    super();

    this.state = {
      eventCalls: {
        onProgress: 0,
        onTimeUpdate: 0,
        onDurationChange: 0,
        onRateChange: 0,
        onSeeking: 0,
        onSeeked: 0,
        onPlay: 0,
        onRepeat: 0,
        onEnded: 0,
        onError: 0,
        onPlaying: 0,
        onPause: 0,
        onWaiting: 0,
        onSuspend: 0,
        onVolumeChange: 0,
        onLoadStart: 0,
        onLoadedMetadata: 0,
        onAbort: 0,
        onEmptied: 0,
        onStalled: 0,
        onLoadedData: 0,
        onCanPlay: 0,
        onCanPlayThrough: 0,
      },
    };
    this.events = {};
    this.eventTimeouts = [];

    Object.keys(this.state.eventCalls).forEach((eventName) => {
      this.events[eventName] = () => {
        this.setState(prevState => (
          this.modifyEventCalls(prevState.eventCalls, eventName, true)
        ), () => (
          this.eventTimeouts.push(this.removeEventCallTimeout(eventName))
        ));
      };
    });

    this.browserUnsupportedHtml = (
      <div>
        <h2>Browser Unsupported</h2>
        <div>
          To play the media you will need to update your browser to a more recent version.
        </div>
      </div>
    );
  }
  componentWillUnmount() {
    this.eventTimeouts.forEach(timeoutNumber => clearTimeout(timeoutNumber));
  }
  removeEventCallTimeout = eventName => (
    setTimeout(() => this.setState(prevState => (
      this.modifyEventCalls(prevState.eventCalls, eventName, false)
    )), 1000)
  )
  modifyEventCalls = (eventCalls, eventName, increment) => {
    let callNumber = eventCalls[eventName];
    callNumber = increment ? callNumber + 1 : callNumber - 1;
    return {
      eventCalls: {
        ...eventCalls,
        [eventName]: callNumber,
      },
    };
  };
  render() {
    return (
      <div className="example-wrapper">
        {React.cloneElement(React.Children.only(this.props.children), {
          events: this.events,
          browserUnsupportedHtml: this.browserUnsupportedHtml,
        })}
        <div className="container-fluid">
          <div className="row">
            <PropsInRealTime uid={this.props.uid} />
            <EventsInRealTime uid={this.props.uid} eventCalls={this.state.eventCalls} />
          </div>
        </div>
      </div>
    );
  }
}

export default StatusWrapper;
