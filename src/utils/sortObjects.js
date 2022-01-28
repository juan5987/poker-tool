function sortObjects( a, b ) {
    if ( a.position < b.position ){
      return -1;
    }
    if ( a.position > b.position ){
      return 1;
    }
    return 0;
  }
  
export default sortObjects;