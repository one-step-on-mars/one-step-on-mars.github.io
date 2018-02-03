function myBackgroundFunction() {	
if($SM.get('outside')){
    $SM.set('features.location.outside', true);
    $SM.set('game.population', $SM.get('outside.population'));
    $SM.set('game.buildings', $SM.get('outside.buildings'));
    $SM.set('game.workers', $SM.get('outside.workers'));
    $SM.set('game.outside.seenForest', $SM.get('outside.seenForest'));
    $SM.remove('outside');
    //document.body.style.backgroundImage = "url('imageofmarsaprox300by300.png')";

}
}