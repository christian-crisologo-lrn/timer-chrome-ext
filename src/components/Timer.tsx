import { useState, useEffect, useRef, useMemo } from 'react';
import cls from 'classnames';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import { 
    DEFAULT_RESET_DELAY,
    DEFAULT_MINUTE,
    DEFAULT_WARNING_TIME,
    STATE,
    MODE,
    DEFAULT_INTERVAL
} from '../constants';
import { convertMinutesToTime, numToString } from '../helper';

type Settings = {
    minutes: number;
    warningTime: number;
};

const defaultSettings: Settings = {
    minutes: DEFAULT_MINUTE,
    warningTime: DEFAULT_WARNING_TIME,
};

const Timer = () => {
    const [minutes, setMinutes] = useState(defaultSettings.minutes);
    const [warningTime, setWarningTime] = useState(defaultSettings.warningTime);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [mode, setMode] = useState('edit');
    const [timerState, setTimerState] = useState(STATE.START);
    const timeInterval = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
    if (isRunning) {
        timeInterval.current = setInterval(() => {
        setRemainingTime(prev => {
            const newTime = prev - 1;

            if (newTime <= 0) {
                clearInterval(timeInterval.current);
                timeExpired();
                return 0;
            }

            return newTime;
        });
        }, DEFAULT_INTERVAL);
    }

    return () => clearInterval(timeInterval.current);
    }, [isRunning]);

    const totalTime = minutes * 60; // in seconds
    const isWarning = isRunning && remainingTime <= warningTime;

    const toggleStartStopTimer = () => {
        if (timerState === STATE.PLAY || timerState === STATE.RESUME) {
            setIsRunning(true);
            setTimerState(STATE.PAUSE);
        }

        if (timerState === STATE.PAUSE) {
            setIsRunning(false);
            setTimerState(STATE.PLAY);
        }

        if (timerState === STATE.START) {
            setRemainingTime(totalTime);
            setIsRunning(true);
            setTimerState(STATE.PAUSE);
        }
    };

    const timeExpired =  () => {
        setIsExpired(true);
        // delay to reset timer
        setTimeout(() => {
            resetTimer();
        }, DEFAULT_RESET_DELAY);
    }

    const resetTimer = () => {
        setMinutes(minutes);
        setRemainingTime(0);
        setIsExpired(false);
        setIsRunning(false);
        setTimerState(STATE.START);
    };

    const timeLabel = useMemo(()=> {
        const convertedMinToTime = convertMinutesToTime(minutes);
        const hours = Math.floor(remainingTime / 3600);
        const minutesRemaining = Math.floor((remainingTime % 3600) / 60);
        const secondsRemaining = remainingTime % 60;

        const mm = numToString(minutesRemaining);
        const ss = numToString(secondsRemaining);
        const hh = numToString(hours);

        return timerState !== STATE.START ? { hh, mm, ss } : convertedMinToTime;
    }, [remainingTime, minutes, isRunning]);

    // styles
    const timerContainerClassName = cls('timer-container', { warning: isWarning, shake: isExpired  });
    const displayDisabled = [STATE.START, STATE.PLAY].includes(timerState) || isExpired;

    return (
        <div className={timerContainerClassName}>
            <TimerDisplay
                mode={mode}
                time={timeLabel}
                isActive={isRunning && !isExpired}
                disabled={displayDisabled}
                onStartToggle={toggleStartStopTimer}
            />
            <TimerControls
                minutes={minutes}
                warningTime={warningTime}
                onMinutesChange={(e) => setMinutes(Number(e.target.value))}
                onWarningTimeChange={(e) => setWarningTime(Number(e.target.value))}
                timerState={timerState}
                onStartToggle={toggleStartStopTimer}
                onReset={resetTimer}
                onToggleMode={() => setMode(prev => prev === MODE.EDIT ? MODE.EXPERT : MODE.EDIT)}
                mode={mode}
                disabled={isExpired}
            />
        </div>
    );
};

export default Timer;
