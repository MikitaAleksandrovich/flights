export const getConvertedDuration = (duration, isDate = false) => {
    const hours = Math.floor(duration / 60);  
    const minutes = duration % 60;

    if(isDate) {
        return `${hours}:${minutes}`; 
    }
    return `${hours}ч ${minutes}м`;         
};