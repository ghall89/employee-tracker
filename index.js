const userInput = require('./src/userInput');

const start = () => {
	console.log(`
		-- Welcome to --	
																																		
    //   / /                                                            
   //____     _   __      ___     //  ___               ___      ___    
  / ____    // ) )  ) ) //   ) ) // //   ) ) //   / / //___) ) //___) ) 
 //        // / /  / / //___/ / // //   / / ((___/ / //       //        
//____/ / // / /  / / //       // ((___/ /      / / ((____   ((____     
    /|    //| |                                                         
   //|   // | |     ___       __      ___      ___      ___      __     
  // |  //  | |   //   ) ) //   ) ) //   ) ) //   ) ) //___) ) //  ) )  
 //  | //   | |  //   / / //   / / //   / / ((___/ / //       //        
//   |//    | | ((___( ( //   / / ((___( (   //__   ((____   //                
	`)
	userInput();
}

start();

