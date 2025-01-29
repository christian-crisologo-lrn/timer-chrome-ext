import React from 'react';
import cls from 'classnames';
import useDarkMode from '../hooks/useDarkMode';
import { MODE } from '../constants';

interface ControlsProps {
    minutes: number;
    warningTime: number;
    onMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onWarningTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    timerState: string;
    onStartToggle: () => void;
    onReset: () => void;
    onToggleMode: () => void;
    disabled?: boolean;
    mode: string;
}

const TimerControls: React.FC<ControlsProps> = (props) => {
    const {
        minutes,
        warningTime,
        timerState,
        onStartToggle,
        onReset,
        disabled,
        onMinutesChange,
        onWarningTimeChange,
        onToggleMode,
        mode
    } = props;
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    const startCls = cls('start-button', timerState.toLowerCase());

    return (
    <div className="timer-controls">
        {
            mode === MODE.EDIT && (<>
                <div className='buttons-container'>
                    <button 
                        onClick={onStartToggle} 
                        className={startCls} 
                        disabled={disabled} 
                        title={timerState === 'running' ? 'Pause' : 'Start'}
                    ></button>
                    <button 
                        onClick={onReset} 
                        className='reset' 
                        disabled={disabled} 
                        title="Reset"
                    ></button>
                </div>
                <div className='input-container'>
                    <div className="row">
                        <span className='input-label'>Minutes</span>
                        <input
                            type="number"
                            value={minutes}
                            onChange={onMinutesChange}
                            placeholder="Minutes"
                            disabled={disabled}
                        />
                    </div>
                    <div className="row">
                        <span className='input-label'>Warning time (s)</span>
                        <input
                            type="number"
                            value={warningTime}
                            onChange={onWarningTimeChange}
                            placeholder="Minutes"
                            disabled={disabled}
                        />
                    </div>
                    <div className="row">
                        <span className='input-label'>Switch theme</span>
                        <button className="theme-btn" onClick={toggleDarkMode}>
                            {isDarkMode ? 'Light mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>       
            </>)
        }
        
        <div className="row fixed-bottom buttons-container">
            <button className="mode-btn" onClick={onToggleMode}>
                {mode === 'edit' ? 'Display' : '< Edit'}
            </button>
            {mode === MODE.DISPLAY && (<button 
                                        onClick={onReset} 
                                        className='reset' 
                                        disabled={disabled} 
                                        title="Reset"
                                    ></button>)
            }

        </div>

    </div>
    );
};

export default TimerControls;