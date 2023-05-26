strokeSize = 23
board = [600,600]
pieceSize = [board[0]/3-3*strokeSize,board[1]/3-3*strokeSize]
fen = ""
for (let i = 0; i <9; i++) {
        fen += " "
}
availableMoves = [1,2,3,4,5,6,7,8,9]
function resetFen() {
    fen = ""
    availableMoves = [1,2,3,4,5,6,7,8,9]
    for (let i = 0; i <9; i++) {
        fen += " "
    }
}

pgn = ""
resetPgn()
function resetPgn() {
    pgn = "x" 
    for (let i = 0; i <9; i++) {
        pgn += " "
    }
}
function getIndex(pgn) {
    let first_index = -1
        // get first index with " "
        for (let i = pgn.length-1; i >0 ; i--) {
            if (pgn[i] == " ") {
                first_index = i 

            }
        }
        return first_index
        // console.log(first_index)
}
// getIndex("x12345   ") test  return -> 6 
function updatePgn(move /*1-9 num in availableMoves*/) {
    first_index = getIndex(pgn)
    pgn = replace(first_index,move.toString(),pgn)
    // console.log(move)
    // console.log(pgn)
}

function convertPgn_to_Fen(pgn) {
    // 0
    let fen = ""
    for (let i = 0; i<9; i++) {
        fen += " "
    }
    // 1 
     starting_letter = pgn[0] 
     let other_letter;

     if (starting_letter == "x") {
         other_letter = "o"
     }else if (starting_letter == "o") {
         other_letter = "x"
     }
    //  series_of_num = pgn[1:series_of_num.length]
    series_of_num = ""
    for (let i = 1; i < pgn.length; i ++) {
        series_of_num += pgn[i] 
    }
    //  console.log(series_of_num)
    //  console.log(starting_letter)
        //  console.log(other_letter)
    // 2 
    for (let i=0; i<series_of_num.length; i += 2) {
        if (series_of_num[i] != " ") {
            // console.log(series_of_num[i])
            // fen[i-1] = starting_letter
            fen = replace((series_of_num[i]-1), starting_letter,fen)
            // console.log(fen)
        }
        
    }
    // 3 
      for (let i=1; i<series_of_num.length; i += 2) {
        if (series_of_num[i] != " ") {
            // console.log(series_of_num[i])
            // fen[i-1] = starting_letter
            fen = replace((series_of_num[i]-1), other_letter,fen)
            // console.log(fen)
        }
        
    }
    // console.log(fen)
return fen


    // starting_letter = pgn[0]
    // other_letter = "x"
    // if (starting_letter.toLowerCase() == "x") {
    //     other_letter = "o"
    // }
    // series_of_num = ""
    // for (let i = 1; i < pgn.length; i ++) {
    //     series_of_num += pgn[i] 
    // }
    // for (let i=0; i < series_of_num.length; i++ ) {
         
    //     index_to_insert = parseInt(series_of_num[i])-1
    //     if (i%2 == 0) {
    //         // starting_letter
    //         fen[index_to_insert] = starting_letter
    //     }else {
    //         fen[index_to_insert] = other_letter
    //     }

    // }
    // console.log(fen)
    // return fen

}
convertPgn_to_Fen("x12345    ")

function undo() {
    first_index = getIndex(pgn) 
    last_move_index = first_index - 1
    str = " "
    if (pgn[last_move_index] == "x" || pgn[last_move_index] == "o"  ) {

    }else {

        pgn = replace(last_move_index,str,pgn)
        // print(pgn)
        let fen_before = fen 
    //    console.log(fen)
        fen = convertPgn_to_Fen(pgn)
        // console.log(fen)
        for (let i=0; i<fen.length; i++) {
            if (fen[i] == fen_before[i]) {

            }else {
                availableMoves.push(i+1)
                // availableMoves.sort()
            } 


        }

    }
    
}


// updatePgn(1)
// X always goes first
// let button;
  let restart_button_class;
  let undo_button /* = new Button(mouseX,mouseY,"hi",[0,0,255],[0,255,0],[255,0,0],[255,255,255],100,20,20,10,15,5,5,)*/
