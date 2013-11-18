var muro = {};

module.exports =  function(db){
    muro.db = db;
    muro.coments = muro.db.collection('coments');
    return muro;
};

muro.new =  function(newData, callBack){
    muro.coments.insert(newData, function(err, record){
        callBack(null)
    });
};

muro.list =  function(callBack) {
    muro.coments.find().toArray(function(e, res){
        if(e) {
            callBack(e)
        } else {
            callBack(null, res);
        }
    })
};
