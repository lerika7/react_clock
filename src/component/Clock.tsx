import { Component } from 'react';

interface ClockProps {
  name: string;
  today: Date;
}

interface ClockState {
  time: string;
}

export class Clock extends Component<ClockProps, ClockState> {
  state = {
    time: new Date().toUTCString().slice(-12, -4),
  };

  intervalId: number | undefined;

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      const updatedTime = new Date().toUTCString().slice(-12, -4);

      this.setState({ time: updatedTime });

      // eslint-disable-next-line no-console
      console.log(updatedTime);
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (prevProps.name !== this.props.name) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  render() {
    const { name } = this.props;
    const { time } = this.state;

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>

        {' time is '}

        <span className="Clock__time">{time}</span>
      </div>
    );
  }
}