function setup() {
	// createCanvas(board[0],board[1]);
    rectMode(CENTER)
    createCanvas(windowWidth,windowHeight)
    // button = new Button(300,300,200,50,"restart game")
    restart_button_class = new Button(380,514,"RESTART",[0,0,255],[0,255,0],[255,0,0],[255,255,255],100,20,20,10,15,5,5,)
    undo_button = new Button(380,514,"UNDO",[0,0,255],[0,255,0],[255,0,0],[255,255,255],100,20,20,10,15,5,5,)
}

 
function drawBoard(x,y,total_w,total_h) {
    w  = total_w/3
    h  = total_h/3 

    line(x-(w/2)  , y-1.5*h ,x-w/2,y+1.5*h)//1
    line(x+(w/2)  , y-1.5*h ,x+w/2,y+1.5*h) //2
    line(x-1.5*w, y-.5*h , x+1.5*w, y-.5*h) // 3
    line(x-1.5*w, y+.5*h , x+1.5*w, y+.5*h)    
}
function play(str,num,width,height,total_w,total_h) { // find coraner & height
    w = total_w/3
    h = total_h/3
    if (num == 1) {
        putXor0(str,x-w,y-h,width,height)
        // print(width)
    }else if (num == 2) {
        putXor0(str,x,y-h,width,height)
    }else if (num == 3) {
        putXor0(str,x+w,y-h,width,height)
    }else if (num == 4) {
        putXor0(str,x-w,y,width,height)
    }else if (num == 5) {
        putXor0(str,x,y,width,height)
    }else if (num == 6) {
        putXor0(str,x+w,y,width,height)
    }else if (num == 7) {
        putXor0(str,x-w,y+h,width,height)
    }else if (num == 8) {
        putXor0(str,x,y+h,width,height)
    }else if (num == 9) {
        putXor0(str,x+w,y+h,width,height)
    }
    
}
function isItXtoMove(fen) {
    numX = 0 
    numO = 0
    for (letter of fen) {
        if (letter.toLowerCase() == "x") {
            numX += 1;
        }else if (letter.toLowerCase() == "o") {
            numO += 1;
        }
    }
    if (numX > numO) {
        return false
    }else if (numX == numO) {
        return true 
    }
}
function putXor0(str,x,y,width,height) {// put the X or O given codinate & height 
    if (str.toLowerCase() == "o") {
        noFill()
        ellipse(x,y,width,height)
    }else if (str.toLowerCase() == "x") {
        placeX(x,y,width,height) 
    }
}
function placeX(x,y,w,h) {
    line(x-.5*w,y-.5*h,x+.5*w, y +.5*h) 
    line(x-.5*w , y + .5*h, x+.5*w,y-.5*h)
}
x = 300
y = 300
strokeSizeNum = 3
function draw() {
    // strokeSizeNum = 2
	background(0);
    // board = [mouseX,mouseX] //177 
    board = [344,344]
    pieceSize = [board[0]/3-3*strokeSize,board[1]/3-3*strokeSize]


    fill(255,255,255)
    stroke(255,255,255)
    strokeSizes = [ 214,782,897,1306]
    for (let i = 0; i < strokeSizes.length; i++) {
        strokeSizes[i] /= 50
    }
    strokeSize =  strokeSizes[strokeSizeNum]//mouseX/50  // 214,782,897,1306
    
    strokeWeight(strokeSize)
    
    drawBoard(x,y,board[0],board[1])
    fill(255,0,0)
    stroke(255,0,0)
    // for (let i = 1; i<=9;i++) {
    //     if (i%2 == 0) {
    //         play("X",i,pieceSize[0],pieceSize[1],board[0],board[1])
    //     }else if (i%2 == 1) {
    //         play("o",i,pieceSize[0],pieceSize[1],board[0],board[1])
    //     }  
    //     // print(i) 
           
    // }
    // background(225)
    // placeX(300,300,600,600)
    // putXor0("o",300,300,600,600)
    //  play("o",1,100,100,600,600)
    w = board[0]/3//- strokeSize
    h = board[1]/3//- strokeSize

     if (!keyIsDown(16)) {
    if (pressedInSquare(x-w,y-h,board[0]/3 - 20,board[1]/3 - 20)) {
        if (contains(availableMoves,1)) {
            if (isItXtoMove(fen)) {
                move("x",1)
                removeAll(availableMoves,1) 
                fen = replace(0,"x",fen)
                updatePgn(1)
            }else {
                move("o",1)
                removeAll(availableMoves,1) 
                 
                fen = replace(0,"o",fen)
                updatePgn(1)
            }
            
        }
       
        // print("your iN")
    }
   if (pressedInSquare(x,y-h,board[0]/3 - 20,board[1]/3 - 20)) {
        if (contains(availableMoves,2)) {
             if (isItXtoMove(fen)) {
                move("x",2)
                removeAll(availableMoves,2) 
                fen = replace(1,"x",fen)
                updatePgn(2)
            }else {
                move("o",2)
                removeAll(availableMoves,2) 
                fen = replace(1,"o",fen)
                updatePgn(2)
            }
        }
        // print("your iN")
    }   if (pressedInSquare(x+w,y-h,board[0]/3 - 20,board[1]/3 - 20)) {
      if (contains(availableMoves,3)) {
             if (isItXtoMove(fen)) {
                move("x",3)
                removeAll(availableMoves,3) 
                fen = replace(2,"x",fen)
                updatePgn(3)
            }else {
                move("o",3)
                removeAll(availableMoves,3) 
                fen = replace(2,"o",fen)
                updatePgn(3)
            } 
        }
        // print("your iN")
    }   if (pressedInSquare(x-w,y,board[0]/3 - 20,board[1]/3 - 20)) {
       if (contains(availableMoves,4)) {
             if (isItXtoMove(fen)) {
                move("x",4)
                removeAll(availableMoves,4) 
                fen = replace(3,"x",fen)
                updatePgn(4)
            }else {
                move("o",4)
                removeAll(availableMoves,4) 
                fen = replace(3,"o",fen)
                updatePgn(4)
            }
        }
        // print("your iN")
    }   if (pressedInSquare(x,y,board[0]/3 - 20,board[1]/3 - 20)) {
      if (contains(availableMoves,5)) {
            if (isItXtoMove(fen)) {
                move("x",5)
                removeAll(availableMoves,5) 
                fen = replace(4,"x",fen)
                updatePgn(5)
            }else {
                move("o",5)
                removeAll(availableMoves,5) 
                fen = replace(4,"o",fen)
                updatePgn(5)
            }
        }
        // print("your iN")
    }   if (pressedInSquare(x+w,y,board[0]/3 - 20,board[1]/3 - 20)) {
             if (contains(availableMoves,6)) {
                if (isItXtoMove(fen)) {
                    move("x",6)
                    removeAll(availableMoves,6) 
                    fen = replace(5,"x",fen)
                    updatePgn(6)
                }else {
                    move("o",6)
                    removeAll(availableMoves,6) 
                    fen = replace(5,"o",fen)
                    updatePgn(6)
                }
            }
        // print("your iN")
    }   if (pressedInSquare(x-w,y+h,board[0]/3 - 20,board[1]/3 - 20)) {
        if (contains(availableMoves,7)) {
             if (isItXtoMove(fen)) {
                move("x",7)
                removeAll(availableMoves,7) 
                fen = replace(6,"x",fen)
                updatePgn(7)
            }else {
                move("o",7)
                removeAll(availableMoves,7) 
                fen = replace(6,"o",fen)
                updatePgn(7)
        }
        // print("your iN")
    }   }
    if (pressedInSquare(x,y+h,board[0]/3 - 20,board[1]/3 - 20)) {
        //  print("test#1")
     if (contains(availableMoves,8)) {
        
             if (isItXtoMove(fen)) {
                move("x",8)
                removeAll(availableMoves,8) 
                fen = replace(7,"x",fen)
                updatePgn(8)
            }else {
                move("o",8)
                removeAll(availableMoves,8) 
                fen = replace(7,"o",fen)
                updatePgn(8)
            }
        }
        // print("your iN")
    }   if (pressedInSquare(x+w,y+h,board[0]/3 - 20,board[1]/3 - 20 )) {
        // play("o",9,pieceSize[0],pieceSize[1],board[0],board[1])
 if (contains(availableMoves,9)) {
             if (isItXtoMove(fen)) {
                move("x",9)
                removeAll(availableMoves,9) 
                fen = replace(8,"x",fen)
                updatePgn(9)
            }else {
                move("o",9)
                removeAll(availableMoves,9) 
                fen = replace(8,"o",fen)
                updatePgn(9)
            }
        }
    }
        // print("your iN")
    }
// get fen to apply to board 
    for (let i = 1; i<= 9; i++) {
        if (fen[i-1] == "x") {
            move("x",i)
        }else if (fen[i-1] == "o") {
            move("o",i)
        }

    }
 
    // tell play who's move 
    // put text of who woN / draw
    if (checkWin()) {
        if (whoWon() == "x") {
                fill(255,255,255);
            // noFill()
            noStroke()
            textSize(56);
            textWidth(200)
            // strokeWeight(mouseY)
            textFont('Georgia');
            text("X won & O lost", 302,81);
        }else if (whoWon() == "o") {
            fill(255,255,255);
            // noFill()
            noStroke()
            textSize(56);
            textWidth(200)
            // strokeWeight(mouseY)
            textFont('Georgia');
            text("O won & X lost",  302,81) ;
        }
    }else if (checkDraw()) {
            fill(255,255,255);
            // noFill()
            noStroke()
            textSize(88);
            textWidth(200)
            // strokeWeight(mouseY)
            textFont('Georgia');
            text("DRAW", /*x-1.5*w*/  302,81) ;
    }else if (isItXtoMove(fen)) {
        fill(255,255,255);
        // noFill()
        noStroke()
        textSize(88);
        textWidth(200)
        // strokeWeight(mouseY)
        textFont('Georgia');
        text("X's move", 302,81) ;
     
    }else {
 
        fill(255,255,255);
        // noFill()
        noStroke()
        textSize(88);
        textWidth(200)
        // strokeWeight(mouseY)
        textFont('Georgia');
        text("O's move", 302,81) ;
    }
    
    
    
    if (keyIsDown(69)) {// e clearing board or reset game
        clearBoard()
    }
    if (checkWin()) {
        // print("someOnE won")
        // print(whoWon())
        // text = ""
        availableMoves = []
    }
    if (checkDraw()) {
        // print("DrAw")

    }
    // if (touches.length >= 2) {
    //     // strokeSizeNum = (strokeSizeNum+1)% strokeSizes.length
    //     alternate()
    // }


    // buttons - restart game - change format

//     fill(135)
//     restart_button = [380.0075764656067
// ,514.0075764656067,200,50]
//      rect(restart_button[0],restart_button[1],restart_button[2]+10,restart_button[3]+10)

//      fill(255,)
//     rect(restart_button[0],restart_button[1],restart_button[2],restart_button[3]) // restart 
//     fill(0,0,0)
//     stroke(255,0,0 )
// if (mouseX >=restart_button[0]-(restart_button[2]+5)/2 && mouseX <= restart_button[0]+(restart_button[2]+5)/2 && mouseY >= restart_button[1]-(restart_button[3]/2+5) && mouseY <= restart_button[1]+(restart_button[3]/2+5)  && mouseIsPressed)   {
//     clearBoard()
//     // print("restart")
// }else {
//     // print("faLse")
// }
//     //    fill(255,255,255);
//         // noFill()
//         noStroke()
//         textSize(44);
//         textWidth(200)
//         // strokeWeight(mouseY)
//         textFont('Georgia');
//         // text("X's move", x-1.5*w,y-1.5*h-strokeSize) ;
//     //      208.0075764656067
//     // 538.0075764656067
//     text("restart",384,525)//restart_button[0],restart_button[1],)


    format_button = []



    // restart_button _class 
    // restart_button_class.x = 508 //mouseX 
    // restart_button_class.y = 157 // mouseY
   
    restart_button_class.border_W =6
    restart_button_class.border_H =5

    restart_button_class.intel_W = 159 
    restart_button_class.intel_H = 43


     restart_button_class.show() 
    if (restart_button_class.clicked()) {
        console.log("true")
        clearBoard()
    }
    
    // restart_button _class 
    undo_button.x = /* 508 // */200 
    // undo_button.y = /* 157 // */ mouseY
   
    undo_button.border_W =6
    undo_button.border_H =5

    undo_button.intel_W = 159 
    undo_button.intel_H = 43


     undo_button.show() 
   

    

}



