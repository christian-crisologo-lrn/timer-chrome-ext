export const numToString = (time: number) =>{
    return String(Math.floor(time)).padStart(2, '0');
}

export const convertMinutesToTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = Math.floor((totalMinutes % 1) * 60); // Convert fractional part to seconds

    return {
        hh: numToString(hours),
        mm: numToString(minutes),
        ss: numToString(seconds)
    };
};