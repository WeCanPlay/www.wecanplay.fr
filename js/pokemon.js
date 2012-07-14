WCP.setCanvas("pokemonimation", 160, 144);
                
// SoundManager
soundManager = new WCP.SoundManager();
soundManager.channel('pokemon_animation/sound/opening.mp3', {id: 'opening', preload: true, autoplay: false, loop: true, volume: 100});
soundManager.channel('pokemon_animation/sound/stars.mp3', {id: 'stars', preload: true, autoplay: false, loop: false, volume: 75});
soundManager.channel('pokemon_animation/sound/nidorino-attack.mp3', {id: 'nidorino-attack', preload: true, autoplay: false, loop: false, volume: 75});
soundManager.channel('pokemon_animation/sound/nidorino-bounce1.mp3', {id: 'nidorino-bounce1', preload: true, autoplay: false, loop: false, volume: 75});
soundManager.channel('pokemon_animation/sound/nidorino-bounce2.mp3', {id: 'nidorino-bounce2', preload: true, autoplay: false, loop: false, volume: 75});
soundManager.channel('pokemon_animation/sound/ectoplasma-up.mp3', {id: 'ectoplasma-up', preload: true, autoplay: false, loop: false, volume: 75});
soundManager.channel('pokemon_animation/sound/ectoplasma-hit.mp3', {id: 'ectoplasma-hit', preload: true, autoplay: false, loop: false, volume: 75});
soundManager.channel('pokemon_animation/sound/pokemon-fall.mp3', {id: 'pokemon-fall', preload: true, autoplay: false, loop: false, volume: 75});
soundManager.channel('pokemon_animation/sound/slide.mp3', {id: 'slide', preload: true, autoplay: false, loop: false, volume: 75});

// Create instance of imgManager
WCP.Assets.add("copyright", "pokemon_animation/copyright.png");
WCP.Assets.add("black-band", "pokemon_animation/black-band.png");
WCP.Assets.add("game-freak-logo", "pokemon_animation/game-freak-logo.png");
WCP.Assets.add("game-freak-letters", "pokemon_animation/game-freak-letters.png");
WCP.Assets.add("big-star", "pokemon_animation/big-star.png");
WCP.Assets.add("star", "pokemon_animation/star.png");
WCP.Assets.add("dark-star", "pokemon_animation/dark-star.png");
WCP.Assets.add("nidorina-sprite", "pokemon_animation/nidorina-sprite.png");
WCP.Assets.add("ectoplasma-sprite", "pokemon_animation/ectoplasma-sprite.png");
WCP.Assets.add("pokemon-title", "pokemon_animation/pokemon-title.png");
WCP.Assets.add("background-title", "pokemon_animation/title-background.png");
WCP.Assets.add("version", "pokemon_animation/version.png");
WCP.Assets.add("pokeball", "pokemon_animation/pokeball.png");
WCP.Assets.add("pokemons", "pokemon_animation/pokemons.png");
WCP.Assets.add("white-screen", "pokemon_animation/white-screen.png");
WCP.Assets.loadAll();
WCP.Assets.onLoadComplete(init());