// if (pressedInSquare(x,y+h,pieceSize[0],pieceSize[1] )) {
//          print("test#1")
//          }
 
function mousePressed() {
        //  print(mouseX)
        //  print(mouseY)
    if (keyIsDown(16)) /**shift */ {
strokeSizeNum = (strokeSizeNum+1)% strokeSizes.length
    }
     if (undo_button.clicked()) {
        // console.log("true")
        undo()
    }
    if (touches.length >= 2) {
        // strokeSizeNum = (strokeSizeNum+1)% strokeSizes.length
        alternate()
    }
  
}
 let num = 1 
function alternate() {
   
// if (num == 1) {


     strokeSizeNum = (strokeSizeNum+1)% strokeSizes.length
 
    //  if (touches.length >= 2) {
    //      num += 1 
    //  }else {
    //      num = 1 
    //  }
}
function clearBoard() {
    // fen = "" 
    // for (let i =0; i<9; i++) {
    //     fen += " "
    // } 
    resetFen()
    // print("clear as a piE")
    availableMoves = []
    for (let i=1; i <=9;i++) {
        availableMoves.push(i)
    }
    resetPgn()
}
function checkWin(fen) {
    if (sameFen(0,1,2,"x") || sameFen(3,4,5,"x") || sameFen(6,7,8,"x")    || sameFen(0,1,2,"o") || sameFen(3,4,5,"o") || sameFen(6,7,8,"o")  ) /*horizontal*/ {
        return true 
    }else if (sameFen(0,3,6,"x")  || sameFen(1,4,7,"x") || sameFen(2,5,8,"x")   || sameFen(0,3,6,"o")  || sameFen(1,4,7,"o") || sameFen(2,5,8,"o")) /* virtical*/ {
           return true 
    }else if (sameFen(0,4,8,"x") || sameFen(2,4,6,"x") || sameFen(0,4,8,"o") || sameFen(2,4,6,"o")/*diagnal*/  ) {
          return true  
    }else {
        return false 
    }
}
function whoWon() {
    if (sameFen(0,1,2,"x") || sameFen(3,4,5,"x") || sameFen(6,7,8,"x")    || sameFen(0,3,6,"x")  || sameFen(1,4,7,"x") || sameFen(2,5,8,"x")  ||   sameFen(0,4,8,"x") || sameFen(2,4,6,"x")) /*horizontal*/ {
        return "x" 
    }else  if (sameFen(0,1,2,"o") || sameFen(3,4,5,"o") || sameFen(6,7,8,"o")    || sameFen(0,3,6,"o")  || sameFen(1,4,7,"o") || sameFen(2,5,8,"o")  ||   sameFen(0,4,8,"o") || sameFen(2,4,6,"o")) /*horizontal*/ {
        return "o" 
    } 
}
function sameFen(num1,num2,num3,equalTo) {
    // list = [num1,num2,num3] 
    return (fen[num1] == fen[num2] && fen[num2] == fen[num3] && fen[num1] == fen[num3] ) &&  (fen[num1] == equalTo  && fen[num2] == equalTo) && (fen[num3] == equalTo )
}
function checkDraw(fen) {
    return (checkWin(fen) == false  && !fen_has_space())  
}
function fen_has_space() {
    for (letter of fen) {
        if (letter == " ") {
            return true
        }
    }
    return false
}
function move(player,num) {
    play(player,num,pieceSize[0],pieceSize[1],board[0],board[1])
}
function pressedInSquare(x,y,w,h) {
    if (mouseIsPressed) {
        if (abs(mouseX - x) <= w/2 ) {
            if (abs(mouseY - y) <= h/2 ) {
                return true 

            }   
        }
    }
    return false; 
}
function removeAll(array,item) {
    for (index = array.length-1; index >=0; index--) {
        // console.log(index)
        if (array[index] == item) {
            array.splice(index,1)
        }
    }
}
// list =["q","w","e","r","w"]
// removeAll(list,"w")
 
