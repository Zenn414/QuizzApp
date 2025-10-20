

// Variable
const answerBtn=document.querySelectorAll('.answer');

const mainConter=document.querySelector('.main-content');
const imageQuiz=document.querySelector('.imgDiv');
const scoreText=document.getElementById('score');
const soalText=document.getElementById('soal');
const main =document.querySelector('.main');

const inputText=document.getElementById('nama');
const btnInput=document.getElementById('btnInput');
let soal=0;
let jawabanBenar=[];
let quizData=[];

let scored=0;





// menangkap data jawabn
fetch('quiz.json')
.then(res=>res.json())
.then(data=>{
    quizData=data;
    jawabanBenar=data.map(j=> j.options[j.answer]);
    console.log(quizData);
    
    
    
    
    
});


//jika tombol start di klik 


//menampilkan quizz
function quizz(){
    
    mainConter.innerHTML='';
    const current=quizData[soal];
    soalText.innerHTML=`Soal ${soal+1}`; 

    imageQuiz.style.display='block';
    
    

   const scoreCon=document.querySelector('.scoreCon');
    scoreCon.style.opacity='1';


    const quiz=document.createElement('div');
    quiz.className='quiz';

    //membuat soal quizz
    const question=document.createElement('h3');
    question.className='soal';
    question.textContent=`Soal ${soal+1}. ${current.question}`;
    quiz.appendChild(question);

    // membuat btn quizz
    const quizBtn=document.createElement('div');
    quizBtn.className='answer-btn center'

    current.options.forEach(opt=>{
        const btn=document.createElement('button');
        btn.className='answer';
        btn.textContent=opt;
        quizBtn.appendChild(btn);
    });

    quiz.appendChild(quizBtn);

    mainConter.appendChild(quiz);

    const answerBtn=document.querySelectorAll('.answer');

    // apabila tombol di klik
    answerBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        answerBtn.forEach(btn=> btn.disabled=true);
        
    check(soal,answerBtn,btn)

    const nextBtn=document.createElement('button');
    nextBtn.id='nextBtn'
    nextBtn.textContent='Selanjutnya';
    mainConter.appendChild(nextBtn);
    nextBtn.addEventListener('click', ()=>{
        

        soal++;
        if(soal<quizData.length){
            quizz()
        }
        else{
            totalScore()
            soal--;

        }
        soalText.innerHTML=`Soal ${soal+1}`;

    });
    
        
    });

});
}


function home(nama){
    mainConter.innerHTML='';
    soal=0;
    scored=0;
    scoreText.innerHTML = `${scored}`;

    const mainHome=document.createElement('div');
    mainHome.className='main-home';
    mainHome.classList.add('center');
    
    mainHome.innerHTML=` <h1 class="salam">Halo ${nama} ayo kita bermain Quiz</h1>
        <div class="img">
            
                    <img src="IMG/quizzystart.png" alt="" width="100" id="imagequiz">
                    
                </div>
                <div class="start">
                    <button id="start-game">Start</button>
                    
                </div>`;
                mainConter.appendChild(mainHome);

                const startBtn=document.getElementById('start-game');
                startBtn.addEventListener('click', ()=>{
                console.log("Tombol Start diklik!");
                quizz();

})

}





function totalScore(){
   mainConter.innerHTML=`
            <div class="scoreTotal">
                <h1>Selamat Anda Mendapatkan </h1>
                <span>Score : ${scored}</span>

                    <div class="btn-score ">
                        <button class="btnquiz" id="btnPlay" >Play again</button>
                        <button class="btnquiz" id="btnHome">Home</button>
                    </div>
                </div>`;

                const btnPlay=document.getElementById('btnPlay');
                btnPlay.addEventListener('click', ()=>{
                    soal=0;
                    scored=0;
                    scoreText.innerHTML = `${scored}`;
                    quizz()

                });

                btnHome.addEventListener('click', ()=>{
                    home()
                    imageQuiz.style.display='none';
                    imageQuiz.innerHTML=`<img src="IMG/quizzystart.png" alt="" width="100" id="imagequiz">`;

                })


                
   
}


// cek jawaban if true/wrong

function check(soal,semuaBtn,btnKlik){


    semuaBtn.forEach(btn=> {
    if(btn.textContent===jawabanBenar[soal]){
        btn.classList.add('benar');
        

        
        
    }
    else{
        btn.classList.add('salah');
       
        
    };
    
    
    
    });
    if(btnKlik.textContent===jawabanBenar[soal]){
        imageQuiz.innerHTML=`<img src="IMG/quizzyRight.png" alt="" width="100" id="imagequiz">`;
        score()
    }
    else{
         imageQuiz.innerHTML=`<img src="IMG/quizzyWrong.png" alt="" width="100" id="imagequiz">`;
    }
};

//score
function score(){
    scored+=100;
    scoreText.innerHTML=`${scored}`;
    

};

btnInput.addEventListener('click',()=>{
    const inputValue=inputText.value;
    

    if(inputValue===''){
        alert('nama tidak boleh kosong')
    }
    else{
        home(inputValue)
    }
})