function init() {
    var animationSceneDefinition = {
        init: function () {                        
            var timeLine = new WCP.TimeLine();

            var copyrightSprite = new WCP.Sprite(WCP.Assets.get("copyright"), -1000, -1000);
            var blackBandSprite1 = new WCP.Sprite(WCP.Assets.get("black-band"), -1000, -1000);
            blackBandSprite1.setZIndex(100);
            var blackBandSprite2 = new WCP.Sprite(WCP.Assets.get("black-band"), -1000, -1000);
            blackBandSprite2.setZIndex(100);
            var gameFreakLogoSprite = new WCP.Sprite(WCP.Assets.get("game-freak-logo"), -1000, -1000);
            gameFreakLogoSprite.setZIndex(99);
            var gameFreakLettersSprite = new WCP.Sprite(WCP.Assets.get("game-freak-letters"), -1000, -1000);
            gameFreakLettersSprite.setZIndex(99);
            var bigStarSprite = new WCP.Sprite(WCP.Assets.get("big-star"), -1000, -1000);
            bigStarSprite.setZIndex(101);
            var nidorinaSprite = new WCP.Sprite(WCP.Assets.get("nidorina-sprite"), -1000, -1000);
            nidorinaSprite.setZIndex(98);
            var ectoplasmaSprite = new WCP.Sprite(WCP.Assets.get("ectoplasma-sprite"), -1000, -1000);
            ectoplasmaSprite.setZIndex(99);
            var titleSprite = new WCP.Sprite(WCP.Assets.get("pokemon-title"), -1000, -1000);
            var backgroundTitleSprite = new WCP.Sprite(WCP.Assets.get("background-title"), -1000, -1000);
            backgroundTitleSprite.setZIndex(101);
            var versionSprite = new WCP.Sprite(WCP.Assets.get("version"), -1000, -1000);
            var pokeballSprite = new WCP.Sprite(WCP.Assets.get("pokeball"), -1000, -1000);
            pokeballSprite.setZIndex(102);
            var pokemonsSprite = new WCP.Sprite(WCP.Assets.get("pokemons"), -10000, -10000);
            pokemonsSprite.setZIndex(99);
            var whiteScreenSprite = new WCP.Sprite(WCP.Assets.get("white-screen"), -10000, -10000);
            whiteScreenSprite.setZIndex(105);
            
            var starSprites = new Array();
            for (var i = 0; i < 16; i++) {
                starSprites[i] = new WCP.Sprite(WCP.Assets.get("star"), -200, -200);
                starSprites[i].setZIndex(99);
            }
            var darkStarSprites = new Array();
            for (var i = 0; i < 16; i++) {
                darkStarSprites[i] = new WCP.Sprite(WCP.Assets.get("dark-star"), -200, -200);
                darkStarSprites[i].setZIndex(99);
            }

            // Black band
            var blackBandTop = new WCP.Animation(blackBandSprite1);
            blackBandTop.move(0, 0).waitTime(16000).remove();
            var blackBandBottom = blackBandTop.clone(blackBandSprite2);
            blackBandBottom.offset(0, 112);
            var blackBandClip = new WCP.Clip();
            blackBandClip.add(blackBandTop, blackBandBottom);

            // Copyright
            var copyright = new WCP.Animation(copyrightSprite);
            copyright.move(15, 55).waitTime(3000).startAnimation(blackBandClip).remove();

            // Game freak logo and letters
            var gameFreakLogo = new WCP.Animation(gameFreakLogoSprite);
            gameFreakLogo.animate({time: 1, x: 74, y: 56}).waitTime(867).animate({alpha: 0.25}).waitTime(200).animate({alpha: 0.5}).waitTime(3000).remove();
            var gameFreakLetters = new WCP.Animation(gameFreakLettersSprite);
            gameFreakLetters.animate({time: 1, x: 40, y: 80}).waitTime(667).animate({alpha: 0.25}).waitTime(200).animate({alpha: 1}).waitTime(3120).remove();
            var bigStar = new WCP.Animation(bigStarSprite, soundManager);
            bigStar.move(160, -24).sound("stars").animate({time: 667, x: -16, y: 136}).remove();
            var gameFreakClip = new WCP.Clip();
            gameFreakClip.add(gameFreakLogo, gameFreakLetters, bigStar);
            
            // Stars falling
            var starsData = new Array();
            // 1st line
            starsData[0] = {x: 43, y: 89, time: 6466};
            starsData[1] = {x: 56, y: 89, time: 6466};
            starsData[2] = {x: 80, y: 89, time: 6466};
            starsData[3] = {x: 112, y: 89, time: 6466};
            // 2nd line
            starsData[4] = {x: 48, y: 89, time: 6866};
            starsData[5] = {x: 64, y: 89, time: 6866};
            starsData[6] = {x: 88, y: 89, time: 6866};
            starsData[7] = {x: 104, y: 89, time: 6866};
            // 3rd line
            starsData[8] = {x: 44, y: 89, time: 7266};
            starsData[9] = {x: 68, y: 89, time: 7266};
            starsData[10] = {x: 76, y: 89, time: 7266};
            starsData[11] = {x: 92, y: 89, time: 7266};
            // 4th line
            starsData[12] = {x: 52, y: 89, time: 7666};
            starsData[13] = {x: 84, y: 89, time: 7666};
            starsData[14] = {x: 100, y: 89, time: 7666};
            starsData[15] = {x: 108, y: 89, time: 7666};
            
            // {43, 122} {40, 112}
            var star = new WCP.Animation(starSprites[0]);
            star.move(0, 0).animate({time: 1134, x: 0, y: 23}).remove();
            var darkStar = new WCP.Animation(darkStarSprites[0]);
            darkStar.move(-3, 3).animate({time: 1134, x: -3, y: 26}).remove();
            var darkStarBlink = new WCP.Animation(darkStarSprites[0]);
            darkStarBlink.animate({alpha: 0}).waitTime(100).animate({alpha: 1}).waitTime(200).repeat();
            
            var starsClip = new WCP.Clip();
            starsClip.add(star, darkStar, darkStarBlink);
            
            var starsClipList = new Array();
            for (i in starsData) {
                var newClip = starsClip.clone(starSprites[i], darkStarSprites[i], darkStarSprites[i]);
                newClip.offset(starsData[i].x, starsData[i].y);
                starsClipList[i] = newClip;
                timeLine.add(starsData[i].time, starsClipList[i]);
            }

            // White Screen
            var whiteScreen = new WCP.Animation(whiteScreenSprite);
            whiteScreenSprite.alpha = 0;
            whiteScreen.move(0, 0).animate({alpha: 1, time: 400}).waitTime(600).remove();
            
            // Pokemon Fight
            var fight = new WCP.Clip();
            var nidorina = new WCP.Animation(nidorinaSprite, soundManager);
            nidorinaSprite.setSlice(0, 0, 44, 44);
            nidorina.sound("opening")
            .move(0, 76)
            .animate({x: 76, time: 1266})
            .sound("nidorino-bounce1")
            .animate({x: 84, shift: WCP.Shift.semiCircle, time: 400})
            .sound("nidorino-bounce2")
            .animate({x: 76, shift: WCP.Shift.semiCircleReverse, time: 400})
            .waitTime(66)
            .sound("nidorino-bounce1")
            .animate({x: 84, shift: WCP.Shift.semiCircle, time: 400})
            .sound("nidorino-bounce2")
            .animate({x: 76, shift: WCP.Shift.semiCircleReverse, time: 400})
            .waitTime(1400)
            .setSlice(44, 0, 44, 44)
            .animate({x: 96, shift: WCP.Shift.semiCircle, time: 300})
            .waitTime(1734)
            .setSlice(0, 0, 44, 44)
            .sound("nidorino-bounce2")
            .animate({x: 84, shift: WCP.Shift.semiCircleReverse, time: 333})
            .sound("nidorino-bounce1")
            .animate({x: 96, shift: WCP.Shift.semiCircle, time: 333})
            .waitTime(400)
            .setSlice(44, 0, 44, 44)
            .waitTime(132)
            .animate({y: 80, time: 132})
            .waitTime(600)
            .setSlice(88, 0, 44, 44)
            .sound("nidorino-attack")
            .animate({x: 44, y: 55, time: 266})
            .startAnimation(whiteScreen)
            .waitTime(1000)
            .remove();
            var ectoplasma = new WCP.Animation(ectoplasmaSprite, soundManager);
            ectoplasmaSprite.setSlice(0, 0, 56, 54);
            ectoplasma.move(100, 58)
            .animate({x: 24, time: 1266})
            .waitTime(2400)
            .setSlice(56, 0, 56, 54)
            .sound("ectoplasma-up")
            .animate({x: 16, time: 66})
            .waitTime(467)
            .setSlice(112, 0, 56, 54)
            .sound("ectoplasma-hit")
            .animate({x: 32, time: 333})
            .waitTime(867)
            .animate({x: 24, time: 132})
            .setSlice(0, 0, 56, 54)
            .waitTime(4500)
            .remove();
            fight.add(nidorina, ectoplasma);
            
            // Title screen
            var titleScreen = new WCP.Clip();
            var title = new WCP.Animation(titleSprite, soundManager);
            title.move(16, -49)
            .animate({y: 7, time: 266})
            .animate({y: 1, time: 66})
            .animate({y: 10, time: 200})
            .sound("pokemon-fall");
            var backgroundTitle = new WCP.Animation(backgroundTitleSprite);
            backgroundTitle.move(0, 0);
            var version = new WCP.Animation(versionSprite, soundManager);
            version.waitTime(1133)
            .move(160, 67)
            .sound("slide")
            .animate({x: 56, time: 567});
            var pokeball = new WCP.Animation(pokeballSprite);
            pokeball.move(83, 100)
            .waitTime(5266)
            .animate({y: 93, time: 134, ease: WCP.Ease.parabolicReverse})
            .animate({y: 100, time: 66})
            .repeat();
            var chalamender = new WCP.Animation(pokemonsSprite);

            var execute = function () {
                var n = Math.floor(Math.random() * 151);
                pokemonsSprite.setSlice(n % 12 * 57, Math.floor(n / 13) * 57, 57, 57);
            };
            var pokemons = new WCP.Animation(pokemonsSprite);
            pokemonsSprite.setSlice(171, 0, 57, 57);
            chalamender.move(39, 79)
            .waitTime(5000)
            .animate({x: -57, time: 333, ease: WCP.Ease.parabolic})
            .startAnimation(pokemons);
            pokemons.execute(execute)
            .move(201, 79)
            .animate({x: 39, time: 333, ease: WCP.Ease.parabolicReverse})
            .waitTime(5000)
            .animate({x: -57, time: 333, ease: WCP.Ease.parabolic})
            .repeat();
            titleScreen.add(title, pokeball, backgroundTitle, version, chalamender);

            timeLine.add(1133, copyright);
            timeLine.add(5266, gameFreakClip);
            timeLine.add(9666, fight);
            timeLine.add(20400, titleScreen);
            timeLine.start();
        }
    };
    var animationScene = new WCP.View(animationSceneDefinition);
    
    animationScene.start();
}