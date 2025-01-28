import React from 'react';
import cls from 'classnames';
import { MODE } from '../constants';

type TimeProps = { mm: string; ss: string; hh: string };

interface TimerDisplayProps {
    time: TimeProps;
    disabled?: boolean;
    isActive: boolean;
    mode: string;
    onStartToggle?: () => void;
}

interface TimeDisplayModeProps {
    showHour: boolean;
    colonClassName: string;
    time: TimeProps;
    onStartToggle?: () => void;
}

const EditMode: React.FC<TimeDisplayModeProps> = (props) => {
    const { showHour, colonClassName, time} = props;

    return (
        <div className='edit'>
            {
                 showHour && <>
                    <span className='hh'>{time.hh}</span>
                    <span className={colonClassName}>:</span>
                </>
            }
            <span className='mm'>{time.mm}</span>
            <span className={colonClassName}>:</span>
            <span className='ss'>{time.ss}</span>
        </div>
    )
}

const ExpertMode: React.FC<TimeDisplayModeProps> = (props) => {
    const { showHour, colonClassName, time, onStartToggle} = props;

    return (
        <div className='expert' onClick={onStartToggle} >
            {
                 showHour && <div className="row">
                    <span className='hh'>{time.hh}</span>
                    <span className={colonClassName}>:</span>
                </div>
            }
            <div className='row'>
                <span className='mm'>{time.mm}</span>
                <span className={colonClassName}>:</span>
            </div>
            <div className='row'>
                <span className='ss'>{time.ss}</span>
            </div>
        </div>
    )
}

const TimerDisplay: React.FC<TimerDisplayProps> = (props) => {
    const { isActive, time , disabled, mode, onStartToggle } = props;
    const showHour = parseInt(time.hh) > 0;
    const containerClassName = cls('timer-display', { disabled });
    const colonClassName = cls('colon', { blink: isActive });

    return (
        <div className={containerClassName}>
            {
                mode === MODE.EXPERT ?
                    <ExpertMode
                        onStartToggle={onStartToggle}
                        showHour={showHour}
                        colonClassName={colonClassName}
                        time={time} 
                    /> : 
                    <EditMode
                        showHour={showHour}
                        colonClassName={colonClassName}
                        time={time} 
                    />
            }

        </div>
    );
};

export default TimerDisplay;