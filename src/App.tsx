import React from 'react';
import './App.scss';
import { Clock } from './component/Clock';

type State = {
  clockName: string;
  today: Date;
  hasClock: boolean;
};

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    clockName: 'Clock-0',
    today: new Date(),
    hasClock: true,
  };

  timerId: number | null = null;

  time: number | null = null;

  lastLoggedTime: number = 0;

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);

    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    this.time = window.setInterval(() => {
      const now = new Date();

      this.setState({ today: now });

      const currentTime = now.getTime();

      if (currentTime - this.lastLoggedTime >= 1000) {
        this.lastLoggedTime = currentTime;

        if (this.state.hasClock) {
          // eslint-disable-next-line no-console
          console.log(now.toUTCString().slice(-12, -4));
        }
      }
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<State>) {
    if (prevState.clockName !== this.state.clockName && this.state.hasClock) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }

    if (this.state.hasClock && prevState.hasClock !== this.state.hasClock) {
      this.setState({ today: new Date() });
    }
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }

    if (this.time !== null) {
      window.clearInterval(this.time);
    }

    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true });
  };

  render() {
    const { clockName, today, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock name={clockName} today={today} />}
      </div>
    );
  }
}
