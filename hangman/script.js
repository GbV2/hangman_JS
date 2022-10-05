const number_of_guesses = 7;
let amount_error = 0; // количество ошибка

let number_of_letters_in_alphabet = 33;

let number_of_guessed_letters = 0; // количество угаданных букв



let dictionary = ["АКУСТИКА", "БАТИСКАФ", "ЕХИДСТВО", "ВИСЕЛИЦА", "ИЕРОГЛИФ", "ХЛЕБОПЕК"] 
let word = dictionary[getRandomInt(0,5)];

function Create_table_for_hidden_word(hiddenw) {
    let tr = document.querySelector('.hidden-word');
    
    for (let index = 0; index < hiddenw.length; index++) {
        let td = document.createElement('td');
        td.classList.add('hidden-letter');
        td.id  = index;
        tr.appendChild(td);    
    } 
}

function Create_table_for_ABC(number_of_letters_in_alphabet) {
    let table_abc = document.querySelector('.ABC');

    number_of_columns = parseInt(number_of_letters_in_alphabet/2, 10);

    let k = 0;
    for (let i = 0; i < 2; i++) {
        
        let tr = document.createElement('tr');
        table_abc.appendChild(tr);
        let l = 1046
        for (let j = 0; j < number_of_columns; j++) {
            
            let td = document.createElement('td');
            td.classList.add('letter');
            let le;

            if ( 'А'.charCodeAt(0) + k == l)
            {
                le = String.fromCharCode(1025);
                k--;
                l = 0;
            }  
            else
                le = String.fromCharCode('А'.charCodeAt(0) + k) ;

            td.id = le;
            td.innerText = le;
            tr.appendChild(td);
            k++;
        }

        if(number_of_letters_in_alphabet % 2 != 0)
            number_of_columns++;
    }
}

Create_table_for_hidden_word(word);
Create_table_for_ABC(number_of_letters_in_alphabet);


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

let selected_letter = document.querySelectorAll(".letter");
let letterId;

function func1() {
    for (var i = 0; i < selected_letter.length; i++) {
        selected_letter[i].addEventListener("click", found_letter);
    }
}


function found_letter() {
    letterId = event.target.id;
    var str = '#'+letterId;
    let selectletter = document.querySelector(str);
    if (selectletter.classList.contains("dnuse"))
        func1();
    else    
        charCheck();
    //alert(letterId);
}

function charCheck() {
    let arr_index = [];
    let i = 0;
    let position = 0;

    for (let index = 0; index < word.length; index++) {
        position = word.indexOf(letterId, position);
        if (position >= 0) {
            arr_index[i++] = position;
            position++;
        } else
            break;
    }

    delete_letter();

    if (arr_index.length > 0)
        letter_found(arr_index);
    else
        letter_not_found();
}

function delete_letter() {
    var str = '#'+ letterId;
    let selectletter = document.querySelector(str);
    selectletter.classList.remove("letter");
    selectletter.classList.add("dnuse");
}

function letter_found(arr_index) {
    //alert("есть буква");
    // вставляем буквы 
    putletter(arr_index);

    number_of_guessed_letters += arr_index.length;
    if (number_of_guessed_letters === word.length)
    {
        alert("you won");
        for (var i = 0; i < selected_letter.length; i++) {
            selected_letter[i].removeEventListener("click", found_letter);
        }
    }
    else {
        func1();
    }
}

function putletter(arr_index) {
    for (let index = 0; index < arr_index.length; index++) {
        var putl = '#' + arr_index[index];
        let insertedletter = document.getElementById(arr_index[index]);
        insertedletter.innerText = letterId;
    }
}


function letter_not_found() {
    amount_error++;
    // нарисовать деталь

    wrong_answer(amount_error);
    
    if (amount_error === number_of_guesses)
    {
        setTimeout(alert("Вы проиграли!"), 1000); 
        for (var i = 0; i < selected_letter.length; i++) {
            selected_letter[i].removeEventListener("click", found_letter);
        }
    }
    else {
        func1();
    }
}

function end() {
    location.reload();
}

function wrong_answer(amount_error) {
    let path = "image/" + amount_error + ".png";
    let img = document.getElementById('myImage');

    img.src = path;
    //alert("нет буквы");
    console.log("нет буквы");
    
}

func1();