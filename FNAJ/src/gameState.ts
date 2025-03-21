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
    name: string = "";
    
    AttackPath: object;

    AttackState: number; // Var är dem
    
    Attacking: boolean = false; //dem väntar på att du ska ta ner cams för att 🍇 de
    AtDoor: boolean = false; // är en animatronic breivi dörren elo it

    Difficulty: number;

    AttackInterval: number;
    AttackTimer: number;

    /* om dem blir stalled så dem far it till första attack stage
       utan dem bara väntar tills du slutar stall de för att fortsätt vidari
    */
    stalled: boolean = false;
    CanAttack: boolean;
    
    constructor(AttackInterval: number) {
        this.AttackPath = [];
        this.AttackState = 0;

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
    Update(resources: object) {}

    tick(deltatime: number) {
        this.Update();
        //console.log(`tick(${deltatime})`);
        //console.log("attacktimer: " + this.AttackTimer);
        this.AttackTimer += (deltatime / 1000);

        if (this.AttackTimer >= this.AttackInterval) { // Försök flytt
            console.log()
            if (Math.floor(Math.random() * ENEMY_MAX_DIFFICULTY) >= this.Difficulty && this.CanAttack) {
                console.log("MoveSucess()");
                this.MoveSuccess(); // varje animatronic måst nan manuelt kod hur dem flyttar se
            } else {
                console.log("MoveFailure()");
                this.MoveFailure();
            }

            console.log("attackState after movement:", this.AttackState);
            this.AttackTimer = 0;
        }
    }

    /* Enemy flyttar se */
    MoveSuccess() {}
    
    /* Enemy failar sin movement check, så dem idk ökar sin difficulty inställning eller na idk */
    MoveFailure() {}
}


/* her ti änder på logic vart ett man hittar på na typ */
class Bonnie extends Enemy {
    constructor() {
        super(5);
        
        this.name = "Bonnie";

        this.SetDifficulty(4);


        /*
        Borda vara samma AI som används i orginala speli,
        btw path 12 är office window 13 är han är i office e.g spelarn blir 🍇'ed
        */
        this.AttackPath =  {
                0: [
                    {path: 1, odds: 0.70},
                    {path: 8, odds: 0.30}
                ],


                1: [
                    {path: 8, odds: 0.60},
                    {path: 3, odds: 0.40}
                ],

                8: [
                    {path: 1, odds: 0.60},
                    {path: 3, odds: 0.40}
                ],

                3: [
                    {path: 4, odds: 0.70},
                    {path: 5, odds: 0.30},
                ],

                4: [
                    {path: 12, odds: 0.80}, // om bonnie blir cockblocked far han ti baks ti cam 1 nästa movement chans
                    {path: 5, odds: 0.20}
                ],

                5: [
                    {path: 3, odds: 0.70},
                    {path: 13, odds: 0.30} // lil chans att han 🍇 ein entå
                ],


        }

        this.AttackState = 0; // stage
    }

    Update(resources: object): void {
        if (this.Attacking) {
            console.log("DEAD");
        }


        if (this.AttackState == 12) {
            if (resources.doors.left.open) {
                this.CanAttack = false;
            }

            if (resources.doors.left.lightsOn) {
                this.stalled = true;
            }
        }
        
    }

    MoveSuccess(): void {
        switch(this.AttackState) {
            case 12: // han er vi dörren
                if (this.CanAttack && !this.stalled) { // dörren it er stänged
                    this.AtDoor = false;
                    this.AttackState = 13;
                    this.Attacking = true;
                }

                if (!this.CanAttack && !this.stalled) { // the door is blocked, move back to diner
                    this.AttackState = 1;
                }

                break;


            default:

                // uuh ja tror dehe borda funk ?
                let path = this.AttackPath[this.AttackState];
                console.log(path);
                console.log()
                if (Math.random() >= path[0].odds) {
                    this.AttackState = path[0].path
                } else {
                    this.AttackState = path[1].path;
                }

        }
    }

    MoveFailure(): void {
        
    }
}



/* 
Spel logic bla annat, 
van er olika fienderna och hur mucki ström har do
*/
export default class GameState {
    cameras: Array<object>;
    enemies: Array<Enemy>;

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
                    empty: true // bonnie är han ända som kan vara jär
                },

                right: {
                    open: true,
                    lightsOn: false,
                    empty: true // högra dörren i spelli så kan bara chika kåll på de igenom,
                    //  dehenan variabeln er mest bara för att simpliföser rendering
                }
            },

            cameras: {
                enabled: false,
                cameraIndex: 0,
            }
        }

        this.cameras = [];

        
        /*
        Om man sko typ änder dem seinari ti na annat som mamm din elo na annat läskigt
        */


        this.enemies = [
            new Bonnie,
        ]
    }

    // blir påkalla varje frame inuti update function på i scenen
    tick(deltatime: number) {
        this.deltatime = deltatime;

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].tick(deltatime);
        }
    }
};