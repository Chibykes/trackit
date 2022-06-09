const formatDate = (date, part=true) => {
    let day = new Date(date).getDate();
    let month = ''; 
    let year = new Date(date).getFullYear();
    let hour = new Date(date).getHours(); 
    let mins = new Date(date).getMinutes();
    let tod = 'AM';

    switch (new Date(date).getMonth()){
        case 0:
            month = 'Jan';
            break;
        case 1:
            month = 'Feb';
            break;
        case 2:
            month = 'Mar';
            break;
        case 3:
            month = 'Apr';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'Jun';
            break;
        case 6:
            month = 'Jul';
            break;
        case 7:
            month = 'Aug';
            break;
        case 8:
            month = 'Sept';
            break;
        case 9:
            month = 'Oct';
            break;
        case 10:
            month = 'Nov';
            break;
        case 11:
            month = 'Dec';
            break;
        default:
            return null;
    }

    if(hour > 12){
        hour -= 12;
        tod = 'PM';
    }

    if(!part){
        return `${day} ${month}${month && '.,'} ${year} ${hour}:${mins} ${tod}`
    }

    const default_format = `${day} ${month}${month && '.,'} ${hour}:${mins} ${tod}`;
    
    if(year !== new Date().getFullYear()){
        if(new Date(date).getMonth() !== new Date().getMonth()){
            if(day !== new Date().getDate()){
                return default_format;
            }
            return default_format
        }
        return `${day} ${month}${month && '.,'} ${year} ${hour}:${mins} ${tod}`
    } 
    
    if(new Date(date).getMonth() !== new Date().getMonth()){
        if(day !== new Date().getDate()){
            return default_format
        }
        return default_format
    }

    if(day !== new Date().getDate()){
        return default_format
    }
    
    return `${hour}:${mins} ${tod}`
    
}

export default formatDate;