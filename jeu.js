var missile = new Sprite("images/missile.png", 0, 0);
missile.display = "none";
var heros = new Sprite("images/Heros.png", 275, 475, 0);
var gameover = false;
var sectionJeu = document.getElementById('sectionjeu');
var score = 0;
var level = 1;

var bpew = document.getElementById("pew"); 
var bboom = document.getElementById("boom"); 
function pew() { 
    bpew.play(); 
}

function boom(){
    bboom.play();
}


enemy1 = new Sprite("images/tacos.png", 75 , 25, 1);
enemy2 = new Sprite("images/tacos.png", 125, 25, 2);
enemy3 = new Sprite("images/tacos.png", 175, 25, 3);
enemy4 = new Sprite("images/tacos.png", 225, 25, 4);
enemy5 = new Sprite("images/tacos.png", 275, 25, 5);

enemy6 = new Sprite("images/nuggets.png", 75, 100, 6);
enemy7 = new Sprite("images/nuggets.png", 125, 100, 7);
enemy8 = new Sprite("images/nuggets.png", 175, 100, 8);
enemy9 = new Sprite("images/nuggets.png", 225, 100, 9);
enemy10 = new Sprite("images/nuggets.png", 275, 100, 10);

enemy11 = new Sprite("images/burger.png", 75, 175, 11);
enemy12 = new Sprite("images/burger.png", 125, 175, 12);
enemy13 = new Sprite("images/burger.png", 175, 175, 13);
enemy14 = new Sprite("images/burger.png", 225, 175, 14);
enemy15 = new Sprite("images/burger.png", 275, 175, 15);

enemy16 = new Sprite("images/frites.png", 75, 250, 16);
enemy17 = new Sprite("images/frites.png", 125, 250, 17);
enemy18 = new Sprite("images/frites.png", 175, 250, 18);
enemy19 = new Sprite("images/frites.png", 225, 250, 19);
enemy20 = new Sprite("images/frites.png", 275, 250, 20);

document.onkeydown = function(e){
    if(e.keyCode == 37){
        heros.left -= 12.5;
    }
    if(e.keyCode == 39){
        heros.left += 12.5;
    }
    if(e.keyCode == 82){
        reset();
    }
    if(e.keyCode == 32){
        if(missile.display == "none"){
            missile.display = "block";
            missile.left = heros.left + (heros._node.width - missile._node.width) / 2;
            missile.top = heros.top;
            missile.startAnimation(moveMissile, 10);
            pew();
        }
    }
    if(heros.left < 75) heros.left = 75;
    if(heros.left > 500) heros.left = 500;
    }
    //Fonction pour tirer

function moveMissile(missile){
    missile.top -= 12;      // vitesse
    if (missile.top < 0) {  // limite du missile
    missile.stopAnimation();
    missile.display = "none";
    }

    for(var i=1; i<=20; i++){
        var enemy = window["enemy"+i];
        if(enemy.display == "none") continue;
        if(missile.checkCollision(enemy)){
            boom();
            score = score + 50;
            document.getElementById('score').textContent = score;
            missile.stopAnimation();
            missile.display = "none";
            enemy.stopAnimation();
            enemy.display = "none";

            var isVisible = verifAffichage(window);
            if(isVisible == 0){
                document.getElementById('sectionjeu').style.background = "url('images/win.png')";
                sectionJeu.removeChild(document.getElementById('enemy_0'));
                sectionJeu.removeChild(missile._node);
            }
        }
}
    
    if(score == level * 1000){
        level = level + score / 1000;
    }
}

function verifAffichage(){
    var enemyVisible = 0;
    for(var i=1; i<=20; i++){
        if(document.getElementById('enemy_' + i).style.display == "none"){

        } else {
            enemyVisible++;
        }
    }

    return enemyVisible;
}

function moveEnemies(enemy){
    if(enemy instanceof Sprite){
        if (enemy.direction == "right"){
            if(enemy.left > 500){
                enemy.top +=36;
                enemy.direction = "left";
            } else {
                enemy.left += 10;   
            } 
        } else if(enemy.left < 75){
            enemy.top += 36;
            enemy.direction = "right";
        } else {
            enemy.left -= 10;
        }
            
        if(enemy.top > 430){
            gameover = true;
            enemy.display = "none";
            document.getElementById('sectionjeu').style.background = "url('images/gameover.png')";
            missile.display = "none";
        }
        
        if(gameover){
            for (var i=1; i<=20; i++){
                window["enemy"+i].stopAnimation(moveEnemies, 20);
                if(window["enemy"+i]._node){
                    sectionJeu.removeChild(window["enemy"+i]._node);
                }              
                
            }
            if(heros._node){
                sectionJeu.removeChild(heros._node);
            }
            
            sectionJeu.removeChild(missile._node);
        }
    }
    
}

    

for (var i=1; i<=20; i++){
    window["enemy"+i].startAnimation(moveEnemies, 20);
}
