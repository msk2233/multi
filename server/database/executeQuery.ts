import con from './connection';

async function execute(query:string, values:(string | number)[]|string|number) {
  con.connect(function (err) {
    if (err) throw err;
  });

  let res = new Promise((resolve, reject) => {
    con.query(query, values, (err, result) => {
      if (err) {
        console.log("error is :" + err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  let result = res
    .then((result) => {
      return result;
    })
    .catch((err:Error) => {
      return err;
    });
  return result;
}

export default execute;