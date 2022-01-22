export const shortName = (name) => {
    if(name.length > 15){
        return name.substring(0, 14) + "...";
    } else {
        return name;
    }
};