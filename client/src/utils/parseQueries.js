export function parseQueries(queryString){

  let queryArgs = {};

  if (queryString){
    let i = 1;
    let query = [undefined, undefined];
    let unparsed = queryString.slice(0);

    while( i < unparsed.length ){

      if (unparsed[i] === '='){
        query[0] = unparsed.slice(1,i);
        unparsed = unparsed.slice(i);
        i = 0;

      } else if (unparsed[i] === '&'){
        query[1] = unparsed.slice(1,i);
        queryArgs[query[0]] = query[1];
        unparsed = unparsed.slice(i);
        query = [undefined, undefined];
        i = 0;
      }
      i++;
    }
    if (query[0] && !query[1]){
      query[1] = unparsed.slice(1);
      queryArgs[query[0]] = query[1];
    } else if (!query[0]){
      queryArgs[unparsed.slice(1)] = 'true';
    }
  }
  return queryArgs;
}