function contains(array,item) {
    does_it_contain = false
    for (i of array) {
        if (i == item) {
            does_it_contain = true
        }
    }
    return does_it_contain;
}

function replace(num,str_to_replace, str_o /*str_o -> orginal*/) {
    // console.log(str_o.substring(0,num))
    before = str_o.substring(0,num)
    after = str_o.substring(num+1,str_o.length)
    // console.log(str_o.substring(num+1,str_o.length))
    return (before + str_to_replace + after)
}
// x= " "
// x[0] = "x"
function abs(num) {
    if (num >0) {
        return num
    }else {
        return (num * -1)
    }
}
// for (let a = 1; a<600; a++) {
//     for (let b = 1; a<600; a++) {
//            if (abs(a - x) <= pieceSize[0]/2 ) {
//             if (abs(b - y+board[1]/3) <= pieceSize[1]/2 ) {
//                 // return true 
//                 fill(255,00,0)
//                 ellipse(a,b,1,1)

//             }   
//         }
//     }   
// }
/* 
rest button game
fixed moible aternattor 
undo button 
pgn 
*/ 
class Button {
    constructor(x,y,text,border_color_not_clicked /* list of r,g ,b */ ,border_color_clicked/* list of r,g ,b */, button_main_color/* list of r,g ,b */,text_color /* list of r,g ,b */ ,
    intel_W,

intel_H,

border_W,

border_H,

textFont,

border_text_w,

border_text_h,
) {
        this.x = x 
        this.y = y 
        // this.w = w 
        // this.h = h 
        // this.text = text 
        this.border_color_not_clicked = border_color_not_clicked// []
        
        this.border_color_clicked = border_color_clicked
        this.button_main_color = button_main_color
        this.text_color = text_color
        

        // info 
        this.intel_W = intel_W  
        this.intel_H = intel_H   

        this.border_W = border_W
        this.border_H = border_H 

        this.total_h = this.border_H*2 + this.intel_H

        this.total_w = this.border_W*2 + this.intel_W
// text 
        this.textFont = textFont
        this.text = text 
        this.border_text_w = border_text_w
        this.border_text_h = border_text_h  
        this.text_w = this.intel_W - this.border_text_w*2

        this.text_h = this.intel_H - this.border_text_h*2 

        rectMode(CENTER)
          
    }
    show() {
          this.total_h = this.border_H*2 + this.intel_H

        this.total_w = this.border_W*2 + this.intel_W

         rectMode(CENTER)
        // draw border rect 
        if (this.clicked() == true) {
            fill(this.border_color_clicked[0],this.border_color_clicked[1],this.border_color_clicked[2])
            noStroke()
            rect(this.x,this.y,this.total_w,this.total_h)
            // console.log("BUTTON CLASS preesssed")
        }else {
            fill(this.border_color_not_clicked[0],this.border_color_not_clicked[1],this.border_color_not_clicked[2])
            noStroke()
            rect(this.x,this.y,this.total_w,this.total_h)
        }
// draw main rect 
        fill( this.button_main_color[0], this.button_main_color[1], this.button_main_color[2])
            noStroke()



        rect(this.x,this.y,this.intel_W, this.intel_H) 
        // text 
           fill(this.text_color[0],this.text_color[1],this.text_color[2])
            noStroke() 

textAlign(CENTER);
textFont('Georgia');
textStyle(BOLD);
textSize(find_text_size(this.text,this.text_w,this.border_text_w*.9))
textSize(20)
        text(this.text,this.x,this.y+ this.border_text_h/*6*/,)


            // noStroke()
    //     textSize(60);
    //     textWidth(200)
    //     // strokeWeight(mouseY)
    //     textFont('Georgia');
    //     // text("X's move", x-1.5*w,y-1.5*h-strokeSize) ;
    // //      208.0075764656067
    // // 538.0075764656067
    // text("restart",restart_button[0] - (300-208.0075764656067),/*538.0075764656067*/restart_button[1]+19)//restart_button[0],restart_button[1],)

    }
    abs(num) {
        if (num > 0) {
            return num 
        }else {
            return (num * -1)
        }
    }
    clicked() {
        // if (abs(mouseX - this.x ) <= this.w/2 && abs(mouseY - this.y ) <= this.h/2 && mouseIsPressed) {
        //     return true
        // }
        if (this.abs(mouseX - this.x) <= this.total_w/2 ) {
            // && 
            if ((this.abs(mouseY - this.y) <= this.total_h/2 ) ) {
                if (mouseIsPressed) {
                    return true
                } 
            }
        }
        return false 
    }
}
function find_text_size(text,goal_Width,plus_or_minus /* 50 */) {
    let final_size; 
        for (let i = 0; i<goal_Width;i+= .1){
            textSize(i) 
            let aChar = text;
            let cWidth = textWidth(aChar);
            if (cWidth <(goal_Width - plus_or_minus) && cWidth <(goal_Width - plus_or_minus)) {
                final_size = i 
            }
        }        
        return final_size
}  /**    

animation for X & O 
animation for the undo of the X & O 

AI with brain js & lvl ez beginer medium hard 
&& forced tie  
{x always go first } 
score board 
a name for 2 pllayer 
ad for pac man & flappy bird 
company logo i guess

https://tic-tac-toe-v1.stupidloser.repl.co

stupidloser.repl games 



 */