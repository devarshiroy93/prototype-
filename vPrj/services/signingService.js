function signingInService() {

    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider).then(function (result) {
            return result
        })
        .catch(function (error) {
            return error
        });
};

function singingOutService() {
    return firebase.auth().signOut()
        .then(function () {
            console.log('Signout Succesfull')
            return true
        }, function (error) {
            console.log('Signout Failed')
            return false
        });
}