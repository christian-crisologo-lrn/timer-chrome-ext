import React, { useState } from 'react';
import cls from 'classnames';
import { MODE } from '../constants';

type TimeProps = { mm: string; ss: string; hh: string };

interface TimerDisplayProps {
    time: TimeProps;
    disabled?: boolean;
    isActive?: boolean;
    mode: string;
    onStartToggle?: () => void;
}

interface TimeDisplayModeProps extends Omit<TimerDisplayProps, 'mode'> {
    showHour: boolean;
    colonClassName: string;
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

const DisplayMode: React.FC<TimeDisplayModeProps> = (props) => {
    const { showHour, colonClassName, time, isActive, onStartToggle} = props;
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const handleMouseEnter = () => setOverlayVisible(true);
    const handleMouseLeave = () => setOverlayVisible(false);

    return (
        <div className='display'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                setOverlayVisible(false);
                onStartToggle!();
            }}>
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
            {isOverlayVisible && (
                <div className="overlay">
                    <span className="overlay-message">
                        {
                            isActive ? 'Press to pause' : 'Press to start'
                        }
                    </span>
                </div>
            )}
        </div>
    )
}

const TimerDisplay: React.FC<TimerDisplayProps> = (props) => {
    const { isActive, time , disabled, mode, onStartToggle } = props;
    const showHour = parseInt(time.hh) > 0;
    const containerClassName = cls('timer-display', { disabled });
    const colonClassName = cls('colon', { blink: isActive });



    return (
        <div className={containerClassName} >
            {
                mode === MODE.DISPLAY ?
                    <DisplayMode
                        onStartToggle={onStartToggle}
                        showHour={showHour}
                        colonClassName={colonClassName}
                        time={time} 
                        isActive={isActive}
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