/* 
Spel logic bla annat, 
van er olika fienderna och hur mucki ström har do
*/

export default class GameState {
    cameras: object;
    enemies: object;


    //används jär i GameState classin fö skit
    deltatime: number;
    
    constructor(CamImgPath: Array<string>, EnemyImgPath: Array<string>) {
        this.deltatime = 0;

        this.cameras = {
            cam1: {
                src: CamImgPath[0]
            },
        
            cam2: {
                src: CamImgPath[1]
            },
        
            cam3: {
                src: CamImgPath[2]
            },
        
            cam4: {
                src: CamImgPath[3]
            },
        
            cam5: {
                src: CamImgPath[4]
            },
        }

        /*
        Om man sko typ änder dem seinari ti na annat som mamm din elo na annat läskigt
         */


        // sko prolly konna laga en enemy class för dehe
        this.enemies = {
            enemy1: {
                name: "enemy1",

                timer: {
                    timer: 0,
                    timerReset: 5,
                },

                tick: () => {

                }
            },

            enemy2: {
                name: "enemy2"
            },

            enemy3: {
                name: "enemy3"
            },

            enemy4: {
                name: "enemy4"
            },
        }
    }

    // blir påkalla varje frame inuti update function på i scenen
    tick(deltatime: number) {
        this.deltatime = deltatime;
    }
};