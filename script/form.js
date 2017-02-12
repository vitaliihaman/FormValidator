(function () {
    var form = document.getElementById('myForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        //console.log(e);
        var currentForm = e.target,
            object = {};
        var invalidElements = currentForm.getElementsByClassName("invalid");
        invalidElements = Array.prototype.slice.call(invalidElements);
        invalidElements.forEach(function (elem) {
            elem.classList.remove("invalid");
        });

        for (var i = 0; i < currentForm.length; i++) {
            if (currentForm[i].type === "submit") {
                continue;
            }
            if (currentForm[i].name === "gender" && !currentForm[i].checked) {
                continue;
            }
            if (currentForm[i].name === "gender" && currentForm[i].checked) {

            }
            if (currentForm[i].type === "checkbox") {
                var check = currentForm[i].checked;
            }
            var key = currentForm[i].name,
                value = currentForm[i].value;
            object[key] = value;
            var validator = new Validator();
            rules[key].forEach(function (rule) {
                var type = rule.type || rule;
                //if(rule.type){type = rule.type}else{type = rule}
                if (typeof rule === "object") {
                    var args = [].concat(value, rule.args);
                    check = validator[type].apply(null, args)
                } else if (key === "ru" || key === "eng" || key === "fr") {
                } else {
                    check = validator[type](value);
                }
                console.log("Правило: ", type, "для: ", key, "значение: ", check);
                if (!check) {
                    currentForm[i].classList.add('invalid');

                    //var message = document.createElement("DIV");
                    //message.innerHTML = "Вы некорректно заполнили поле " + key;
                    //currentForm[i].parentNode.appendChild(message);
                    var message = "Вы некорректно заполнили поле " + key;
                    console.log(message);
                }
            });
        }
        //  console.log(object);
    })
})();

var rules = {
    firstName: ['required', {type: 'length', args: [2, 20]}],
    lastName: ['required', {type: 'length', args: [2, 20]}],
    age: ['required', 'isNumber', {type: 'isBetween', args: [5, 80]}],
    phone: ['required', 'isNumber'],
    hobbies: ['required', {type: 'length', args: [1, 200]}],
    country: ['required'],
    email: ['required'],
    gender: [],
    ru: ['isChecked'],
    eng: ["isChecked"],
    fr: ["isChecked"]
};

function Validator() {
this.a = 5;
}

function ValidatorForm(){
Validator.apply(this, arguments);
}
ValidatorForm.prototype.__proto__ = Validator.prototype;
//ValidatorForm.prototype = Object.create(Validator.prototype);
//ValidatorForm.prototype.constructor = ValidatorForm;
var validatorForm = new ValidatorForm();
//console.log(validatorForm);

Validator.prototype.required = function (value) {
    return !!value;
};

Validator.prototype.isNumber = function (value) {
    return !isNaN(value);
};

Validator.prototype.length = function (value, from, to) {
    return from < value.length && value.length < to;
};

Validator.prototype.isBetween = function (value, min, max) {
    return min < +value && +value < max;
};
/*Validator.prototype.isChecked = function (value) {
    return value;
};*/


// добавить спан с месседжем ошибки
// добавить парочку полей с правилами и добавить эти правила в валидатор
// добавить чекбокс обязательно


/*
 var obj1 = {fn1: function () {
 console.log(this);
 }}

 var obj2 = {fn2: function (a) {
 console.log(this);
 }}

 obj2.fn2.call(obj1, ); //this выведет obj1*/ //call и apply это сразу выполнение функции
//obj2.fn2.apply(obj1, [a, b, c]);

//var fn = obj2.fn2.bind(obj1, a, b); отлженная привязка контекста 1 раз привязали
// и затем каждый раз сохраняется ссылка внутри на тот обьект к тоторому привязали
// bind это просто привязка и потом к этой функции можно обращатся и она запускается
// после обращения к ней(вызов)
//fn();


