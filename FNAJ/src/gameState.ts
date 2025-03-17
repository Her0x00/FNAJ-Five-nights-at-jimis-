

/* Enemy
 *
 * Varje motståndar följer en specifik path åv kameror, dem kan ga framåt backåt eller skip
 * nain heilt
 * 
 * varje X sekunder har en motståndar en chans att flytt framåt beroende på en random nummer mellan 0-20
 * Motståndarns "difficulty" är också mellan 0-20, om numri genererad mellan intervalet är lika med 
 * eller mindre än difficulty inställningen flyttar dem. Varje gång dem flyttar sig finns he en lillan
 * chans att dem flyttar se bakåt ifrån spelarn
*/

const ENEMY_MAX_DIFFICULTY: number = 20;

export class Enemy {
    AttackPath: object;
    AttackState: object;

    Difficulty: number;

    AttackInterval: number;
    AttackTimer: number;

    CanAttack: boolean;
    
    constructor(AttackInterval: number) {
        this.AttackPath = [];
        this.AttackState = {
            PathIndex: 0,
        };

        this.AttackInterval = AttackInterval;
        this.AttackTimer = 0;
        this.Difficulty = 0;
        this.CanAttack = true;
    }

    SetDifficulty(Difficulty: number) {
        this.Difficulty = Difficulty;
    }

    /* Enemy spel logic som körs furi movement check som 
     * t.ex om du kollar på kameran dem är på så buri dem edge elo na 
    */
    Update() {}

    tick(deltatime: number) {
        this.AttackTimer += (deltatime / 1000);

        if (this.AttackTimer >= this.AttackInterval) { // Försök flytt
            if (Math.floor(Math.random() * ENEMY_MAX_DIFFICULTY) && this.CanAttack) {
                this.AttackSuccess();
            } else {
                this.AttackFailure();
            }

        }
    }

    /* Enemy flyttar se */
    AttackSuccess() {}
    
    /* Enemy failar sin movement check, så dem idk ökar sin difficulty inställning eller na idk */
    AttackFailure() {}
}


/* her ti änder på logic vart ett man hittar på na typ */
class Enemy1 extends Enemy {
    constructor() {
        super(5);
        
        this.SetDifficulty(4);


        /* test rut*/
        this.AttackPath = [
            {
                position: "cam1",
                recallChance: 0,
            },
            {
                position: "cam2",
                recallChance: 0.05,
            },
            {
                position: "cam3",
                recallChance: 0.10,
            },
            {
                position: "cam4",
                recallChance: 0.50
            }
        ]
    }

    Update(): void {
        
    }

    AttackSuccess(): void {

    }

    AttackFailure(): void {
        
    }
}



/* 
Spel logic bla annat, 
van er olika fienderna och hur mucki ström har do
*/
export default class GameState {
    cameras: object;
    enemies: object;

    /* Är dörran stängd eller öppin, lamporna av eller på
    * Hur mucki ström finns ikvar, hu mucki ström används just nu,
    * Om spelaren kollar på en kamera vilken kamera kollar dem på o.sv 
    * blir passera till entities 
    */
    resources: object;

    //används jär i GameState classin fö skit
    deltatime: number;
    
    constructor() {
        this.deltatime = 0;

        this.resources = {
            power: {
                battery: 100,
                usage: 0,
            },

            doors: {
                left: {
                    open: true,
                    lightsOn: false,
                },

                right: {
                    open: true,
                    lightsOn: false
                }
            },

            cameras: {
                enabled: false,
                cameraIndex: 0,
            }
        }

        this.cameras = {

        }

        
        /*
        Om man sko typ änder dem seinari ti na annat som mamm din elo na annat läskigt
        */


        this.enemies = [

        ]
    }

    // blir påkalla varje frame inuti update function på i scenen
    tick(deltatime: number) {
        this.deltatime = deltatime;
    }
};