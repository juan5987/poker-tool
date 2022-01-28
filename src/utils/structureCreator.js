function roundnum(num, round){
    return Math.round(num / round)*round;
    }

 export const structureCreator = (smallestChip, nbPlayer, startingStack) => {

    const totalChips = nbPlayer * startingStack;
    let stage = 1;
    let currentSB = smallestChip;
    let currentBB = currentSB*2;
    const structure = [{
        stage: stage,
        small_blind: currentSB,
        big_blind: currentBB,
    }];


    while(currentSB < totalChips/20){
        currentSB = roundnum(currentSB*1.5, smallestChip);
        currentBB = currentSB*2;

        structure.push({
            stage: stage+=1,
            small_blind: currentSB,
            big_blind: currentBB,
        })
    }

    return structure;  
};

//voila comment lancer la fonction
structureCreator(25, 5, 10000);
